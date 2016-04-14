var React = require('react');
var ReactDOM = require('react-dom');

var MainView = require('../views/mainView.js');

var DefaultController = {
  init: function(){
    ReactDOM.render(<MainView />, document.getElementById('main'));
  }
};

module.exports = DefaultController;