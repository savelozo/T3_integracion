import './App.css';
import React from "react";

import { Container, Button, Navbar, Nav } from 'react-bootstrap';
import ChartList from '../ChartList/ChartList'

class Home extends React.Component {

  constructor(props){
    super(props);

    this.state = {isConnected: false}
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
          <ChartList isConnected={this.state.isConnected} type='STOCKS'/>
        </Container>

        <Container fluid>
          <ChartList isConnected={this.state.isConnected} type='EXCHANGES' />
        </Container>

      </div>);
  };

}

export default Home;
