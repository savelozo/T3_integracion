import './App.css';
import React from "react";
import io from "socket.io-client";

//import { Button } from 'react-bootstrap/Button';
import { Container, Row, Col, Button, Navbar, Nav } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props){
    super(props);

    const socket = io('wss://​le-18262636.bitzonte.com',{
      autoConnect: false,
      path: '/stocks',
    });

    this.state = {isConnected: false}
    this.socket = socket
    // Este enlace es necesario para hacer que `this` funcione en el callback
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
    this.handleSell = this.handleSell.bind(this);
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleUpdate(data) {
    console.log('UPDATE');
    console.log(data);
  }

  handleBuy(data) {
    console.log('BUY');
    console.log(data);
  }

  handleSell(data) {
    console.log('SELL');
    console.log(data);
  }

  handleConnect() {
    this.setState(state => ({
      isConnected: !state.isConnected
    }))
    if (this.state.isConnected){
      console.log('DESCONECTADO');
      this.socket.disconnect();
    }
    else {
      console.log('CONECTADO');
      this.socket.connect();
      this.socket.on('UPDATE', this.handleUpdate);
      this.socket.on('BUY', this.handleBuy);
      this.socket.on('SELL', this.handleSell);
    };
  }

  render(){
    return (
      <div>

        <Navbar bg="dark" variant="dark" sticky='top'>
          <Nav.Item className="ml-auto">
            <Button variant="dark" onClick={this.handleConnect}>
                {this.state.isConnected ? 'Desconectar' : 'Conectar'}
            </Button>
          </Nav.Item>
        </Navbar>

        <Container fluid>

        </Container>

      </div>);
  };

}

export default Home;
