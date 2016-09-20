'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Breadcrumb = require('../models/breadcrumb');
var Self;

module.exports = Backbone.Collection.extend({
  model: Breadcrumb,
  initialize: function(models, options) {
    Self = this;
  }
});
