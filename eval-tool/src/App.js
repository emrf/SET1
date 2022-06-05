import './App.css';
import HomePage from './HomePage.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { useState } from "react";
// import RadarChart from "./components/RadarChart";
// import { Data } from "./Data";

function App() {



  return (
    <div className="App">
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <header className="App-header">
        <h1>Startup Evaluation Tool</h1>
        <HomePage />
        {/* <div id="radar-canvas" style={{ width: 500 }}>
          <RadarChart chartData={Data} />

        </div> */}
      </header>


    </div>

  );
}

export default App;
