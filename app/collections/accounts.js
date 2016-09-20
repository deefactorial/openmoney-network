'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Account = require('../models/account');
var Self;

module.exports = Backbone.Collection.extend({
  model: Account,
  url: function() {
    return '/V2/stewards/' + Self.steward.get('stewardname') + "/accounts";
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
         model.get('account_namespace') == namespace ||
         model.get('currency_namespace') == namespace
      )
    });
  },
  getByCurrency: function(currency, currency_namespace){
    return Self.models.filter(function(model) {
      return (
         model.get('currency') == currency &&
         model.get('currency_namespace') == currency_namespace
      )
    });
  },
  getBySteward: function(stewardname){
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
  },
  comparator: 'id'
});
