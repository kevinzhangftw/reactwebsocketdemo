import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

//websocket
import Websocket from 'react-websocket'


class App extends Component {
  state = {
    speech: null,
    endpoint: null,
    state: null
  }

  handleData(data) {
    let result = JSON.parse(data);
    this.setState({ speech: result.speech, endpoint: result.endpoint, state: result.state })
  }

  onSocketOpen(data) {
    console.log('Voice OS Socket Connected!!!')
  }

  render() {
    return (
      <div className="App">
        speech: <strong>{this.state.speech}</strong>
        endpoint: <strong>{this.state.endpoint}</strong>
        state: <strong>{this.state.state}</strong>

        <Websocket url='ws://secure-lowlands-10237.herokuapp.com/websocket/'
          onOpen={this.onSocketOpen.bind(this)}
          onMessage={this.handleData.bind(this)} />
      </div>
    );
  }
}

export default App
