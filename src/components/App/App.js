//import React from 'react';
//import logo from '../../logo.svg';
import './App.css';
import React from "react";
import io from "socket.io-client";

//import { Button } from 'react-bootstrap/Button';
import { Container, Row, Col, Button } from 'react-bootstrap';

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
    //console.log(data);
  }

  handleBuy(data) {
    console.log('BUY');
    //console.log(data);
  }

  handleSell(data) {
    console.log('SELL');
    //console.log(data);
  }

  handleConnect() {
    this.setState(state => ({
      isConnected: !state.isConnected
    }))
    if (this.state.isConnected){
      console.log('DESCONECTADO');
      this.socket.disconnect()
    }
    else {
      console.log('CONECTADO');
      this.socket.connect()
      this.socket.on('UPDATE', this.handleUpdate);
      this.socket.on('BUY', this.handleBuy);
      this.socket.on('SELL', this.handleSell);
    };
  }

  render(){
    return (
      <div>
        <Button variant="primary" onClick={this.handleConnect}>
            {this.state.isConnected ? 'Desconectar' : 'Conectar'}
        </Button>
      </div>);
  };

}

// function App() {
//
//   const socket = io('wss://​le-18262636.bitzonte.com',{
//     path: '/stocks',
//   });
//
//   // socket.on('connect', () => {
//   //   console.log("Conectado");
//   //   console.log(socket.connected);
//   // });
//
//   //Listener
//   socket.on('UPDATE', function(data){
//      try {
//         console.log(data);
//      } catch(e) {
//        console.log(e);
//      }
//   });
//
//   return (
//     <p>Conectado: {socket.id}</p>
//   );
// }

export default Home;
