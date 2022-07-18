import React, { Component } from 'react';
import ReactSlider from 'react-slider'
import axios from 'axios';
import { postURL } from './HomePage';
// import { WeightData } from '.';
import { useState } from 'react';
import { precisionRound } from 'd3';

export var WeightData = {};
const weightURL = 'https://sheet.best/api/sheets/03022bd4-76eb-4da0-ae15-c510ae78d99a';

const blankPost = {
  "name": "", "numEvals": 0
}

export default class InvestorView extends Component {
  constructor() {
    super();
    this.state = {};
    this.stateData = {};
    this.submitButton = this.submitButton.bind(this);
    this.updateName = this.updateName.bind(this);
    this.parseWeightData = this.parseWeightData.bind(this);
    this.isANumberKey = this.isANumberKey.bind(this);
    this.dictSize = this.dictSize.bind(this);
    this.completeMount = this.completeMount.bind(this);
    this.isNanOrBlank = this.isNanOrBlank.bind(this);
    this.roundSafe = this.roundSafe.bind(this);
    this.companyName = '';
    this.backendKeyword = 'subjective_';
    this.subjectiveCriteria = [];
  }

  updateName(val) {
    this.companyName = val.target.value;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  dictSize(obj) {
    return Object.keys(obj).length;
  }

  async submitButton() {
    var putState = {}
    let name = this.companyName;
    var notFound = true;
    for (var i = 0; i < this.dictSize(this.stateData); i++) {
      var row = this.stateData[i];
      try {
        if (row['name'].toLowerCase() === name.toLowerCase() && notFound) {
          putState = row;
          delete putState.Criteria;
          var numEvals = parseInt(row['numEvals']);
          putState['numEvals'] = 1 + numEvals;
          var values = Array.from(document.querySelectorAll('.custom-input')).map(input => parseInt(input.value));
          // ^subjective value inputs
          // loop through subjective labels and assign values in putState
          for (var j = 0; j < this.subjectiveCriteria.length; j++) {
            var e = this.subjectiveCriteria[j];
            var putSubjI = values[j];
            var subjRowVal = 0;
            try { subjRowVal = parseInt(row[e]) } catch (err) { }
            if (!isNaN(subjRowVal)) {
              var subjCum = subjRowVal * numEvals;
              putSubjI = (subjCum + putSubjI) / (1 + numEvals);
              putState[e] = putSubjI;
            } else {
              putState[e] = putSubjI;
            }
          }
          var putURL = postURL + '/' + i;
          notFound = false;
          //axios.put(putURL, putState);
        }
      } catch (err) { console.log(err) }
    }
    // console.log(putState);
    // if (this.isEmpty(putState)) {
    //   putState = blankPost;
    //   putState["name"] = name;
    //   putState["numEvals"] = 0;
    // }

    await axios.put(putURL, putState);
    document.getElementById('hidable').classList.add('hidden');
    document.getElementById('submitted').classList.remove('hidden');
  }

  isANumberKey(txt, evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode == 46) {
      //Check if the text already contains the . character
      if (txt.value.indexOf('.') === -1) {
        return true;
      } else {
        return false;
      }
    } else {
      if (charCode > 31 &&
        (charCode < 48 || charCode > 57))
        return false;
    }
    return true;
  }

  parseWeightData() {
    var count = 0;
    for (var i = 0; i < WeightData.length; i++) {
      var row = WeightData[i];
      try {
        var parsedName = row['Criteria'].toLowerCase();
        if (parsedName.includes(this.backendKeyword) && !(this.subjectiveCriteria.includes(parsedName))) {
          this.subjectiveCriteria.push(parsedName);
          parsedName = parsedName.substring(this.backendKeyword.length);
          var label = document.createElement('label');
          label.innerHTML = parsedName;
          label.setAttribute('class', 'custom-label');
          var labelText = 'subj-input-' + toString(count);
          label.setAttribute('htmlFor', labelText);
          var newInput = document.createElement('input');
          const breaker = document.createElement('br');
          newInput.setAttribute('type', 'text');
          newInput.setAttribute('id', labelText);
          newInput.setAttribute('class', 'custom-input');
          newInput.setAttribute('onkeypress', "return this.isANumberKey(this, event);");
          document.getElementById('sliders').appendChild(label).appendChild(newInput).appendChild(breaker);
          count++;
        }
      } catch (err) { console.log(err) }
    }
  }

  async componentDidMount() {
    WeightData = await axios.get(weightURL);
    WeightData = WeightData.data;
    const tdata = await axios.get(postURL);
    this.stateData = tdata.data;
    this.setState(this.stateData.data, this.completeMount);
    //this.state = tdata.data;
  }

  isNanOrBlank(str) {
    return (isNaN(str) || str === '' || str === 'LEAVE_BLANK')
  }

  roundSafe(num) {
    var parsed = parseInt(num);
    if (isNaN(parsed)) {
      return num;
    }
    return parsed;
  }

  async completeMount() {
    var col = [];
    for (var i = 0; i < this.dictSize(this.stateData); i++) {
      for (var key in this.stateData[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    for (var i = 0; i < this.dictSize(col); i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    for (var i = 0; i < this.dictSize(this.stateData); i++) {
      if (this.isNanOrBlank(this.stateData[i]['name'])) {
        tr = table.insertRow(-1);
        for (var j = 0; j < col.length; j++) {
          var tabCell = tr.insertCell(-1);
          if (j > 0) {
            tabCell.innerHTML = (this.roundSafe(this.stateData[i][col[j]]));
          }
        }
      }
    }
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    this.parseWeightData();
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div>
        <div class="hidable">
          <div id="showData">
          </div>
          < br />
          <label id="nameInputLabel" class="itm" htmlFor='nameInput'>
            Company Name:
          </label>
          <input id='nameInput' type='text' placeholder='Company A...' onChange={this.updateName}></input>
          <br />
          <div id="sliders">

          </div>
          <br />
          <button type="button" class="button" id="submit-button" onClick={this.submitButton}>
            <span class="button__text">Submit</span>
            <span class="button__icon">
              <ion-icon name="checkmark-done"></ion-icon>
            </span>
          </button>
        </div>
        <div class="submitted hidden">
          <h2>Thank you for Participating!</h2>
          <h3>Results</h3>
        </div>
      </div>
    )
  }
}

