import { useTable, Column } from "react-table";
import { useState, ChangeEvent, useMemo } from "react";
import nuggetsFull from "../data/NuggetsFULL.json";
import heat from "../data/Heat.json";
import TeamDataDropdown from "./teamDataDropdown";
import FilterDropdown from "./filterDropdown";
import PlayerDataDropdown from "./playerDropdown";

const nuggetsArray = Object.entries(nuggetsFull).map(([key, value]) => ({
  player: key,
  ...value,
}));

const heatArray = Object.entries(heat).map(([key, value]) => ({
  player: key,
  ...value,
}));

type teamData = {
  player: string;
  shottype: string;
  totalppp: number | string;
  perofposs: number | string;
  totalto: number | string;
  totalfgper: number | string;
  shootppp: number | string;
  perofshootposs: number | string;
  shootfgper: number | string;
  shoot2ptatt: number | string;
  shoot2ptfgper: number | string;
  shoot3ptatt: number | string;
  shoot3ptfgper: number | string;
  passppp: number | string;
  perofpassposs: number | string;
  passfgper: number | string;
  pass2ptatt: number | string;
  pass2ptfgper: number | string;
  pass3ptatt: number | string;
  pass3ptfgper: number | string;
};

const totalColumns = [
  { Header: "Shot Type", accessor: "shottype" },
  { Header: "Total PPP", accessor: "totalppp" },
  { Header: "% of Poss.", accessor: "perofposs" },
  { Header: "Total TO", accessor: "totalto" },
  { Header: "Total FG%", accessor: "totalfgper" },
];

const shootColumns = [
  { Header: "Shot Type", accessor: "shottype" },
  { Header: "Shooting PPP", accessor: "shootppp" },
  { Header: "% of Shooting Poss.", accessor: "perofshootposs" },
  { Header: "Shooting FG%", accessor: "shootfgper" },
  { Header: "Shooting 2pt Att.", accessor: "shoot2ptatt" },
  { Header: "Shooting 2pt FG%", accessor: "shoot2ptfgper" },
  { Header: "Shooting 3pt Att.", accessor: "shoot3ptatt" },
  { Header: "Shooting 3pt FG%", accessor: "shoot3ptfgper" },
];

const passColumns = [
  { Header: "Shot Type", accessor: "shottype" },
  { Header: "Passing PPP", accessor: "passppp" },
  { Header: "% of Passing Poss.", accessor: "perofpassposs" },
  { Header: "Passing FG%", accessor: "passfgper" },
  { Header: "Passing 2pt Att.", accessor: "pass2ptatt" },
  { Header: "Passing 2pt FG%", accessor: "pass2ptfgper" },
  { Header: "Passing 3pt Att.", accessor: "pass3ptatt" },
  { Header: "Passing 3pt FG%", accessor: "pass3ptfgper" },
];

function Table() {
  const [selectedOption, setSelectedOption] = useState("total");
  const [selectedTeamData, setSelectedTeamData] = useState("Nuggets");
  const [players, setPlayers] = useState([...nuggetsArray]);
  const [selectedPlayerData, setSelectedPlayerData] = useState<teamData>(
    nuggetsFull["team"] as any
  );

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    if (newOption !== selectedOption) {
      setSelectedOption(newOption);
    }
  };

  const handleTeamDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTeamData = event.target.value;

    if (newTeamData !== selectedTeamData) {
      setSelectedTeamData(newTeamData);
      if (newTeamData === "Nuggets") {
        setPlayers(nuggetsArray);
      } else if (newTeamData === "Heat") {
        setPlayers(nuggetsArray);
      }
    }
  };

  const handlePlayerDataChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const playerKey = event.target.value;
    debugger;

    if (playerKey !== selectedPlayerData?.player) {
      if (selectedTeamData === "Nuggets") {
        const playerArray = nuggetsFull[playerKey as keyof typeof nuggetsFull];
        setSelectedPlayerData(playerArray as any);
      } else if (selectedTeamData === "Heat") {
        const playerArray = heat[playerKey as keyof typeof heat];
        setSelectedPlayerData(playerArray as any);
      }
    }
  };

  const data = useMemo(() => selectedPlayerData, [selectedPlayerData]);

  const columns: Column<teamData>[] = useMemo(
    () => [
      ...(selectedOption === "total"
        ? (totalColumns as Column<teamData>[])
        : []),
      ...(selectedOption === "shoot"
        ? (shootColumns as Column<teamData>[])
        : []),
      ...(selectedOption === "pass" ? (passColumns as Column<teamData>[]) : []),
    ],
    [selectedOption]
  );

  console.log("data", data);
  console.log("cols", columns);
  const tableInstance = useTable({ columns, data } as any);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container">
      <div className="dropdown-wrapper">
        <TeamDataDropdown
          selectedTeamData={selectedTeamData}
          handleTeamDataChange={handleTeamDataChange}
        />
        <PlayerDataDropdown
          selectedPlayerData={selectedPlayerData?.player}
          handlePlayerDataChange={handlePlayerDataChange}
          players={players}
        />
        <FilterDropdown
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="header-cell"
                  style={{ backgroundColor: "rgb(194, 234, 250)" }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            debugger;
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="table-row ${index % 2 === 0 ? 'even' : 'odd'}"
              >
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    className={index === 0 ? "bold-column" : ""}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
