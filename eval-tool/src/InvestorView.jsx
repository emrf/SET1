import React, { Component } from 'react';
import ReactSlider from 'react-slider'
import axios from 'axios';
import { postURL } from './HomePage';
import { useState } from 'react';

const blankPost = {
  "name": "", "funding": "", "growthRate": "", "burnRate": "",
  "patents": "", "subjective1": "", "subjective2": "", "numEvals": 0
}

export default class InvestorView extends Component {
  constructor() {
    super();
    this.state = {};
    this.subjective1 = 0;
    this.sliderAction = this.sliderAction.bind(this);
    this.submitButton = this.submitButton.bind(this);
    this.updateName = this.updateName.bind(this);
    this.companyName = '';
  }

  updateName(val) {
    this.companyName = val.target.value;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  submitButton() {
    var putState = {}
    let name = this.companyName;
    for (var i = 0; i < this.state.length; i++) {
      var row = this.state[i];
      if (row['name'] === name) {
        putState = row;
        var numEvals = parseInt(row['numEvals']);
        var putSubj = this.subjective1;
        var subjRowVal = parseInt(row['subjective1']);
        if (isNaN(subjRowVal) || subjRowVal === 'NaN' || subjRowVal == '') {
        } else {
          var subj1Cum = subjRowVal * numEvals;
          putSubj = (subj1Cum + this.subjective1) / (1 + numEvals);

        }

        //putState = { "name": name, "subjective1": putSubj, "numEvals": 1 + numEvals }
        putState['subjective1'] = putSubj;
        putState['numEvals'] = 1 + numEvals;
        var putURL = postURL + '/' + i;
        //axios.put(putURL, putState);
      }
    }
    if (this.isEmpty(putState)) {
      putState = blankPost;
      putState["name"] = name;
      putState["subjective1"] = this.subjective1;
      putState["numEvals"] = 0;
    }
    console.log(putState);
    axios.put(putURL, putState);
  }

  sliderAction(val, i) {
    this.subjective1 = val;
  }

  async componentDidMount() {
    var tdata = await axios.get(postURL);
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
        < br />
        <label id="nameInputLabel" class="itm" htmlFor='nameInput'>
          Company Name:
        </label>
        <input id='nameInput' type='text' placeholder='Company A...' onChange={this.updateName}></input>
        <br />
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
        <br />
        <button type="button" class="button" id="submit-button" onClick={this.submitButton}>
          <span class="button__text">Submit</span>
          <span class="button__icon">
            <ion-icon name="checkmark-done"></ion-icon>
          </span>
        </button>
      </div>
    )
  }
}

