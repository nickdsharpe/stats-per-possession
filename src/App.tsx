import "./assets/styles.css";
import Table from "./components/table.tsx";
import Title from "./components/Title.tsx";

function App() {
  return (
    <>
      {/* <h1 className="header">
        <Title />
      </h1> */}
      <div className="table-container">
        <Table />
      </div>
    </>
  );
}

export default App;
