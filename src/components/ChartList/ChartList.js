import React from 'react';
import './ChartList.css';
import { Container, CardDeck } from 'react-bootstrap';
import { LineChart, CardChart } from '../Chart/Chart'
import io from "socket.io-client";

class ChartList extends React.Component {

  constructor(props){
    super(props);

    const socket = io('wss://​le-18262636.bitzonte.com',{
      autoConnect: false,
      path: '/stocks',
    });

    this.state = {'Charts':[], 'isConnected': props.isConnected, 'data_ready': false}
    this.socket = socket
    this.socket.connect()
    this.handleStocks = this.handleStocks.bind(this)
    this.socket.on(props.type, this.handleStocks);
    this.socket.emit(props.type);
  }

  handleStocks(data) {
    this.setState({
      'Charts': data,
      'data_ready': true
    })
  }

  componentDidUpdate(oldProps) {

    const newProps = this.props

    if(!newProps.isConnected) {
      this.socket.disconnect()
    }

  }

  render(){
    if (this.props.type === 'STOCKS') {

      return (
            <div>
              <div style={{ padding:'2%' }}>
                {this.props.isConnected &&
                      <h1>Mercados de Acciones</h1>}
              </div>
              <Container fluid>
                <ul>
                  {this.state.Charts.map((stock) =>
                                                <LineChart key={stock.ticker}
                                                name={stock.ticker}
                                                isConnected={this.props.isConnected} />)}
                </ul>
              </Container>
            </div>);

    }

    else {
      return (
            <div>
              <div style={{ padding:'2%' }}>
                {this.props.isConnected &&
                      <h1>Mercados Abiertos</h1>}
              </div>
              <Container fluid>
                <ul>
                  <CardDeck hidden={!this.props.isConnected}>
                    {this.state.data_ready &&
                      Object.keys(this.state.Charts).map((key, index) =>
                                                    <CardChart key={this.state.Charts[key].name}
                                                    name={this.state.Charts[key].name}
                                                    ticker={this.state.Charts[key].exchange_ticker}
                                                    country={this.state.Charts[key].country}
                                                    companies={this.state.Charts[key].listed_companies}
                                                    isConnected={this.props.isConnected} />)}
                  </CardDeck>
                </ul>
              </Container>
            </div>);
    }

  };

}

export default ChartList;
