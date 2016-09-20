'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var Common = require('../common');
module.exports = Marionette.ItemView.extend({

    template: Templates.welcome,

    name: 'welcome',

    initialize: function () {
        console.log("initialize welcome view");
    },

    render: function(){
        console.log("render welcome view");
        var data = {};
        var options = {};
        options.data = data;
        this.$el.html(this.template(options));
        setTimeout(function(){
          console.log('currentFragment' + Backbone.history.getFragment());
          if(Backbone.history.getFragment() == 'welcome' || Backbone.history.getFragment() == ''){
            Backbone.history.navigate('#login',{trigger:true, replace:false});
          }
        }, 2000)
    }
});
