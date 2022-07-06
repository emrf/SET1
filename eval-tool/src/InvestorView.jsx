import React, { Component } from 'react';
import ReactSlider from 'react-slider'
import axios from 'axios';

const dataURL = 'https://sheet.best/api/sheets/19286fe5-7607-411d-b58f-86fc9f764b63';
//const data = axios.get(dataURL);

export default class InvestorView extends Component {
  constructor() {
    super();
    this.state = {};
    this.sliderAction = this.sliderAction.bind(this);
  }

  sliderAction(val, i) {
    this.setState({ "subjective1": val })
  }

  async componentDidMount() {
    var tdata = await axios.get(dataURL);
    this.state = tdata.data;
    console.log(this.state);
    var col = [];
    for (var i = 0; i < this.state.length; i++) {
      for (var key in this.state[i]) {
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

    for (var i = 0; i < this.state.length; i++) {
      tr = table.insertRow(-1);
      for (var j = 0; j < col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.state[i][col[j]];
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
        <div class="slider-space QA">
          <label>Rate Team: </label>
          <ReactSlider id="slider"
            className="horizontal-slider"
            marks={true}
            defaultValue={0}
            min={0}
            max={100}
            thumbClassName="example-thumb"
            thumbActiveClassName='current-thumb'
            trackClassName="example-track"
            markClassName="example-mark"
            onChange={this.sliderAction}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            renderTrack={(props, state) => <div {...props} />}
          /></div>
      </div>
    )
  }
}

