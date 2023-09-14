import "./styles.css";
import Table from "./components/table.tsx";
import Title from "./components/Title.tsx";
import DrawPlotlyCourt from "./components/court.tsx";

function App() {
  return (
    <>
      <h1 className="header">
        <Title />
      </h1>
      <div className="table-container">
        <Table />
      </div>
      <div className="court-container">
        <DrawPlotlyCourt />
      </div>
    </>
  );
}

export default App;
