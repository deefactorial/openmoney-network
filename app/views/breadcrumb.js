'use strict';

var jQuery = require('jquery');
var $ = jQuery;
var _ = require('underscore');
require('datatables');
require('toolkit');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var ViewHelpers = require('../helpers/handlebarHelpers');
var ViewHelpers = ViewHelpers(Handlebars)
var Common = require('../common');
var Breadcrumb = require('../models/breadcrumb');
var Self;

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: Templates['breadcrumb'],
  initialize: function (options) {
    console.log("initialize breadcrumb view", options);
    Self = this;
    //Self.render();
  },
  render: function(){
    console.log('render breadcrumb view', Self.model)
    Self.$el.html(Self.template(Self.model.toJSON()));
    if(Self.model.get('active')){
      Self.$el.addClass('active');
      //console.log('add active class');
    }
  }
});
