'use strict';

var $ = require('jquery');
var _ = require('underscore');
// require('../../node_modules/sidr/dist/jquery.sidr.min.js');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
Backbone.$ = $;
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var ViewHelpers = require('../helpers/handlebarHelpers');
var ViewHelpers = ViewHelpers(Handlebars)
var Common = require('../common');
var Self = {};
module.exports = Marionette.LayoutView.extend({

  template: Templates['reports'],

  initialize: function (options) {
      console.log("initialize reports view", options);
      Self = this;
      Self.steward = options.steward;
      Self.currencies = options.currencies;
      Self.listenTo(Self.collection, 'sync reset', Self.render);
  },

  render: function(){
      console.log("render reports view");
      var data = {};
      data.giftBalance = 0;
      data.giftVolume = 0;
      data.giftJournals = Self.collection.where({currency: 'giftcard'});
      for(var i = 0; i < data.giftJournals.length; i++){
        data.giftJournals[i] = data.giftJournals[i].toJSON();
        if(data.giftJournals[i].load){
          data.giftBalance += data.giftJournals[i].amount;
        } else {
          data.giftBalance -= data.giftJournals[i].amount;
        }
        data.giftVolume += data.giftJournals[i].amount;
      }
      data.promoBalance = 0;
      data.promoVolume = 0;
      data.promoJournals = Self.collection.where({currency: 'promo'});
      for(var i = 0; i < data.promoJournals.length; i++){
        data.promoJournals[i] = data.promoJournals[i].toJSON();
        if(data.promoJournals[i].load){
          data.promoBalance += data.promoJournals[i].amount;
        } else {
          data.promoBalance -= data.promoJournals[i].amount;
        }
        data.promoVolume += data.promoJournals[i].amount;
      }
      data.pointsBalance = 0;
      data.pointsVolume = 0;
      data.pointsJournals = Self.collection.where({currency: 'points'});
      for(var i = 0; i < data.pointsJournals.length; i++){
        data.pointsJournals[i] = data.pointsJournals[i].toJSON();
        if(data.pointsJournals[i].load){
          data.pointsBalance += data.pointsJournals[i].amount;
        } else {
          data.pointsBalance -= data.pointsJournals[i].amount;
        }
        data.pointsVolume += data.pointsJournals[i].amount;
      }
      data.tabBalance = 0;
      data.tabVolume = 0;
      data.tabJournals = Self.collection.where({currency: 'tab'});
      for(var i = 0; i < data.tabJournals.length; i++){
        data.tabJournals[i] = data.tabJournals[i].toJSON();
        if(data.tabJournals[i].load){
          data.tabBalance += data.tabJournals[i].amount;
        } else {
          data.tabBalance -= data.tabJournals[i].amount;
        }
        data.tabVolume += data.tabJournals[i].amount;
      }
      data.stampBalance = 0;
      data.stampVolume = 0;
      data.stampJournals = Self.collection.where({currency: 'stamp'});
      for(var i = 0; i < data.stampJournals.length; i++){
        data.stampJournals[i] = data.stampJournals[i].toJSON();
        if(data.stampJournals[i].load){
          data.stampBalance += data.stampJournals[i].amount;
        } else {
          data.stampBalance -= data.stampJournals[i].amount;
        }
        data.stampVolume += data.stampJournals[i].amount;
      }

      _.extend(data, ViewHelpers);
      Self.$el.html(Self.template(data));

      Self.$('#gift').off('click').on('click', function(event){
        event.preventDefault();
        router.navigate('stewards/' + Self.steward.get('stewardname') + '/reports/giftcard', true);
      });
      Self.$('#promo').off('click').on('click', function(event){
        event.preventDefault();
        router.navigate('stewards/' + Self.steward.get('stewardname') + '/reports/promo', true);
      });
      Self.$('#points').off('click').on('click', function(event){
        event.preventDefault();
        router.navigate('stewards/' + Self.steward.get('stewardname') + '/reports/points', true);
      });
      Self.$('#tab').off('click').on('click', function(event){
        event.preventDefault();
        router.navigate('stewards/' + Self.steward.get('stewardname') + '/reports/tab', true);
      });
      Self.$('#stamp').off('click').on('click', function(event){
        event.preventDefault();
        router.navigate('stewards/' + Self.steward.get('stewardname') + '/reports/stamp', true);
      });
    }

});
