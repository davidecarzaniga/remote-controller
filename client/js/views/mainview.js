var React = require('react');
var Dispatcher = require('../dispatcher.js');
var SockJS = require('sockjs-client');
var Setup = require('../setup.js');

var textPages = require('../utils/fake_textpages.js');

var fakeCode = Date.now().toString();

var MainView = React.createClass({
  getInitialState: function(){
    return{
      currentPage: 0 /** @type {Number} The active page index  */
    };
  },
  
  componentDidMount: function(){
    this.startListeners();

    var sock = new SockJS(Setup.realtimeUrl);
    var code = this.getClientCode();

    sock.onopen = function() {
      var message = {
        action: 'clientStart',
        token: code
      };
      sock.send(JSON.stringify(message));

      sock.onmessage = function(message) {
        var command = message.data;
        console.info("incoming command", command);
        Dispatcher.trigger(command);
      }
    }.bind(this);

  },
  
  componentWillUnmount: function(){
    this.stopListeners() //destroy listeners before unmounting
  },
  
  /**
   * Start listening to dispatcher events
   */
  startListeners: function(){
    Dispatcher.on("next", this.next);
    Dispatcher.on("prev", this.prev);
    Dispatcher.on("first", this.first);
    Dispatcher.on("last", this.last);
  },

  /**
   * Start listening to dispatcher events
   */
  stopListeners: function(){
    Dispatcher.off("next", this.next);
    Dispatcher.off("prev", this.prev);
    Dispatcher.off("first", this.first);
    Dispatcher.off("last", this.last);
  },

  /** View next page */
  next: function(){
    this.goToPage(this.state.currentPage + 1);
  },

  /** View prev page */
  prev: function(){
    this.goToPage(this.state.currentPage - 1);
  },

  /** View first page */
  first: function(){
    this.goToPage(0);
  },

  /** View last page */
  last: function(){
    this.goToPage(textPages.length - 1);
  },

  /**
   * Navigate to selected page
   * @param  {Number} page The page index to activate
   */
  goToPage: function(page){
    console.info("trying to get page", page);
    if(page < 0){
      page = 0;
    }
    if(page >= textPages.length){
      page = textPages.length - 1;
    }

    this.setState({
      currentPage: page
    });
  },

  /**
   * Gives the client code to use in the Remote page.
   * In theory this should be handled by the server, this is just a placeholder.
   * @return {String} The code
   */
  getClientCode: function(){
    return fakeCode;
  },

  render: function(){
    return (
      <div>
        <h1>VIEWING PAGE {1 + this.state.currentPage} / {textPages.length}</h1>
        <p>{textPages[this.state.currentPage]}</p>
        <h3>CODE: {this.getClientCode()}</h3>
      </div>
    );
  }

});

module.exports = MainView;