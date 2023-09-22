import { useTable, Column } from "react-table";
import { useEffect, useState, ChangeEvent, useMemo } from "react";
//import TeamDataDropdown from "./teamDataDropdown";
import FilterDropdown from "./filterDropdown";
/*
import PlayerDataDropdown from "./playerDropdown";
import GameDropdown from "./gameDropdown";
*/
import example_data from "../assets/example_data.json";

const makePlayerArray = (data: object) =>
  Object.entries(data).map(([key, value]) => ({
    player: key,
    ...value,
  }));

type teamData = {
  player: string;
  shottype: string;
  totalppp: number | string;
  perofposs: number | string;
  totalto: number | string;
  totalcreationper: number | string;
  totalftr: number | string;
  totaltsper: number | string;
  totalsq: number | string;
  total2ptfga: number | string;
  total2ptfgper: number | string;
  total2ptsq: number | string;
  total3ptfga: number | string;
  total3ptfgper: number | string;
  total3ptsq: number | string;
  shootppp: number | string;
  shootperofposs: number | string;
  shootto: number | string;
  shootfreq: number | string;
  shootftr: number | string;
  shoottsper: number | string;
  shootsq: number | string;
  shoot2ptfga: number | string;
  shoot2ptfgper: number | string;
  shoot2ptsq: number | string;
  shoot3ptfga: number | string;
  shoot3ptfgper: number | string;
  shoot3ptsq: number | string;
  passppp: number | string;
  passperofposs: number | string;
  passto: number | string;
  passcreationper: number | string;
  passftr: number | string;
  passtsper: number | string;
  passsq: number | string;
  pass2ptfga: number | string;
  pass2ptfgper: number | string;
  pass2ptsq: number | string;
  pass3ptfga: number | string;
  pass3ptfgper: number | string;
  pass3ptsq: number | string;
};

const totalColumns = [
  { Header: "Play Type", accessor: "Shot Type" },
  { Header: "PPP", accessor: "Total PPP" },
  { Header: "% of Poss.", accessor: "% of Poss." },
  { Header: "TO", accessor: "Total TO" },
  { Header: "Creation %", accessor: "Total Creation %" },
  { Header: "FTR", accessor: "Total FTR" },
  { Header: "TS%", accessor: "Total TS%" },
  { Header: "Total SQ", accessor: "Total SQ" },
  { Header: "2pt FGA", accessor: "Total 2pt FGA" },
  { Header: "2pt FG%", accessor: "Total 2pt FG%" },
  { Header: "2pt Shot Quality", accessor: "Total 2pt SQ" },
  { Header: "3pt FGA", accessor: "Total 3pt FGA" },
  { Header: "3pt FG%", accessor: "Total 3pt FG%" },
  { Header: "3pt Shot Quality", accessor: "Total 3pt SQ" },
];

const shootColumns = [
  { Header: "Shot Type", accessor: "Shot Type" },
  { Header: "Shooting PPP", accessor: "Shooting PPP" },
  { Header: "% of Poss.", accessor: "% of Shooting Poss." },
  { Header: "TO", accessor: "Shooting TO" },
  { Header: "Shooting Frequency", accessor: "Shooting Freq." },
  { Header: "FTR", accessor: "Shooting FTR" },
  { Header: "TS%", accessor: "Shooting TS%" },
  { Header: "Total Shot Quality", accessor: "Shooting SQ" },
  { Header: "2pt Poss.", accessor: "Shooting 2pt Poss." },
  { Header: "2pt FG%", accessor: "Shooting 2pt FG%" },
  { Header: "2pt Shot Quality", accessor: "Shooting 2pt SQ" },
  { Header: "3pt Poss.", accessor: "Shooting 3pt Poss." },
  { Header: "3pt FG%", accessor: "Shooting 3pt FG%" },
  { Header: "3pt Shot Quality", accessor: "Shooting 3pt SQ" },
];

const passColumns = [
  { Header: "Shot Type", accessor: "Shot Type" },
  { Header: "Creation PPP", accessor: "Creation PPP" },
  { Header: "% of Creation Poss.", accessor: "% of Creation Poss." },
  { Header: "TO", accessor: "Creation TO" },
  { Header: "Creation %", accessor: "Creation %" },
  { Header: "FTR", accessor: "Creation FTR" },
  { Header: "TS%", accessor: "Creation TS%" },
  { Header: "Shot Quality", accessor: "Creation SQ" },
  { Header: "2pt Poss.", accessor: "Creation 2pt FGA" },
  { Header: "2pt FG%", accessor: "Creation 2pt FG%" },
  { Header: "2pt Shot Quality", accessor: "Creation 2pt SQ" },
  { Header: "3pt Poss.", accessor: "Creation 3pt FGA" },
  { Header: "3pt FG%", accessor: "Creation 3pt FG%" },
  { Header: "3pt Shot Quality", accessor: "Creation 3pt SQ" },
];

function Table() {
  const [selectedOption, setSelectedOption] = useState("total");
  //const [selectedTeamData, setSelectedTeamData] = useState("Nuggets");
  //const [players, setPlayers] = useState([...makePlayerArray(nuggets.Overall)]);
  //const [selectedPlayer, setSelectedPlayer] = useState("team");
  const [selectedData, setSelectedData] = useState<teamData[]>([]);
  const [dataFetched, setDataFetched] = useState(false);

  //const [selectedGame, setselectedGame] = useState("Overall");

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    if (newOption !== selectedOption) {
      setSelectedOption(newOption);
    }
  };

  useEffect(() => {
    if (!dataFetched) {
      // Send a POST request to the Flask backend
      fetch("http://127.0.0.1:5000/process_json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(example_data.ovr_data.data),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedData(data);
          console.log(makePlayerArray(data));
          console.log(data);
          setDataFetched(true); // Set dataFetched to true to avoid repeated fetching
        });
    }
  }, [dataFetched]);
  /*
  const handleTeamChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newTeamData = event.target.value;

    if (newTeamData !== selectedTeamData) {
      setSelectedTeamData(newTeamData);
      if (newTeamData === "Nuggets") {
        setPlayers(makePlayerArray(nuggets.Overall));
        setSelectedPlayer("team");
        setSelectedData(nuggets.Overall.team);
      } else if (newTeamData === "Heat") {
        setPlayers(makePlayerArray(heat.Overall));
        setSelectedPlayer("team");
        setSelectedData(heat.Overall.team as any);
      }
    }
  };
/*
  const handlePlayerChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newPlayer = event.target.value;

    if (newPlayer != selectedPlayer) {
      setSelectedPlayer(newPlayer);
      handlePlayerDataChange(newPlayer);
    }
  };

  const handlePlayerDataChange = (newPlayer: string) => {
    if (selectedTeamData === "Nuggets") {
      const playerArray =
        nuggets[selectedGame as "Overall"][
          newPlayer as keyof typeof nuggets.Overall
        ];
      setSelectedData(playerArray as any);
    } else if (selectedTeamData === "Heat") {
      const playerArray =
        heat[selectedGame as "Overall"][newPlayer as keyof typeof heat.Overall];
      setSelectedData(playerArray as any);
    }
  };

  const handleGameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newGame = event.target.value;
    if (newGame != selectedGame) {
      setselectedGame(newGame);
      handleGameDataChange(newGame);
    }
  };

  const handleGameDataChange = (newGame: string) => {
    if (selectedTeamData === "Nuggets") {
      const gameData =
        nuggets[newGame as "Overall"][
          selectedPlayer as keyof typeof nuggets.Overall
        ];
      setSelectedData(gameData as any);
    }
    if (selectedTeamData === "Heat") {
      const gameData =
        heat[newGame as "Overall"][selectedPlayer as keyof typeof heat.Overall];
      setSelectedData(gameData as any);
    }
  };*/

  const data = useMemo(() => selectedData, [selectedData]);

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

  const tableInstance = useTable({ columns, data } as any);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container">
      <div className="dropdown-wrapper">
        {/*
        <TeamDataDropdown
          selectedTeamData={selectedTeamData}
          handleTeamChange={handleTeamChange}
        />
        <PlayerDataDropdown
          selectedPlayer={selectedPlayer}
          handlePlayerChange={handlePlayerChange}
          players={players}
        />*/}
        <FilterDropdown
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        {/*
        <GameDropdown
          selectedGame={selectedGame}
          handleGameChange={handleGameChange}
  />*/}
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
