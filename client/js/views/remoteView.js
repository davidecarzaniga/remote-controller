var React = require('react');
var SockJS = require('sockjs-client');
var _ = require('underscore');

var RemoteView = React.createClass({
  getInitialState: function(){
    return {
      status: "waiting" /** @type {String} The connection status: waiting|connected|closed */
    };
  },
  getDefaultProps: function(){
    return {
      token: null
    };
  },
  sock: null,
  componentDidMount: function(){
    var sock = new SockJS('http://127.0.0.1:9999/echo');
    var token = this.props.token;
    
    sock.onopen = function() {
      this.setState({
        status: "connected"
      });
    }.bind(this);

    this.sock = sock;
  },

  /**
   * Sends a command to the socket
   * @param  {String} command The string representing the issued command 
   */
  sendCommand: function(command){
    var sock = this.sock;
    if(_.isNull(sock) === false){
      var message = {
        action: "remoteCommand",
        command: command,
        token: this.props.token
      }
      sock.send(JSON.stringify(message));
    }
  },

  /**
   * Check if the sock connection is active
   * @return {Boolean}
   */
  sockIsConnected: function(){
    return this.state.status === "connected";
  },

  render: function(){
    var content = null;
    var token = this.props.token;
    console.info("current token", token);
    if(_.isNull(token)){
      content = <h1>Please, use a valid token</h1>;
    }else{
      if(this.sockIsConnected()){
        content = (
          <div>
            <h1>REMOTE PAGE</h1>
            <p><button onClick={this.sendCommand.bind(this, 'first')}>First</button></p>
            <p><button onClick={this.sendCommand.bind(this, 'prev')}>Prev</button></p>
            <p><button onClick={this.sendCommand.bind(this, 'next')}>Next</button></p>
            <p><button onClick={this.sendCommand.bind(this, 'last')}>Last</button></p>
          </div>
        );
      }else{
        content = <h1>No socket connection</h1>;
      }
      
    }

    return content;
  }

});

module.exports = RemoteView;