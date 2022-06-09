import './App.css';
import HomePage from './HomePage.jsx';
import StartScreen from './StartScreen.js'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { useState } from "react";
// import RadarChart from "./components/RadarChart";
// import { Data } from "./Data";

function App() {

  function buttonAction() {
    document.getElementById('startscreen').classList.add('hidden');
    document.getElementById('homepage').classList.remove('hidden');
    document.getElementById('begin-button').classList.add('hidden');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Startup Evaluator</h1>
        <div id="startscreen">
          <StartScreen />
          <div id="begin-button-div">
            <button type="button" id="begin-button" onClick={buttonAction}>
              <span class="button__text">Begin</span>
              <span class="button__icon">
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
              </span>
            </button>
          </div>
        </div>
        <div id="homepage" class="hidden">
          <HomePage id="homepage" />
        </div>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

      </header>
    </div>

  );
}

export default App;
