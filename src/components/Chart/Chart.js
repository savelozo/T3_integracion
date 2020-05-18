import React from 'react';
import './Chart.css';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import Chart from "chart.js";
import io from "socket.io-client";


class LineChart extends React.Component {
  constructor(props) {
    super(props);

    const socket = io('wss://​le-18262636.bitzonte.com',{
      autoConnect: false,
      path: '/stocks',
    });

    this.state = {isConnected: props.isConnected, min: 0, vol: 0, last: null, max: null, var: null}
    this.socket = socket
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleMovements = this.handleMovements.bind(this);
    this.socket.on('BUY', this.handleMovements);
    this.socket.on('SELL', this.handleMovements);
    this.socket.on('UPDATE', this.handleUpdate);
    this.chartRef = React.createRef();
  }

  handleMovements(data) {
    if (this.props.isConnected && this.props.name === data.ticker){
      this.setState(state => ({
        vol: state.vol + data.volume,
      }))
    }
  }

  handleUpdate(data) {
    if (this.props.isConnected && this.props.name === data.ticker){

      this.LineChart.data.labels.push(new Date(data.time));
      this.LineChart.data.datasets[0].data.push(data.value)
      this.setState({
        last: data.value
      })

      if (data.value < this.state.min || this.state.min === 0){
        this.setState({
          min: data.value,
          var: this.state.last / data.value
        })
        this.LineChart.options.scales.yAxes[0].ticks.min = data.value - 5
      }

      if (data.value > this.state.max){
        this.setState({
          max: data.value
        })
      }

      this.LineChart.update();
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
    this.LineChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'minute'
              },
            }
          ],
          yAxes: [
            {
              ticks: {
                min: this.state.min
              },
              gridLines: {
                display: false,
                drawBorder: true
            }
            }
          ]
        }
      },
      data: {
        labels: [],
        datasets: [{
          data: [],
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
        <br></br>
        <Container fluid style={{ padding:'2%'}}>
            <Row style={{ alignItems:'center' }}>
              <Col sm={8} style={{ alignItems:'center' }}>
                {this.props.isConnected &&
                  <h1>{this.props.name}</h1>
                }

                <canvas ref={this.chartRef} hidden={!this.props.isConnected}/>
              </Col>
              <Col sm={4} style={{ alignItems:'center' }}>

                <ListGroup horizontal style={{ width: '10rem', padding:'2%'}} hidden={!this.props.isConnected}>
                  <ListGroup.Item action variant="dark" style={{ width: '150px'}}><b>Precio Máximo</b></ListGroup.Item>
                  <ListGroup.Item style={{ width: '100px'}}>{this.state.max}</ListGroup.Item>
                </ListGroup>


                <ListGroup horizontal style={{ width: '10rem', padding:'2%' }} hidden={!this.props.isConnected}>
                  <ListGroup.Item action variant="dark" style={{ width: '150px'}}><b>Precio Mínimo</b></ListGroup.Item>
                  <ListGroup.Item style={{ width: '100px'}}>{this.state.min}</ListGroup.Item>
                </ListGroup>


               <ListGroup horizontal style={{ width: '10rem', padding:'2%' }} hidden={!this.props.isConnected}>
                  <ListGroup.Item action variant="dark" style={{ width: '150px'}}><b>Último Precio</b></ListGroup.Item>
                  <ListGroup.Item style={{ width: '100px'}}>{this.state.last}</ListGroup.Item>
                </ListGroup>


               <ListGroup horizontal style={{ width: '10rem', padding:'2%' }} hidden={!this.props.isConnected}>
                  <ListGroup.Item action variant="dark" style={{ width: '150px'}}><b>Volumen Transado</b></ListGroup.Item>
                  <ListGroup.Item style={{ width: '100px'}}>{this.state.vol}</ListGroup.Item>
                </ListGroup>

                <ListGroup horizontal style={{ width: '10rem', padding:'2%' }} hidden={!this.props.isConnected}>
                   <ListGroup.Item action variant="dark" style={{ width: '150px'}}><b>Variación Porcentual</b></ListGroup.Item>
                   <ListGroup.Item style={{ width: '100px'}}>{this.state.var}%</ListGroup.Item>
                 </ListGroup>

              </Col>
            </Row>
          </Container>
      </div>

      )
    };
}

export default LineChart;
