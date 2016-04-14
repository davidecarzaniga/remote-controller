var _ = require('underscore');
var Backbone = require('backbone');

var DefaultController = require('./controllers/defaultController.js');
var RemoteController = require('./controllers/remoteController.js');

var Router = Backbone.Router.extend({
  routes: {
    "remote": "remoteController",
    "*path": "defaultController"
  },
  remoteController: function(){
    RemoteController.init();
  },
  defaultController: function(){
    DefaultController.init()
  }
});

/** init backbone router */
var initialize = function(){
  var router = new Router();
  Backbone.history.start();
}

module.exports = {
  initialize: initialize
}