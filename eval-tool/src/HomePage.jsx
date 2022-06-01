import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactSlider from 'react-slider'



export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      funding: "A",
      sector: "Other",
      execExper: 5,
      score: 0,
    }
    this.fundingMap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 }
    this.sectorMap = {
      "Ecommerce": 0, "Finance": 1,
      "Healthcare": 2, "Insurance": 3,
      "Tech (hardware)": 4, "Tech (software)": 5,
      "Other": 0
    }
    this.fundingInput = this.fundingInput.bind(this);
    this.sectorInput = this.sectorInput.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
    this.updateResult = this.updateResult.bind(this);

  }

  updateSlider(val, i) {
    console.log(val)
    this.setState({ execExper: val }, this.updateResult);
  }

  fundingInput() {
    let fundingStage = d3.select('#fundingSelect').property('value');
    this.setState({ funding: fundingStage }, this.updateResult)
    console.log(fundingStage);
  }

  sectorInput() {
    let sector = d3.select('#sectorSelect').property('value');
    this.setState({ sector: sector }, this.updateResult)
    console.log(sector);
  }

  updateResult() {
    let fundingStage = this.state.funding;
    let fundingScore = this.fundingMap[fundingStage];
    let sector = this.state.sector;
    let sectorScore = this.sectorMap[sector];
    let execScore = this.state.execExper;
    let newScore = sectorScore + fundingScore + execScore;
    this.setState({ score: newScore })
    document.getElementById("score-text").innerHTML = newScore;
    console.log(newScore);
  }


  render() {
    return (
      <div className="Home-Page">
        <br />
        <div class="QA">
          <label htmlFor="fundingSelect">
            What stage of funding are you currently looking for?
          </label>
          <select id="fundingSelect" class="selector" onChange={this.fundingInput}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
            <option value="F">F</option>
          </select>
        </div>
        <br />

        <div class="QA">
          <label htmlFor="sectorSelect">
            What sector is your company in?
          </label>
          <select id="sectorSelect" class="selector" onChange={this.sectorInput}>
            <option value="Ecommerce">Ecommerce</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Insurance">Insurance</option>
            <option value="Tech (hardware)">Tech (hardware)</option>
            <option value="Tech (software)">Tech (software)</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br />
        <div class="slider-space">
          <label>Rate your executive's experience: </label>
          <ReactSlider id="slider"
            className="horizontal-slider"
            marks={true}
            defaultValue={5}
            min={0}
            max={10}
            thumbClassName="example-thumb"
            thumbActiveClassName='current-thumb'
            trackClassName="example-track"
            markClassName="example-mark"
            onChange={this.updateSlider}
            renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          />


        </div>
        <br />
        <div class="div-score">
          <p >Score: <span id="score-text"></span></p>
        </div>
      </div >
    )
  }
}

