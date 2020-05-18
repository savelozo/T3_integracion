import React from 'react';
import './ChartList.css';
import { Container } from 'react-bootstrap';
import LineChart from '../Chart/Chart'
import io from "socket.io-client";

class ChartList extends React.Component {

  constructor(props){
    super(props);

    const socket = io('wss://​le-18262636.bitzonte.com',{
      autoConnect: false,
      path: '/stocks',
    });

    this.state = {'stockCharts':[], 'isConnected': props.isConnected}
    this.socket = socket
    this.socket.connect()
    this.handleStocks = this.handleStocks.bind(this)
    this.socket.on('STOCKS', this.handleStocks);
    this.socket.emit('STOCKS');
  }

  handleStocks(data) {
    this.setState({
      'stockCharts': data
    })
  }

  componentDidUpdate(oldProps) {

    const newProps = this.props

    if(!newProps.isConnected) {
      this.socket.disconnect()
    }

  }

  render(){

    return (
          <div>
            <Container fluid>
              <ul>
                {this.state.stockCharts.map((stock) =>
                                              <LineChart key={stock.ticker}
                                              name={stock.ticker}
                                              isConnected={this.props.isConnected} />)}
              </ul>
            </Container>
          </div>);

  };

}

export default ChartList;
