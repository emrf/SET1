export const Data = [
  {
    name: 'data1',
    type: 'radar',
    data: {
      labels: [
        'Executive Experience',
        'Product Development',
        'Marketing',
        'Stakeholder Diversity',
        'Competitors',
        'Technological Edge',
        'Target Market'
      ],
      datasets: [{
        label: 'Your Company',
        data: [65, 59, 90, 81, 56, 55, 40],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }, {
        label: 'Median Company in your Industry',
        data: [28, 48, 40, 19, 96, 27, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    },
    options: {
      animation: {
        duration: 1000
      },
      // responsive: false
    }
  },
  {
    name: 'data2',
    type: 'radar',
    data: {
      labels: [
        'Growth Rate',
        'Burn Rate',
        'Cash Available',
        'Profitability'
      ],
      datasets: [{
        label: 'Your Company',
        data: [65, 34, 0, 98],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Threshold',
        data: [100, 100, 100, 100],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    },
    options: {
      // responsive: false,
      animation: {
        duration: 1000
      }
    }
  }
];