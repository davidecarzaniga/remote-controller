var React = require('react');
var ReactDOM = require('react-dom');

var RemoteView = require('../views/remoteView.js');

var RemoteController = {
  init: function(){
    ReactDOM.render(<RemoteView />, document.getElementById('main'));
  }
};

module.exports = RemoteController;