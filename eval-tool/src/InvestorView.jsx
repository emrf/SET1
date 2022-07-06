import React, { Component } from 'react';
import axios from 'axios';

const dataURL = 'https://sheet.best/api/sheets/19286fe5-7607-411d-b58f-86fc9f764b63';
//const data = axios.get(dataURL);

export default class InvestorView extends Component {
  constructor() {
    super();
    this.state = { "data": {} };
  }

  async componentDidMount() {
    this.state.data = await axios.get(dataURL);
    this.state.data = this.state.data.data;
    console.log(this.state.data);
    var col = [];
    for (var i = 0; i < this.state.data.length; i++) {
      for (var key in this.state.data[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    for (var i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);

    }

    for (var i = 0; i < this.state.data.length; i++) {
      tr = table.insertRow(-1);
      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.state.data[i][col[j]];
      }
    }

    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
  }


  render() {
    return (
      <div>
        <div id="showData">

        </div>
      </div>
    )
  }
}

