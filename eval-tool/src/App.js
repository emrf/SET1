import './App.css';
import HomePage from './HomePage.jsx';
import InvestorView from './InvestorView.jsx';
import StartScreen from './StartScreen.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';


function App() {

  function buttonAction() {
    document.getElementById('startscreen').classList.add('hidden');
    document.getElementById('homepage').classList.remove('hidden');
  }

  function evaluatorButtonAction() {
    document.getElementById('startscreen').classList.add('hidden');
    document.getElementById('investor-view').classList.remove('hidden');
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Startup Evaluator</h1>
        <div id="startscreen">
          <StartScreen />
          <div id="begin-button-div">
            <button type="button" class="button" id="begin-button" onClick={buttonAction}>
              <span class="button__text">Begin - Startups</span>
              <span class="button__icon">
                <ion-icon name="arrow-forward-circle-outline"></ion-icon>
              </span>
            </button>
          </div>
          <br />
          <div id="investor-button-div">
            <button type="button" class="button" id="investor-button" onClick={evaluatorButtonAction}>
              <span class="button__text">Begin - Evaluators</span>
              <span class="button__icon">
                <ion-icon name="cash-outline"></ion-icon>
              </span>
            </button>
          </div>
        </div>
        <div id="homepage" class="hidden">
          <HomePage />

        </div>

        <div id="investor-view" class="hidden">
          <InvestorView />
        </div>

      </header>
    </div>

  );
}

export default App;
