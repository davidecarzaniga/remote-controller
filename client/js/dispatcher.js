var _ = require('underscore');
var Backbone = require('backbone');

var dispatcher = _.clone(Backbone.Events);
module.exports = dispatcher;