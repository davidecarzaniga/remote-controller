var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');

var MainApp = require('./mainview.js');

ReactDOM.render(
  <MainApp />,
  document.getElementById('example')
);