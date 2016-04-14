var React = require('react');
var SockJS = require('sockjs-client');

var sock = new SockJS('http://127.0.0.1:9999/echo');

var RemoteView = React.createClass({
  first: function(){
    sock.send('first');
  },
  last: function(){
    sock.send('last');
  },
  prev: function(){
    sock.send('prev');
  },
  next: function(){
    sock.send('next');
  },
  render: function(){
    return (
      <div>
        <h1>REMOTE PAGE</h1>
        <p><button onClick={this.first}>First</button></p>
        <p><button onClick={this.prev}>Prev</button></p>
        <p><button onClick={this.next}>Next</button></p>
        <p><button onClick={this.last}>Last</button></p>
      </div>
    );
  }

});

module.exports = RemoteView;