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
    document.getElementById('home-button-div').classList.remove('hidden');
  }

  function evaluatorButtonAction() {
    document.getElementById('startscreen').classList.add('hidden');
    document.getElementById('investor-view').classList.remove('hidden');
    document.getElementById('home-button-div').classList.remove('hidden');
  }

  function homeButtonAction() {
    document.getElementById('home-button-div').classList.add('hidden');
    document.getElementById('startscreen').classList.remove('hidden');
    document.getElementById('homepage').classList.add('hidden');
    document.getElementById('investor-view').classList.add('hidden');
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
        <div id="home-button-div" class="hidden">
          <button type="button" class="button" id="-button" home onClick={homeButtonAction}>
            <span class="button__text">Home</span>
            <span class="button__icon">
              <ion-icon name="home-outline"></ion-icon>
            </span>
          </button>
        </div>
      </header>
    </div>

  );
}

export default App;
