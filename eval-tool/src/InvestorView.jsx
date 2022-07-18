import React, { Component } from 'react';
import ReactSlider from 'react-slider'
import axios from 'axios';
import { postURL } from './HomePage';
// import { WeightData } from '.';
import { useState } from 'react';
import { precisionRound } from 'd3';

export var WeightData = {};
// sheet.best api connection url for weight data for criteria. Not backend database.
// Ask Eran for login. 
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
    this.backendKeyword = 'subjective_'; //all subjective criteria must start like this on gsheet
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
    //executed on press of submit button
    var putState = {}  //putState is JSON submitted by axios to database (weightURL)
    let name = this.companyName;
    var notFound = true;
    for (var i = 0; i < this.dictSize(this.stateData); i++) {
      //loop through database to find name of evaluation submitted
      var row = this.stateData[i]; //current row data
      try {
        if (row['name'].toLowerCase() === name.toLowerCase() && notFound) {
          // if row name matches entered name
          putState = row; //start by setting putState to current data
          delete putState.Criteria; //don't need this
          var numEvals = parseInt(row['numEvals']);
          putState['numEvals'] = 1 + numEvals; //inc number of evals
          var values = Array.from(document.querySelectorAll('.custom-input')).map(input => parseInt(input.value));
          // ^get all values of evaluator text inputs. all must have "custom-input" class.
          // loop through subjective labels and assign values in putState
          for (var j = 0; j < this.subjectiveCriteria.length; j++) {
            //loop through labels of subjectiveCriteria (var made in this.parseWeightData())
            var e = this.subjectiveCriteria[j]; //assign to e
            var putSubjI = values[j];
            //values[j] should be value associated with label subjectiveCriteria[i] by default
            var subjRowVal = 0; //set this var to 0
            try {
              subjRowVal = parseInt(row[e])
              //^then try to set it two an extracted int value of current subjective criteria
            } catch (err) { }
            if (!isNaN(subjRowVal)) {
              // if not NaN then compute a new mean from numEvals, current val, and inputted val
              var subjCum = subjRowVal * numEvals;
              putSubjI = (subjCum + putSubjI) / (1 + numEvals);
              putState[e] = putSubjI;
            } else {
              // else (no previous entry) set it to inputted val
              putState[e] = putSubjI;
            }
          }
          var putURL = postURL + '/' + i;
          //postUrl ends in '/' + no line in sheet to submit to
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

    await axios.put(putURL, putState); //upon submit hide and show next screen
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
    //called upon mount
    var count = 0;
    //loop through WeightData https://docs.google.com/spreadsheets/d/18lZ09UBT1S7jeZuqDDt8yDVpks4bK5farrYgEU0bY2U/edit#gid=0 
    for (var i = 0; i < WeightData.length; i++) {
      var row = WeightData[i];
      try {
        var parsedName = row['Criteria'].toLowerCase(); //this fails if row is empty
        if (parsedName.includes(this.backendKeyword) && !(this.subjectiveCriteria.includes(parsedName))) {
          // iif this row is for a subjective eval entry and has not been read already
          this.subjectiveCriteria.push(parsedName); //append
          parsedName = parsedName.substring(this.backendKeyword.length); //change this var to what appears on the label
          var label = document.createElement('label');
          label.innerHTML = parsedName; //create a label html tag
          label.setAttribute('class', 'custom-label'); //give it this necessary attribute
          var labelText = 'subj-input-' + toString(count); //create custom id
          label.setAttribute('htmlFor', labelText);
          var newInput = document.createElement('input'); //create input tag with custom id
          const breaker = document.createElement('br');
          newInput.setAttribute('type', 'text');
          newInput.setAttribute('id', labelText);
          newInput.setAttribute('class', 'custom-input');
          newInput.setAttribute('onkeypress', "return this.isANumberKey(this, event);");
          document.getElementById('sliders').appendChild(label).appendChild(newInput).appendChild(breaker); //add to div
          count++;
        }
      } catch (err) { console.log(err) }
    }
  }

  async componentDidMount() {
    WeightData = await axios.get(weightURL); //load weight data on mount
    WeightData = WeightData.data; //necessary
    const tdata = await axios.get(postURL); //load database
    this.stateData = tdata.data; //set stateData to database
    this.setState(this.stateData.data, this.completeMount); //also this
    //call completeMount() when done
  }

  isNanOrBlank(str) {
    return (isNaN(str) || str === '' || str === 'LEAVE_BLANK')
  }

  roundSafe(num) {
    //round if not nan
    var parsed = parseInt(num);
    if (isNaN(parsed)) {
      return num;
    }
    return parsed;
  }

  async completeMount() {
    //sets up html for table creation
    var col = [];
    for (var i = 0; i < this.dictSize(this.stateData); i++) {
      for (var key in this.stateData[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key); //headers
        }
      }
    }

    var table = document.createElement("table");
    var tr = table.insertRow(-1);
    for (var i = 0; i < this.dictSize(col); i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th); //create columns
    }

    for (var i = 0; i < this.dictSize(this.stateData); i++) {
      if (this.isNanOrBlank(this.stateData[i]['name'])) {
        //only add non blank rows
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
    this.parseWeightData(); //call parseWeightData
  }

  render() {
    return (
      <div>
        <div id="hidable">
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
        <div id="submitted" class="hidden">
          <h2>Thank you for Participating!</h2>
          <h3>Results</h3>
        </div>
      </div>
    )
  }
}

