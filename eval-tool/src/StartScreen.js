import React, { Component } from 'react';


export default class StartScreen extends Component {
  render() {
    return (
      <div className='Start-Screen'>
        <div id="description">
          <p id="description-text">
            Welcome! Our goal at Strategic Moves is to help you identify
            key gaps in your company. Using this tool, you will input your
            startup's data, and upon completion, you will receive a full
            dashboard analyzing those metrics and helping you identify key gaps.
          </p>
        </div>
      </div>
    )
  }
}