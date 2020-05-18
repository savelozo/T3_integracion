import './App.css';
import React from "react";
import io from "socket.io-client";

import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import ChartList from '../ChartList/ChartList'

class Home extends React.Component {

  constructor(props){
    super(props);

    const socket = io('wss://​le-18262636.bitzonte.com',{
      autoConnect: false,
      path: '/stocks',
    });

    this.state = {isConnected: false}
    this.socket = socket
    this.handleConnect = this.handleConnect.bind(this);
  }

  handleConnect() {

    this.setState(state => ({
      isConnected: !state.isConnected
    }))

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
          <ChartList isConnected={this.state.isConnected} />
        </Container>        

      </div>);
  };

}

export default Home;
