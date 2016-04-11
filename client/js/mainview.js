var React = require('react');
var Dispatcher = require('./dispatcher.js');

Dispatcher.on("test", function(){
  console.info("TEST 222");
});

module.exports = React.createClass({
  render: function(){
    return <h1>CIAONEEEE</h1>;
  }
});