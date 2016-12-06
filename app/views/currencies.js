'use strict';

var jQuery = require('jquery');
var $ = jQuery;
var _ = require('underscore');
require('datatables');
//require('jquery.browser');
require('toolkit');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
Backbone.$ = $;
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var ViewHelpers = require('../helpers/handlebarHelpers');
var ViewHelpers = ViewHelpers(Handlebars)
var Common = require('../common');
var Self;


var FileSaver = require('file-saver');
require('Blob');

module.exports = Marionette.CollectionView.extend({

    template: Templates['currencies'],

    steward: {},

    initialize: function (options) {
        console.log("initialize currencies view", options);
        console.log(options);
        Self = this;
        Self.steward = options.steward;
        Self.stewards = options.stewards;
        Self.accounts = options.accounts;
        Self.namespaces = options.namespaces;
        Self.journals = options.journals;
        Self.listenTo(Self.namespaces, 'sync add remove reset', Self.render);
        Self.listenTo(Self.accounts, 'sync add remove reset', Self.render);
        Self.listenTo(Self.journals, 'sync add remove reset', Self.render);
        Self.listenTo(Self.stewards, 'sync add remove reset', Self.render);
    },

    events: {
      'click button[name=newCurrency]': 'createCurrency',
      'click button[name=addCurrency]': 'addCurrency',
    },

    collectionEvents: {
      'sync': 'render'
    },

    createCurrency: function(event){
      console.log('create currency event fired', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/currencies/new');
    },

    addCurrency: function(event){
      console.log('add currency event fired', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/currencies/add');
    },

    render: function(){

        //Self.model = Self.collection.get('currencies~' + Self.currency);
        console.log("render currencies view", Self.collection.toJSON());

        var data = {};
        data.currencies = Self.collection.toJSON();
        for(var i = 0; i < data.currencies.length; i++){
          //data.currencies[i] = data.currencies[i].toJSON();
          data.currencies[i].currencyName = data.currencies[i].currency + (data.currencies[i].currency_namespace == '' ? '' : '.' + data.currencies[i].currency_namespace);
          for(var j = 0; j < data.currencies[i].stewards.length; j++){
            console.log('lookup currency steward:', data.currencies[i].stewards[j]);
            data.currencies[i].stewards[j] = Self.stewards.get(data.currencies[i].stewards[j]);
            if(typeof data.currencies[i].stewards[j] != 'undefined'){
              data.currencies[i].stewards[j] = data.currencies[i].stewards[j].toJSON();
            }
            console.log('result steward:', data.currencies[i].stewards[j]);
          }
          _.extend(data.currencies[i], ViewHelpers);
        }
        console.log('Currencies Data:', data);
        this.$el.html(this.template(data));

        Self.$('button[name=csvcurrencies]').off('click').on('click', function(event){
          console.log('Export CSV button pressed', event);

          var csv = 'Date,Time,From,To,Description,Currency,Amount,Balance,Volume\n';
          for(var j = 0; j < data.currencies.length; j ++){
            data.balance = 0;
            data.volume = 0;
            data.currencyName = data.currencies[j].currency_namespace == '' ? data.currencies[j].currency : data.currencies[j].currency + '.' + data.currencies[j].currency_namespace;
            var doubleEntries = [];
            console.log('get journals for currency', data.currencyName);
            data.journals = Self.journals.getByCurrency(data.currencies[j].currency, data.currencies[j].currency_namespace);
            for(var i = 0; i < data.journals.length; i++){
              data.journals[i] = data.journals[i].toJSON();
              console.log('journal entry', data.journals[i])
              var from_account_id = 'accounts~' + data.journals[i].from_account + '.' + data.journals[i].from_account_namespace + '~' + data.currencyName;
              var fromAccount = Self.accounts.get(from_account_id);

              if(typeof fromAccount != 'undefined'){
                console.log('from account is mine', fromAccount);
                //from account is mine;
                data.journals[i].fromstewardname = Self.steward.get('stewardname');
                data.journals[i].currencyName = data.currencyName;
                data.balance -= data.journals[i].amount;
                data.volume += data.journals[i].amount;
                data.journals[i].charge = 'CREDIT';
                data.journals[i].balance = _.clone(data.balance);
                data.journals[i].volume = _.clone(data.volume);


                var toAccount = Self.accounts.get('accounts~' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + '~' + data.currencyName);
                if(typeof toAccount != 'undefined'){
                  console.log('to account is mine', toAccount);
                  data.journals[i].tostewardname = Self.steward.get('stewardname');
                  //to account is mine
                  data.balance += data.journals[i].amount;
                  data.volume += data.journals[i].amount;

                  var doubleEntry = _.clone(data.journals[i]);
                  //delete(doubleEntry.fromstewardname);
                  doubleEntry.fromstewardname = Self.steward.get('stewardname');
                  doubleEntry.tostewardname = Self.steward.get('stewardname');
                  doubleEntry.currencyName = data.currencyName;
                  doubleEntry.balance = _.clone(data.balance);
                  doubleEntry.volume = _.clone(data.volume);
                  doubleEntry.charge = 'DEBIT';

                  doubleEntries.push(doubleEntry);
                }
              } else {
                console.log('from account not found', from_account_id)
                var toAccount = Self.accounts.get('accounts~' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + '~' + data.currencyName);
                if(typeof toAccount != 'undefined'){
                  console.log('to account is mine', toAccount);
                  //to account is mine
                  data.journals[i].tostewardname = Self.steward.get('stewardname');
                  data.journals[i].currencyName = data.currencyName;
                  data.balance += data.journals[i].amount;
                  data.volume += data.journals[i].amount;
                  data.journals[i].charge = 'DEBIT'
                  data.journals[i].balance = _.clone(data.balance);
                  data.journals[i].volume = _.clone(data.volume);
                }
              }
            }

            data.journals = data.journals.concat(doubleEntries);

            console.log('journals', data.journals);
            for(var i = 0; i < data.journals.length; i++){
              csv += new Date(data.journals[i].created).toLocaleString() + ',' + data.journals[i].from_account  + '.' + data.journals[i].from_account_namespace + ',' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + ','
              if(typeof data.journals[i].payload != 'undefined' && typeof data.journals[i].payload.description != 'undefined'){
                csv += data.journals[i].payload.description.replace(',','') + ',';
              } else {
                csv += ',';
              }
              csv += data.journals[i].currencyName + ','
              csv += data.journals[i].charge == 'CREDIT' ? '-' : '';
              csv += parseFloat(Math.round(data.journals[i].amount * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.journals[i].balance * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.journals[i].volume * 100) / 100).toFixed(2) + '\n';
            }

          }
          var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
          FileSaver.saveAs(blob, Self.steward.get('stewardname') + "-currencies.csv");

        });

        this.$('[data-sort=table].currencies > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log('clicked on currency ID:', id);
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/currencies/' + id.split('~')[1] );
        })

        this.$('[data-sort=table]').DataTable({});
    }
});
