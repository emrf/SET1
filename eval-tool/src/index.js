import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Papa from 'papaparse';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const Tabletop = require('tabletop');
// var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/18lZ09UBT1S7jeZuqDDt8yDVpks4bK5farrYgEU0bY2U/edit#gid=0'
export var WeightData = [];
function init() {
  Papa.parse('https://docs.google.com/spreadsheets/d/18lZ09UBT1S7jeZuqDDt8yDVpks4bK5farrYgEU0bY2U/edit#gid=0', {
    download: true,
    header: false,
    complete: function (results) {
      WeightData = results.data
    }
  })
}
window.addEventListener('DOMContentLoaded', init);
