import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { useTable, Column } from "react-table";
import FilterDropdown from "./filterDropdown";
import example_data from "../assets/example_data.json";
import TeamDataDropdown from "./teamDataDropdown";
import PlayerDataDropdown from "./playerDropdown";
import DrawPlotlyCourt from "../components/court.tsx";

const makePlayerArray = (data: object) =>
  Object.entries(data).map(([key, value]) => ({
    id: key,
    ...value,
  }));

type teamData = {
  "Shot Type": string;
  "Total PPP": number | string;
  "Percentage of Poss": number | string;
  "Total TO": number | string;
  "Total Creation %": number | string;
  "Total FTR": number | string;
  "Total TS%": number | string;
  "Total SQ": number | string;
  "Total 2pt FGA": number | string;
  "Total 2pt FG%": number | string;
  "Total 2pt SQ": number | string;
  "Total 3pt FGA": number | string;
  "Total 3pt FG%": number | string;
  "Total 3pt SQ": number | string;
  "Shooting PPP": number | string;
  "Percentage of Shooting Poss": number | string;
  "Shooting TO": number | string;
  "Shooting Freq": number | string;
  "Shooting FTR": number | string;
  "Shooting TS%": number | string;
  "Shooting SQ": number | string;
  "Shooting 2pt Poss": number | string;
  "Shooting 2pt FG%": number | string;
  "Shooting 2pt SQ": number | string;
  "Shooting 3pt Poss": number | string;
  "Shooting 3pt FG%": number | string;
  "Shooting 3pt SQ": number | string;
  "Creation PPP": number | string;
  "Percentage of Creation Poss": number | string;
  "Creation TO": number | string;
  "Creation %": number | string;
  "Creation FTR": number | string;
  "Creation TS%": number | string;
  "Creation SQ": number | string;
  "Creation 2pt Poss": number | string;
  "Creation 2pt FG%": number | string;
  "Creation 2pt SQ": number | string;
  "Creation 3pt Poss": number | string;
  "Creation 3pt FG%": number | string;
  "Creation 3pt SQ": number | string;
};

const totalColumns: Column<teamData>[] = [
  { Header: "Play Type", accessor: "Shot Type" },
  { Header: "PPP", accessor: "Total PPP" },
  { Header: "% of Poss.", accessor: "Percentage of Poss" },
  { Header: "TO", accessor: "Total TO" },
  { Header: "Creation %", accessor: "Total Creation %" },
  { Header: "FTR", accessor: "Total FTR" },
  { Header: "TS%", accessor: "Total TS%" },
  { Header: "Total SQ", accessor: "Total SQ" },
  { Header: "2pt FGA", accessor: "Total 2pt FGA" },
  { Header: "2pt FG%", accessor: "Total 2pt FG%" },
  { Header: "2pt SQ", accessor: "Total 2pt SQ" },
  { Header: "3pt FGA", accessor: "Total 3pt FGA" },
  { Header: "3pt FG%", accessor: "Total 3pt FG%" },
  { Header: "3pt SQ", accessor: "Total 3pt SQ" },
];

const shootColumns: Column<teamData>[] = [
  { Header: "Play Type", accessor: "Shot Type" },
  { Header: "PPP", accessor: "Shooting PPP" },
  { Header: "% of Poss.", accessor: "Percentage of Shooting Poss" },
  { Header: "TO", accessor: "Shooting TO" },
  { Header: "Shot Freq.", accessor: "Shooting Freq" },
  { Header: "FTR", accessor: "Shooting FTR" },
  { Header: "TS%", accessor: "Shooting TS%" },
  { Header: "Total SQ", accessor: "Shooting SQ" },
  { Header: "2pt FGA", accessor: "Shooting 2pt Poss" },
  { Header: "2pt FG%", accessor: "Shooting 2pt FG%" },
  { Header: "2pt SQ", accessor: "Shooting 2pt SQ" },
  { Header: "3pt FGA", accessor: "Shooting 3pt Poss" },
  { Header: "3pt FG%", accessor: "Shooting 3pt FG%" },
  { Header: "3pt SQ", accessor: "Shooting 3pt SQ" },
];

const passColumns: Column<teamData>[] = [
  { Header: "Play Type", accessor: "Shot Type" },
  { Header: "PPP", accessor: "Creation PPP" },
  { Header: "% of Poss.", accessor: "Percentage of Creation Poss" },
  { Header: "TO", accessor: "Creation TO" },
  { Header: "Creation %", accessor: "Creation %" },
  { Header: "FTR", accessor: "Creation FTR" },
  { Header: "TS%", accessor: "Creation TS%" },
  { Header: "Total SQ", accessor: "Creation SQ" },
  { Header: "2pt FGA", accessor: "Creation 2pt Poss" },
  { Header: "2pt FG%", accessor: "Creation 2pt FG%" },
  { Header: "2pt SQ", accessor: "Creation 2pt SQ" },
  { Header: "3pt FGA", accessor: "Creation 3pt Poss" },
  { Header: "3pt FG%", accessor: "Creation 3pt FG%" },
  { Header: "3pt SQ", accessor: "Creation 3pt SQ" },
];

function Table() {
  const [selectedData, setSelectedData] = useState(example_data.ovr_data.data);
  const [selectedShotLocations, setSelectedShotLocations] = useState(
    example_data.ovr_data.shooting_locations
  );
  const [dataFetched, setDataFetched] = useState(false);
  const [selectedOption, setSelectedOption] = useState("total");

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newOption = event.target.value;

    if (newOption != selectedOption) {
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
        body: JSON.stringify(example_data),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedData(data.ovr_data.data);
          setSelectedShotLocations(data.ovr.shooting_locations);
          setDataFetched(true);
        });
    }
  }, [selectedData, dataFetched]);

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

  const data = useMemo(() => makePlayerArray(selectedData), [selectedData]);

  const tableInstance = useTable({ columns, data } as any);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="container">
      <div className="dropdown-wrapper">
        {/* <TeamDataDropdown
          selectedTeamData={selectedTeamData}
          handleTeamDataChange={handleTeamDataChange}
        />
        <PlayerDataDropdown
          selectedPlayer={selectedPlayer}
          handlePlayerChange={handlePlayerChange}
          players={players}
        /> */}
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
      <div className="court-container">
        <DrawPlotlyCourt data={selectedShotLocations} />
      </div>
    </div>
  );
}
export default Table;
