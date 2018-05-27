import React, { Component, createElement } from 'react'
import logo from './logo.svg'
import './App.css'
import createSocket, { Sockette } from "sockette-component";

const Socket = createSocket({
  Component,
  createElement
});


class App extends Component {
  state = {
    speech: null,
    endpoint: null,
    state: null,
    socket: null
  }

  onOpen = ev => {
    console.log("> Connected!", ev);

  };

  onMessage = ev => {
    console.log("> Received:", ev.data);
  };

  onReconnect = ev => {
    console.log("> Reconnecting...", ev);
  };

  sendMessage = _ => {
    // WebSocket available in state!
    const request = { "speech": "show me some cats", "endpoint": "https://hap2a5df4m.execute-api.us-east-1.amazonaws.com/dev/ping", "state": { "directory": "home" } }
    console.log("this.state: ", this.state)
    console.log("ws: ", this.state.socket.send(JSON.stringify(request)))
  };

  render() {
    return (
      <div className="App">
        result: <strong>{this.state.result}</strong>


        <button onClick={this.sendMessage} >Test Bouncer</button>

        <Socket
          url='ws://secure-lowlands-10237.herokuapp.com/websocket/'
          // url="ws://localhost:8080/websocket/"
          getSocket={socket => {
            this.setState({socket: socket});
          }}
          maxAttempts={2}
          onopen={this.onOpen}
          onmessage={this.onMessage}
          onreconnect={this.onReconnect}
        />

      </div>
    );
  }
}

export default App
