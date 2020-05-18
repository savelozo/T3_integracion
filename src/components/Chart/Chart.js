import React from 'react';
import './Chart.css';
//import { Container } from 'react-bootstrap';
import Chart from "chart.js";
import io from "socket.io-client";

const state = {
  labels: [0, 1, 2, 3, 4],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    const socket = io('wss://​le-18262636.bitzonte.com',{
      autoConnect: false,
      path: '/stocks',
    });

    this.state = {isConnected: props.isConnected}
    this.socket = socket
    this.handleUpdate = this.handleUpdate.bind(this);
    this.socket.on('UPDATE', this.handleUpdate);
    this.chartRef = React.createRef();
  }

  handleUpdate(data) {
    if (this.props.isConnected && this.props.name === data.ticker){
      console.log(data)
      //this.myChart.data.labels = this.props.data.map(d => d.time);
      //this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      //this.myChart.update();
    }
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props

    if(newProps.isConnected) {
      this.socket.connect()
    }
    else {
      this.socket.disconnect()
    }
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'week'
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                min: 0
              }
            }
          ]
        }
      },
      data: {
        labels: [1,2,3,4,5],
        datasets: [{
          label: this.props.name,
          data: [100,200,500,400,120],
          fill: 'none',
          backgroundColor: 'blue',
          pointRadius: 2,
          borderColor: 'blue',
          borderWidth: 1,
          lineTension: 0
        }]
      }
    });
  }

    render(){
      return (
        <div>
          <canvas ref={this.chartRef} width="400" height="400" hidden={!this.props.isConnected}/>
        </div>);
    };
}

// class LineGraph extends React.Component {
//
//   constructor(props){
//     super(props);
//
//     const socket = io('wss://​le-18262636.bitzonte.com',{
//       autoConnect: false,
//       path: '/stocks',
//     });
//
//     this.state = {isConnected: props.isConnected}
//     this.socket = socket
//     this.handleUpdate = this.handleUpdate.bind(this);
//     this.socket.on('UPDATE', this.handleUpdate);
//     this.chartRef = React.createRef();
//   }
//
//
//   handleUpdate(data) {
//     if (this.props.isConnected){
//       // console.log(this.LineChart)
//       // this.LineChart.props.data.datasets[0].data[2] = 50;
//       // this.LineChart.redraw(true);
//     }
//   }
//
//   componentDidUpdate(oldProps) {
//     const newProps = this.props
//
//     if(newProps.isConnected) {
//       this.socket.connect()
//     }
//     else {
//       this.socket.disconnect()
//     }
//   }
//
//   componentDidMount() {
//     this.Chart = new Chart(this.chartRef.current, {
//       type: 'line'
//     });
//   }
//
//   render(){
//     return (
//       <div>
//         {this.props.isConnected &&
//           <canvas ref={this.chartRef} width="400" height="400"/>
//         }
//       </div>);
//   };
//
// }

export default LineChart;
