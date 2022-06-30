import React, { Component } from 'react';


export default class InvestorView extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <Submissions />
      </div>
    )
  }
}

function Submissions() {
  const backendData = [
    { name: "Apple", score: "10", createdAt: "07-04-2022" },
    { name: "Microsoft", score: "9", createdAt: "07-02-2022" }
  ]

  const entryStyle = {
    border: "2px #0af solid",
    borderRadius: 9,

  }
}

