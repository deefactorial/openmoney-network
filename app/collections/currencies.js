'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Currency = require('../models/currency');
var Self;

module.exports = Backbone.Collection.extend({
  model: Currency,
  url: function() {
    return '/V2/stewards/' + Self.steward.get('stewardname') + '/currencies';
  },
  initialize: function(models, options) {
    Self = this;
    if(typeof options != 'undefined' && typeof options.steward != 'undefined'){
      Self.steward = options.steward;
    }
  },
  getByNamespace: function(namespace){
    return Self.models.filter(function(model) {
      return (
         model.get('currency_namespace') == namespace || (model.get('currency_namespace') == '' && model.get('currency') == namespace)
      )
    });
  },
  getBySteward: function(stewardname){
    //console.log('in getBySteward:', stewardname);
    return Self.models.filter(function(model) {
      var result = false;
      model.get('stewards').forEach(function(steward){
        if(typeof steward == "string"){
          //console.log('is steward equal', steward, 'stewards~'+ stewardname)
          result = result || steward == 'stewards~' + stewardname;
        } else {
          //console.log('is steward equal', steward.stewardname,  stewardname)
          result = result || steward.stewardname == stewardname;
        }
      })
      return result;
    });
  }
});
