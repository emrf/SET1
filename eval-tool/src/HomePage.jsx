import React, { Component } from 'react';
import * as d3 from 'd3';
import ReactSlider from 'react-slider'
// import RadarChart from "./components/RadarChart";
import { Data } from "./Data";
import $ from 'jquery';
import { Chart } from 'chart.js';


export default class HomePage extends Component {
  constructor() {
    super();
    document.title = "Startup Evaluator";
    this.state = {
      funding: "A",
      sector: "Other",
      execExper: 5,
      score: 0,
      data: Data,
    }
    this.fundingMap = { "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5 }
    this.sectorMap = {
      "Ecommerce": 0, "Finance": 2,
      "Healthcare": 4, "Insurance": 6,
      "Tech (hardware)": 8, "Tech (software)": 10,
      "Other": 0
    }
    this.fundingInput = this.fundingInput.bind(this);
    this.sectorInput = this.sectorInput.bind(this);
    this.updateSlider = this.updateSlider.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.updateChart = this.updateChart.bind(this);
  }

  updateSlider(val, i) {
    let newData = this.state.data
    newData.data.datasets[0].data[0] = val * 10 //set first index of "your company" dataset to exec exper val
    this.setState({ execExper: val, data: newData }, this.updateScore);
    this.updateChart(newData);
  }

  fundingInput() {
    let fundingStage = d3.select('#fundingSelect').property('value');
    this.setState({ funding: fundingStage }, this.updateScore)
    console.log(fundingStage);
  }

  sectorInput() {
    let sector = d3.select('#sectorSelect').property('value');
    let newData = this.state.data;
    newData.data.datasets[0].data[4] = this.sectorMap[sector] * 10;
    this.setState({ sector: sector, data: newData }, this.updateScore)
    console.log(sector);
  }

  updateScore() {
    let fundingStage = this.state.funding;
    let fundingScore = this.fundingMap[fundingStage];
    let sector = this.state.sector;
    let sectorScore = this.sectorMap[sector];
    let execScore = this.state.execExper;
    let newScore = sectorScore + fundingScore + execScore;

    let newData = this.state.data;
    this.updateChart(newData);

    this.setState({ score: newScore })
    document.getElementById("score-text").innerHTML = newScore;
    console.log(newScore);
  }

  updateChart(newData) {
    var ctx = document.getElementById('radar-canvas');
    var newChart = new Chart(ctx, newData);
    newChart.update();
  }

  componentDidMount() {
    var ctx = document.getElementById('radar-canvas');
    var newChart = new Chart(ctx, this.state.data);
    newChart.update();
  }

  render() {
    return (
      <div className="Home-Page">
        <script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-core.min.js">     </script>
        <script src="https://cdn.anychart.com/releases/8.7.1/js/anychart-radar.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>

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
        <canvas id="radar-canvas" style={{ width: 500 }}>
          {/* <RadarChart id="chart" chartData={this.state.data} /> */}

        </canvas>

      </div >
    )
  }
}

