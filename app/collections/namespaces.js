'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Namespace = require('../models/namespace');
var Self;

module.exports = Backbone.Collection.extend({
      model: Namespace,
      url: function() {
        return '/V2/stewards/' + this.steward.get('stewardname') + '/namespaces';
      },
      initialize: function(models, options) {
        Self = this;
        if(typeof options != 'undefined' && typeof options.steward != 'undefined'){
          this.steward = options.steward;
        }
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
      }
});
