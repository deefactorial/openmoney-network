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
var Account = require('../models/account');
var Self;

var FileSaver = require('file-saver');
require('Blob');

module.exports = Marionette.ItemView.extend({

    template: Templates['account'],

    steward: {},

    initialize: function (options) {
        console.log("initialize card view", options);
        Self = this;
        Self.collection = options.collection; //accounts
        Self.steward = options.steward;
        Self.namespaces = options.namespaces;
        Self.namespace = options.namespace;
        Self.currencies = options.currencies;
        Self.accountName = options.accountName;
        Self.currencyName = options.currencyName;
        Self.journals = options.journals;
        this.render();
        //console.log('card steward', Self.steward);
        Self.listenTo(Self.journals, 'sync reset', Self.render);
        Self.listenTo(Self.namespaces, 'sync reset', Self.render);
        Self.listenTo(Self.currencies, 'sync reset', Self.render);
    },

    events: {
      'click button[name=newJournal]': 'processJournalEntry'
    },

    collectionEvents: {
      'sync reset': 'render'
    },

    processJournalEntry: function(event){
      console.log('process Journal Entry event fired:', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/journals/' + Self.accountName + '/' + Self.currencyName );
    },

    render: function(){
        var id = 'accounts~' + Self.accountName + '~' + Self.currencyName;
        console.log("accountsID",id);
        Self.model = Self.collection.get(id);
        console.log('render account view', Self.model);
        var data = {};
        if(typeof Self.model != 'undefined'){
          data = Self.model.toJSON();
          data.accountName = Self.accountName;
          data.currencyName = Self.currencyName;

          var doubleEntries = [];
          var balance = 0;
          var volume = 0;
          //data.journals = Self.journals.where({from_account: Self.model.get('account'), from_account_namespace: Self.model.get('account_namespace')})
          data.journals = Self.journals.getByAccount(Self.model);
          for(var i = 0; i < data.journals.length; i++){
            data.journals[i] = data.journals[i].toJSON();
            _.extend(data.journals[i], ViewHelpers);
            var from_account_id = 'accounts~' + data.journals[i].from_account + '.' + data.journals[i].from_account_namespace + '~' + Self.currencyName;
            var fromAccount = Self.collection.get(from_account_id);
            if(typeof fromAccount != 'undefined'){
              data.journals[i].withStewardname = Self.steward.get('stewardname');
              data.journals[i].fromstewardname = Self.steward.get('stewardname');
              data.journals[i].currencyName = Self.currencyName;
            }
            var fromAccountOwner = data.journals[i].from_account == Self.model.get('account') && data.journals[i].from_account_namespace == Self.model.get('account_namespace');
            data.journals[i].charge = fromAccountOwner ? 'CREDIT' : 'DEBIT';

            if(fromAccountOwner) {
              balance -= data.journals[i].amount;
              data.journals[i].withAccount = data.journals[i].to_account + '.' + data.journals[i].to_account_namespace;
            } else {
              data.journals[i].withAccount = data.journals[i].from_account + '.' + data.journals[i].from_account_namespace;
              balance += data.journals[i].amount;
            }
            volume += data.journals[i].amount;

            data.journals[i].balance = _.clone(balance);
            data.journals[i].volume = _.clone(volume);

            var to_account_id = 'accounts~' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + '~' + Self.currencyName;
            var todoAccount = Self.collection.get(to_account_id);
            if(typeof todoAccount != 'undefined'){
              data.journals[i].withStewardname = Self.steward.get('stewardname');
              data.journals[i].tostewardname = Self.steward.get('stewardname');
              data.journals[i].currencyName = Self.currencyName;
            }

            var toAccountOwner = data.journals[i].to_account == Self.model.get('account') && data.journals[i].to_account_namespace == Self.model.get('account_namespace');
            if(toAccountOwner && fromAccountOwner){
              var doubleEntry = _.clone(data.journals[i]);
              doubleEntry.charge = 'DEBIT';
              balance += data.journals[i].amount;
              volume += data.journals[i].amount;
              doubleEntry.balance = _.clone(balance);
              doubleEntry.volume = _.clone(volume);
              doubleEntries.push(doubleEntry);
            }
          }

          data.journals = data.journals.concat(doubleEntries);
        }

        data.namespaces = Self.namespaces.toJSON();
        for(var i = 0; i < data.namespaces.length; i++){
          _.extend(data.namespaces[i], ViewHelpers);
        }
        data.currencies = Self.currencies.toJSON();
        for(var i = 0; i < data.currencies.length; i++){
          data.currencies[i].currencyName = data.currencies[i].currency_namespace == '' ? data.currencies[i].currency : data.currencies[i].currency + '.' + data.currencies[i].currency_namespace;
          _.extend(data.currencies[i], ViewHelpers);
        }

        _.extend(data, ViewHelpers);


        console.log('account view data:', data);
        Self.$el.html(Self.template(data));

        Self.$('button[name=csv]').off('click').on('click', function(event){
          console.log('Export CSV button pressed', event);
          var csv = 'Date,Time,With,Amount,Balance,Volume\n';
          for(var i = 0; i < data.journals.length; i++){
            csv += new Date(data.journals[i].created).toLocaleString() + ',' + data.journals[i].withAccount + ','
            csv += data.journals[i].charge == 'CREDIT' ? '-' : '';
            csv += parseFloat(Math.round(data.journals[i].amount * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.journals[i].balance * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.journals[i].volume * 100) / 100).toFixed(2) + '\n';
          }
          var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
          FileSaver.saveAs(blob, Self.steward.get('stewardname') + "-account-" + Self.accountName + '-' + Self.currencyName + ".csv");
        });

        this.$('[data-sort=basic]').DataTable({
          "order": [[ 0, "desc" ], [4, "desc"]],
          // "columnDefs": [ {
          //     targets: [ 0 ],
          //     orderData: [ 0, "desc" ]
          // }, {
          //     targets: [ 6 ],
          //     orderData: [ 1, 0 ]
          // }]
        });


        $('#cardForm').validate({
            onkeyup: false,
            rules: {
                account: {
                    required: true,
                    minlength: 1,
                    maxlength: 65
                },
                account_namespace: {
                    required: true,
                },
                currencyName: {
                    require: true,
                }
            },
            messages: {
                account: {
                    required: "Trading name is required.",
                    minlength: "At least 1 characters is required.",
                    maxlength: "Less than 65 characters is required."
                },
                account_namespace: {
                    required: "Account namespace is required.",
                },
                currencyName: {
                    required: "Currency Name is required."
                }
            },
            submitHandler: function(form) {
                console.log("submit form");
                form.submit();
            },
            errorPlacement: function(error, element) {
                var placement = $(element.parent()).data('error');
                if (placement) {
                    $(placement).append(error)
                } else {
                    error.insertAfter(element.parent());
                }
            }
        });

        this.$('button[name=showedit]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('showedit button pressed!');
          Self.$('#cardForm').show();
          Self.$('#statsButton').hide();
          Self.$('#stats').hide();
        });

        this.$('button[name=cancel]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('cancel button pressed!');
          Self.$('#cardForm').hide();
          Self.$('#statsButton').show();
          Self.$('#stats').show();
        });

        this.$('button[name=upsert]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('upsert button pressed!');

          var isValid = $('#accountForm').valid();
          console.log("form valid:" + isValid);
          if( isValid ) {

            if(typeof Self.model == 'undefined'){
              Self.model = new Account();
            }
            Self.model.set('steward', Self.steward);
            Self.model.set('stewards', [ Self.steward.get('id') ]);
            Self.model.set('account', Self.$('input[name=account]').val());
            Self.model.set('account_namespace', Self.$('select[name=account_namespace]').val());
            var currencyName = Self.$('select[name=currencyName]').val();
            if(currencyName.indexOf('.') !== -1){
              Self.model.set('currency', currencyName.substr(0, currencyName.indexOf('.')));
              Self.model.set('currency_namespace', currencyName.substr(currencyName.indexOf('.')+1, currencyName.length));
            } else {
              Self.model.set('currency', currencyName);
              Self.model.set('currency_namespace', '');
            }

            //console.log('namespace save', Self.model.toJSON());
            Self.model.credentials = {};
            Self.model.credentials.token = Self.steward.get('access_token');
            Self.model.save({},{
              success: function(model, response){
                console.log('successfully saved model', model, response);
                var accountName = Self.model.get('account_namespace') == '' ? Self.model.get('account') : Self.model.get('account') + '.' + Self.model.get('account_namespace');
                Self.model.set('id', 'accounts~' + accountName + '~' + currencyName);

                Self.collection.set(Self.model, {remove: false});
                //Self.journals.fetch();
                if(typeof Self.namespace != 'undefined') {
                  router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace + '/accounts/' + accountName + '/' + currencyName);
                } else {
                  router.navigate('stewards/' + Self.steward.get('stewardname') + '/accounts/' + accountName + '/' + currencyName);
                }
                Self.render();
                //Backbone.history.navigate('#namespaces/namespaces~' + Self.steward.get('stewardname') + '~' + Self.model.get('firstname') + '~' + Self.model.get('lastname'),{trigger:true, replace:true});
                $('#success-notification').html('Successfully saved account.').show();
                setTimeout(function(){
                  $('#success-notification').hide();
                },10000);
              },
              error: function(model, error){
                console.log('failed to saved model', model, error);
                if(typeof error.responseJSON != 'undefined' && typeof error.responseJSON.message != 'undefined' ){
                  console.info(error.responseJSON.message);
                  $('#error-notification').html(error.responseJSON.message).show();
                  setTimeout(function(){
                    $('#error-notification').hide();
                  },10000);
                } else {
                  $('#error-notification').html('Error').show();
                  setTimeout(function(){
                    $('#error-notification').hide();
                  },10000);
                }
              }
            })
          }
        })
    }
});
