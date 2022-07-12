import React, { Component } from 'react';
import ReactSlider from 'react-slider'
import axios from 'axios';
import { postURL } from './HomePage';
// import { WeightData } from '.';
import { useState } from 'react';

export var WeightData = {};
const weightURL = 'https://sheet.best/api/sheets/03022bd4-76eb-4da0-ae15-c510ae78d99a';

const blankPost = {
  "name": "", "numEvals": 0
}

export default class InvestorView extends Component {
  constructor() {
    super();
    this.state = {};
    this.submitButton = this.submitButton.bind(this);
    this.updateName = this.updateName.bind(this);
    this.parseWeightData = this.parseWeightData.bind(this);
    this.isANumberKey = this.isANumberKey.bind(this);
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

  submitButton() {
    var putState = {}
    let name = this.companyName;
    console.log(this.state);
    for (var i = 0; i < this.state.length; i++) {
      var row = this.state[i];
      try {
        if (row['name'].toLowerCase() === name.toLowerCase()) {
          putState = row;
          var numEvals = parseInt(row['numEvals']);
          putState['numEvals'] = 1 + numEvals;
          var values = Array.from(document.querySelectorAll('.custom-input')).map(input => input.value);
          for (var j = 0; j < this.subjectiveCriteria.length; j++) {
            var e = this.subjectiveCriteria[j];
            var putSubjI = values[j];
            var subjRowVal = 0;
            try { subjRowVal = parseInt(row[e]) } catch (err) { }
            if (!isNaN(subjRowVal) || subjRowVal == 'NaN' || subjRowVal == '') {
              var subjCum = subjRowVal * numEvals;
              console.log(subjRowVal);
              console.log(numEvals);
              console.log(putSubjI);
              putSubjI = (subjCum + putSubjI) / (1 + numEvals);
              putState[e] = putSubjI;
            }
          }
          var putURL = postURL + '/' + i;
          //axios.put(putURL, putState);
        }
      } catch (err) { console.log(err) }
    }
    if (this.isEmpty(putState)) {
      putState = blankPost;
      putState["name"] = name;
      putState["numEvals"] = 0;
    }

    console.log(putState);
    axios.put(putURL, putState);
    document.getElementById('');
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
    console.log(WeightData);
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
          label.setAttribute('htmlFor', labelText)
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
    console.log(this.subjectiveCriteria)
  }

  async componentDidMount() {
    var tdata = await axios.get(postURL);
    WeightData = await axios.get(weightURL);
    WeightData = WeightData.data;
    console.log(WeightData);
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
    this.parseWeightData();
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
        <div id="sliders">
          {/* <label id="subj-label1">{this.subjectiveName1}</label>
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
          />
          <label id="subj-label2">{this.subjectiveName2}</label>
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
            onChange={this.sliderAction2}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            renderTrack={(props, state) => <div {...props} />}
          /> */}
        </div>
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

