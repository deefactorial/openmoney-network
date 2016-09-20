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
var BreadcrumbView = require('../views/breadcrumb');
var Self;

module.exports = Marionette.CollectionView.extend({
  tagName: 'ol',
  className: 'breadcrumb',
  childView: BreadcrumbView,
  initialize: function(options){
    console.log('initialize breadcrumbs collection', options)
    Self = this;
    Self.render();
  },
  // render: function(){
  //   console.log('render breadcrumbs view');
  // }
});
