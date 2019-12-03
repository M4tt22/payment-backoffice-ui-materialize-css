import { Chart, Line } from 'react-chartjs-2';
import React, { Component } from 'react';

import './Graph.css'

export default class Graph extends Component {
  componentWillMount() {
    Chart.scaleService.updateScaleDefaults('linear', {
      ticks: {
        min: 0,
        //max: 25000,
      },
    });
  }

  getData = canvas => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 380);
    gradient.addColorStop(0, '#61e4fc');
    //    gradient.addColorStop(1, '#efefef');
    gradient.addColorStop(1, '#ffffff');

    return {
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [
        {
          label: 'Total overs time',
          fill: true,
          lineTension: 0.3,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [12000, 8000, 17000, 12000, 17000, 10000],
          backgroundColor: gradient,
          borderColor: '#61e4fc',
        },
      ],
    };
  };

  tooltipCallbackLabel = (tooltipItem, data) => {
    const label = `€ ${Math.round(tooltipItem.yLabel * 100) / 100}`;
    return label;
  };

  tooltipCallbackTitle = (tooltipItem, data) => '';

  yAxisCallbackLabel = (tooltipItem, data) => {
    console.log(tooltipItem);
    const label = `€ ${Math.round(tooltipItem.yLabel * 100) / 100}`;
    return label;
  };

  render = () => {
    const canvas = document.createElement('canvas');
    const chartData = this.getData(canvas);

    return (
      <div className='graph' /*style={{ width: '99%' }}*/>
        <h2 style={{ textAlign: 'left' }}>Total Sales</h2>
        <h3 style={{ textAlign: 'left', color: '#61e4fc' }}>€ 43 098,00</h3>
        <Line
          data={chartData}

          height={400}
          options={{
            maintainAspectRatio: false,
            tooltips: {
              enabled: true,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              position: 'nearest',
              intersect: false,
              bodyFontSize: 15,
              callbacks: {
                label: this.tooltipCallbackLabel,
                title: this.tooltipCallbackTitle,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      callback: {
                        afterBuildTicks: this.yAxisCallbackLabel,
                      },
                    },
                  },
                ],
              },
            },
          }}
        />
      </div>
    );
  };
}
