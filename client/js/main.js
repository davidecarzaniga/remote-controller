var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Backbone = require('backbone');

var Dispatcher = require('./dispatcher.js');
var MainApp = require('./mainview.js');


Dispatcher.on("test", function(){
  console.info("TEST 111");
});

window.setTimeout(function(){
  Dispatcher.trigger("test");
});

ReactDOM.render(
  <MainApp />,
  document.getElementById('example')
);