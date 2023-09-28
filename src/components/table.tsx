import { useEffect, useState, useMemo, ChangeEvent } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import FilterDropdown from "./filterDropdown";
import example_data from "../assets/example_data.json";
import { defaultStyles } from "../assets/tableStyles";

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

const totalColumns: TableColumn<teamData>[] = [
  { name: "Play Type", selector: (row) => row["Shot Type"] },
  { name: "PPP", selector: (row) => row["Total PPP"] },
  { name: "% of Poss.", selector: (row) => row["Percentage of Poss"] },
  { name: "TO", selector: (row) => row["Total TO"] },
  { name: "Creation %", selector: (row) => row["Total Creation %"] },
  { name: "FTR", selector: (row) => row["Total FTR"] },
  { name: "TS%", selector: (row) => row["Total TS%"] },
  { name: "Total SQ", selector: (row) => row["Total SQ"] },
  { name: "2pt FGA", selector: (row) => row["Total 2pt FGA"] },
  { name: "2pt FG%", selector: (row) => row["Total 2pt FG%"] },
  { name: "2pt SQ", selector: (row) => row["Total 2pt SQ"] },
  { name: "3pt FGA", selector: (row) => row["Total 3pt FGA"] },
  { name: "3pt FG%", selector: (row) => row["Total 3pt FG%"] },
  { name: "3pt SQ", selector: (row) => row["Total 3pt SQ"] },
];

const shootColumns: TableColumn<teamData>[] = [
  { name: "Shot Type", selector: (row) => row.shottype },
  { name: "Shooting PPP", selector: (row) => row.shootppp },
  { name: "% of Poss.", selector: (row) => row.shootperofposs },
  { name: "TO", selector: (row) => row.shootto },
  { name: "Shooting Frequency", selector: (row) => row.shootfreq },
  { name: "FTR", selector: (row) => row.shootftr },
  { name: "TS%", selector: (row) => row.shoottsper },
  { name: "Total Shot Quality", selector: (row) => row.shootsq },
  { name: "2pt Poss.", selector: (row) => row.shoot2ptfga },
  { name: "2pt FG%", selector: (row) => row.shoot2ptfgper },
  { name: "2pt Shot Quality", selector: (row) => row.shoot2ptsq },
  { name: "3pt Poss.", selector: (row) => row.shoot3ptfga },
  { name: "3pt FG%", selector: (row) => row.shoot3ptfgper },
  { name: "3pt Shot Quality", selector: (row) => row.shoot3ptsq },
];

const passColumns: TableColumn<teamData>[] = [
  { name: "Shot Type", selector: (row) => row.shottype },
  { name: "Creation PPP", selector: (row) => row.passppp },
  { name: "% of Creation Poss.", selector: (row) => row.passperofposs },
  { name: "TO", selector: (row) => row.passto },
  { name: "Creation %", selector: (row) => row.passcreationper },
  { name: "FTR", selector: (row) => row.passftr },
  { name: "TS%", selector: (row) => row.passtsper },
  { name: "Shot Quality", selector: (row) => row.passsq },
  { name: "2pt Poss.", selector: (row) => row.pass2ptfga },
  { name: "2pt FG%", selector: (row) => row.pass2ptfgper },
  { name: "2pt Shot Quality", selector: (row) => row.pass2ptsq },
  { name: "3pt Poss.", selector: (row) => row.pass3ptfga },
  { name: "3pt FG%", selector: (row) => row.pass3ptfgper },
  { name: "3pt Shot Quality", selector: (row) => row.pass3ptsq },
];

const customStyles = {
  header: {
    style: {
      fontSize: "30px",
      minHeight: "56px",
      paddingLeft: "16px",
      paddingRight: "8px",
    },
  },
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "0px", // override the cell padding for head cells
      paddingRight: "0px",
    },
  },
  cells: {
    style: {
      paddingLeft: "0px", // override the cell padding for data cells
      paddingRight: "0px",
    },
  },
};

function Table() {
  const [selectedData, setSelectedData] = useState(example_data.ovr_data.data);
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
        body: JSON.stringify(example_data.ovr_data.data),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedData(data);
          setDataFetched(true);
        });
    }
  }, [selectedData, dataFetched]);

  const columns: TableColumn<teamData>[] = useMemo(
    () => [
      ...(selectedOption === "total"
        ? (totalColumns as TableColumn<teamData>[])
        : []),
      ...(selectedOption === "shoot"
        ? (shootColumns as TableColumn<teamData>[])
        : []),
      ...(selectedOption === "pass"
        ? (passColumns as TableColumn<teamData>[])
        : []),
    ],
    [selectedOption]
  );
  console.log(makePlayerArray(selectedData));
  return (
    <div>
      <FilterDropdown value={selectedOption} onChange={handleOptionChange} />
      <DataTable
        columns={columns}
        data={makePlayerArray(selectedData)}
        customStyles={customStyles}
        dense={true}
        highlightOnHover={true}
        pagination={false}
        striped={true}
      />
    </div>
  );
}
export default Table;
