var React = require('react');
var ReactDOM = require('react-dom');

var RemoteView = require('../views/remoteView.js');

var RemoteController = {
  init: function(token){
    ReactDOM.render(<RemoteView token={token} />, document.getElementById('main'));
  }
};

module.exports = RemoteController;