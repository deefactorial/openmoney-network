'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var Self;
//var Page = require('../models/page');

module.exports = Marionette.LayoutView.extend({
  template: Templates.layout,
  regions: {
    navigation: "#navigation",
    dashhead: "#dashhead",
    pageContainer: "#pageContainer",
  }
});
