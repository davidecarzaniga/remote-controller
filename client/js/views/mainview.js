var React = require('react');
var Dispatcher = require('../dispatcher.js');
var textPages = require('../utils/fake_textpages.js')

var MainView = React.createClass({
  getInitialState: function(){
    return{
      currentPage: 0 /** @type {Number} The active page index  */
    };
  },
  
  componentDidMount: function(){
    this.startListeners();
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
  startListeners: function(){
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
    if(page < 0){
      page = 0;
    }
    if(page >= textPages.length){
      page = textPages.length - 1;
    }

    this.setState({
      currrentPage: page
    });
  },

  render: function(){
    return (
      <div>
        <h1>VIEWING PAGE {this.state.currentPage}</h1>
        <p>{textPages[this.state.currentPage]}</p>
      </div>
    );
  }

});

module.exports = MainView;