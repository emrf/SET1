
//Data is list of jsons. Each element in list is for different chart.
//Each json has the following format:
//name of chart, type of chart ('radar'). 
//Data:
//  labels for each point, 
//   datasets (list, one element for each dataset, each should be different color):
//    label for dataset
//    data: datapoints, align with corresponding label
//    collor options
// options: more options
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
        label: 'Mean Investor Threshold',
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
        '% Cash available',
        'Profit (as % of assets)'
      ],
      datasets: [{
        label: 'Your Company',
        data: [0, 0, 0, 0],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Mean Investor Threshold',
        data: [25, 25, 10, 12],
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
  },
  {
    name: 'result_data', //keep last
    type: 'radar',
    data: {
      labels: [
        'Topic 1',
        'Topic 2',
        'Topic 3',
        'Topic 4',
      ],
      datasets: [{
        label: 'Your Company',
        data: [10, 29, 39, 32],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      },
      {
        label: 'Mean Investor Threshold',
        data: [0, 0, 50, 32],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
    }
  }
];