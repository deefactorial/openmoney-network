'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var Self;
var Page = require('../models/page');
module.exports = Marionette.LayoutView.extend({
  regions:{
    breadcrumbs: '#breadcrumbs'
  },
  modelEvents: {
    'change:currentPage': 'render',
    'change:title': 'render',
    'change:breadcrumbs': 'render'
  },
  template: Templates.dashhead,
  initialize: function(options){
    console.log('initialize dashhead view', options)
    Self = this;
    if(typeof options.steward != 'undefined'){
      Self.steward = options.steward;
    }
  },
  render: function(options){
    console.log('render dashhead view', options)
    Self.$el.html(Self.template({steward: Self.steward.toJSON(), page: Self.model.get('currentPage'), title: Self.model.get('title')}));
    switch(Self.model.get('currentPage')){
      case '':
      case 'welcome':
      case 'login':
      case 'register':
      case 'forgot':
      case 'reset':
        Self.$('.dashhead').hide();
        Self.$('.breadcrumbs').hide();
        break;
      default:
        Self.$('.dashhead').show();
        Self.$('.breadcrumbs').show();
    }

    Self.$('#logout-button').off('click').on('click', function(event){
      event.preventDefault();
      console.log('logout event triggered');
      router.navigate('logout');
    });
  }
});
