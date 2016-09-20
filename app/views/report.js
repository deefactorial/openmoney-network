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

  template: Templates['report'],

  initialize: function (options) {
      console.log("initialize report view", options);
      Self = this;
      Self.steward = options.steward;
      Self.currency = options.currency;
      Self.listenTo(Self.collection, 'sync reset', Self.render);
  },

  render: function(){
      console.log("render report view");
      var data = {};
      data.currency = Self.currency;
      if(Self.currency == 'giftcard'){
        data.giftBalance = 0;
        data.giftVolume = 0;
        data.giftJournals = [];
        if(typeof Self.startDate != 'undefined' && typeof Self.endDate == 'undefined'){
          data.giftJournals = Self.collection.getCurrencyByStartDate('giftcard', new Date(Self.startDate + ' 00:00:00'));
        } else if(typeof Self.startDate == 'undefined' && typeof Self.endDate != 'undefined'){
          data.giftJournals = Self.collection.getCurrencyByEndDate('giftcard', new Date(Self.endDate + ' 23:59:59'));
        } else if(typeof Self.startDate != 'undefined' && typeof Self.endDate != 'undefined'){
          data.giftJournals = Self.collection.getCurrencyByDateRange('giftcard', new Date(Self.startDate + ' 00:00:00'), new Date(Self.endDate + ' 23:59:59'));
        } else {
          data.giftJournals = Self.collection.where({currency: 'giftcard'});
        }
        for(var i = 0; i < data.giftJournals.length; i++){
          data.giftJournals[i] = data.giftJournals[i].toJSON();
          if(typeof data.giftJournals[i].namespaceID != 'undefined'){
            data.giftJournals[i].namespace = data.giftJournals[i].namespaceID.split('~')[2] + ' ' + data.giftJournals[i].namespaceID.split('~')[3];
          }
          _.extend(data.giftJournals[i], ViewHelpers);
          data.giftJournals[i].steward = Self.steward.toJSON();
          if(data.giftJournals[i].load){
            data.giftBalance += data.giftJournals[i].amount;
          } else {
            data.giftBalance -= data.giftJournals[i].amount;
          }
          data.giftVolume += data.giftJournals[i].amount;
        }
      } else if(Self.currency == 'promo'){
        data.promoBalance = 0;
        data.promoVolume = 0;
        data.promoJournals = [];
        if(typeof Self.startDate != 'undefined' && typeof Self.endDate == 'undefined'){
          data.promoJournals = Self.collection.getCurrencyByStartDate('promo', new Date(Self.startDate + ' 00:00:00'));
        } else if(typeof Self.startDate == 'undefined' && typeof Self.endDate != 'undefined'){
          data.promoJournals = Self.collection.getCurrencyByEndDate('promo', new Date(Self.endDate + ' 23:59:59'));
        } else if(typeof Self.startDate != 'undefined' && typeof Self.endDate != 'undefined'){
          data.promoJournals = Self.collection.getCurrencyByDateRange('promo', new Date(Self.startDate + ' 00:00:00'), new Date(Self.endDate + ' 23:59:59'));
        } else {
          data.promoJournals = Self.collection.where({currency: 'promo'});
        }
        for(var i = 0; i < data.promoJournals.length; i++){
          data.promoJournals[i] = data.promoJournals[i].toJSON();
          if(typeof data.promoJournals[i].namespaceID != 'undefined'){
            data.promoJournals[i].namespace = data.promoJournals[i].namespaceID.split('~')[2] + ' ' + data.promoJournals[i].namespaceID.split('~')[3];
          }
          _.extend(data.promoJournals[i], ViewHelpers);
          data.promoJournals[i].steward = Self.steward.toJSON();
          if(data.promoJournals[i].load){
            data.promoBalance += data.promoJournals[i].amount;
          } else {
            data.promoBalance -= data.promoJournals[i].amount;
          }
          data.promoVolume += data.promoJournals[i].amount;
        }
      } else if(Self.currency == 'points'){
        data.pointsBalance = 0;
        data.pointsVolume = 0;
        data.pointsJournals = [];
        if(typeof Self.startDate != 'undefined' && typeof Self.endDate == 'undefined'){
          data.pointsJournals = Self.collection.getCurrencyByStartDate('points', new Date(Self.startDate + ' 00:00:00'));
        } else if(typeof Self.startDate == 'undefined' && typeof Self.endDate != 'undefined'){
          data.pointsJournals = Self.collection.getCurrencyByEndDate('points', new Date(Self.endDate + ' 23:59:59'));
        } else if(typeof Self.startDate != 'undefined' && typeof Self.endDate != 'undefined'){
          data.pointsJournals = Self.collection.getCurrencyByDateRange('points', new Date(Self.startDate + ' 00:00:00'), new Date(Self.endDate + ' 23:59:59'));
        } else {
          data.pointsJournals = Self.collection.where({currency: 'points'});
        }
        for(var i = 0; i < data.pointsJournals.length; i++){
          data.pointsJournals[i] = data.pointsJournals[i].toJSON();
          if(typeof data.pointsJournals[i].namespaceID != 'undefined'){
            data.pointsJournals[i].namespace = data.pointsJournals[i].namespaceID.split('~')[2] + ' ' + data.pointsJournals[i].namespaceID.split('~')[3];
          }
          _.extend(data.pointsJournals[i], ViewHelpers);
          data.pointsJournals[i].steward = Self.steward.toJSON();
          if(data.pointsJournals[i].load){
            data.pointsBalance += data.pointsJournals[i].amount;
          } else {
            data.pointsBalance -= data.pointsJournals[i].amount;
          }
          data.pointsVolume += data.pointsJournals[i].amount;
        }
      } else if(Self.currency == 'tab'){
        data.tabBalance = 0;
        data.tabVolume = 0;
        data.tabJournals = [];
        if(typeof Self.startDate != 'undefined' && typeof Self.endDate == 'undefined'){
          data.tabJournals = Self.collection.getCurrencyByStartDate('tab', new Date(Self.startDate + ' 00:00:00'));
        } else if(typeof Self.startDate == 'undefined' && typeof Self.endDate != 'undefined'){
          data.tabJournals = Self.collection.getCurrencyByEndDate('tab', new Date(Self.endDate + ' 23:59:59'));
        } else if(typeof Self.startDate != 'undefined' && typeof Self.endDate != 'undefined'){
          data.tabJournals = Self.collection.getCurrencyByDateRange('tab', new Date(Self.startDate + ' 00:00:00'), new Date(Self.endDate + ' 23:59:59'));
        } else {
          data.tabJournals = Self.collection.where({currency: 'tab'});
        }
        for(var i = 0; i < data.tabJournals.length; i++){
          data.tabJournals[i] = data.tabJournals[i].toJSON();
          if(typeof data.tabJournals[i].namespaceID != 'undefined'){
            data.tabJournals[i].namespace = data.tabJournals[i].namespaceID.split('~')[2] + ' ' + data.tabJournals[i].namespaceID.split('~')[3];
          }
          _.extend(data.tabJournals[i], ViewHelpers);
          data.tabJournals[i].steward = Self.steward.toJSON();
          if(data.tabJournals[i].load){
            data.tabBalance += data.tabJournals[i].amount;
          } else {
            data.tabBalance -= data.tabJournals[i].amount;
          }
          data.tabVolume += data.tabJournals[i].amount;
        }
      } else if(Self.currency == 'stamp'){
        data.stampBalance = 0;
        data.stampVolume = 0;
        data.stampJournals = [];
        if(typeof Self.startDate != 'undefined' && typeof Self.endDate == 'undefined'){
          data.stampJournals = Self.collection.getCurrencyByStartDate('stamp', new Date(Self.startDate + ' 00:00:00'));
        } else if(typeof Self.startDate == 'undefined' && typeof Self.endDate != 'undefined'){
          data.stampJournals = Self.collection.getCurrencyByEndDate('stamp', new Date(Self.endDate + ' 23:59:59'));
        } else if(typeof Self.startDate != 'undefined' && typeof Self.endDate != 'undefined'){
          data.stampJournals = Self.collection.getCurrencyByDateRange('stamp', new Date(Self.startDate + ' 00:00:00'), new Date(Self.endDate + ' 23:59:59'));
        } else {
          data.stampJournals = Self.collection.where({currency: 'stamp'});
        }
        for(var i = 0; i < data.stampJournals.length; i++){
          data.stampJournals[i] = data.stampJournals[i].toJSON();
          if(typeof data.stampJournals[i].namespaceID != 'undefined'){
            data.stampJournals[i].namespace = data.stampJournals[i].namespaceID.split('~')[2] + ' ' + data.stampJournals[i].namespaceID.split('~')[3];
          }
          _.extend(data.stampJournals[i], ViewHelpers);
          data.stampJournals[i].steward = Self.steward.toJSON();
          if(data.stampJournals[i].load){
            data.stampBalance += data.stampJournals[i].amount;
          } else {
            data.stampBalance -= data.stampJournals[i].amount;
          }
          data.stampVolume += data.stampJournals[i].amount;
        }
      }
      data.steward = Self.steward.toJSON();

      _.extend(data, ViewHelpers);

      if(typeof Self.startDate != 'undefined'){
        data.startDate = Self.startDate;
      }
      if(typeof Self.endDate != 'undefined'){
        data.endDate = Self.endDate;
      }

      console.log('report data:', data);
      Self.$el.html(Self.template(data));

      Self.$('[data-sort=table]').DataTable();

      Self.$('input[name=startDate]').datepicker({autoclose: true});

      Self.$('input[name=startDate]').off('change').on('change',function(event){
        Self.startDate = $('input[name=startDate]').val();
        Self.render();
      });

      Self.$('input[name=startDate]').focus(function() {
        this.blur();
      });

      Self.$('input[name=endDate]').datepicker({autoclose: true});

      Self.$('input[name=endDate]').off('change').on('change',function(event){
        Self.endDate = $('input[name=endDate]').val();
        Self.render();
      });

      Self.$('input[name=endDate]').focus(function() {
        this.blur();
      });

      // var total = 0;
      // var balance = 0;
      // var pageTotal = 0;
      // Self.$('[data-sort=table]').DataTable( {
      //   "footerCallback": function ( row, data, start, end, display ) {
      //     console.log('in footerCallback', row, data, start, end, display);
      //     var api = this.api(), data;
      //
      //     // Remove the formatting to get integer data for summation
      //     var intVal = function ( i ) {
      //       return typeof i === 'string' ?
      //         i.replace(/[\$,]/g, '')*1 :
      //         typeof i === 'number' ?
      //           i : 0;
      //     };
      //
      //     // Total over all pages
      //     balance = api
      //       .column( 5 )
      //       .data()
      //       .reduce( function (a, b, index, apiInstance) {
      //           var positive = apiInstance.column( 4 ).data() == 'Load';
      //           if(positive){
      //             return intVal(a) + intVal(b);
      //           } else {
      //             return intVal(a) - intVal(b);
      //           }
      //       }, 0 );
      //
      //     // Total over all pages
      //     total = api
      //       .column( 5 )
      //       .data()
      //       .reduce( function (a, b) {
      //           return intVal(a) + intVal(b);
      //       }, 0 );
      //
      //     // Total over this page
      //     pageTotal = api
      //       .column( 5, { page: 'current'} )
      //       .data()
      //       .reduce( function (a, b) {
      //           return intVal(a) + intVal(b);
      //       }, 0 );
      //
      //     // Update footer
      //     Self.$( api.column( 5 ).footer() ).html(
      //     //    '' + parseFloat(Math.round(pageTotal * 100) / 100).toFixed(2) +
      //       'Balance: ' + parseFloat(Math.round(balance * 100) / 100).toFixed(2) + ' ' +
      //       'Volume: ' + parseFloat(Math.round(total * 100) / 100).toFixed(2) + ' '
      //     );
      //   }
      // });

      return Self;
    }

});
