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
var Currency = require('../models/currency');
var Self;

var FileSaver = require('file-saver');
require('Blob');

module.exports = Marionette.ItemView.extend({

    template: Templates['currency'],

    steward: {},

    initialize: function (options) {
        console.log("initialize currency view", options);
        Self = this;
        Self.collection = options.collection;
        Self.steward = options.steward;
        Self.namespaces = options.namespaces;
        Self.namespace = options.namespace;
        Self.currencyName = options.currencyName;
        Self.accounts = options.accounts;
        Self.journals = options.journals;
        Self.stewardsCollection = options.stewards;
        Self.listenTo(Self.journals, 'sync reset', Self.render);
        Self.listenTo(Self.accounts, 'sync reset', Self.render);
        Self.listenTo(Self.namespaces, 'sync reset', Self.render);
        Self.listenTo(Self.stewardsCollection, 'sync reset', Self.render);
        Self.listenTo(Self.steward, 'sync reset', Self.render);
    },

    events: {
      'click button[name=newTransaction]': 'processTransaction',
      'click button[name=newAccount]': 'createAccount',
      'click button[name=addSteward]': 'addSteward',
    },

    collectionEvents: {
      'sync reset': 'render'
    },

    processTransaction: function(event){
      console.log('processTransaction event fired:', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/journals/all/' + Self.currencyName );
    },

    createAccount: function(event){
      console.log('currencyView.createAccount event fired:', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/accounts/new/' + Self.currencyName );
    },

    addSteward: function(event){
      console.log('add stewards to stewards', event);
      event.preventDefault();
      Self.$('#stewardsModal').show();

      Self.$('button.close').off('click').on('click', function(event){
        event.preventDefault();
        console.log('close modal');
        Self.$('#stewardsModal').hide();
      });

      Self.$('button.cancel').off('click').on('click', function(event){
        event.preventDefault();
        console.log('cancel modal');
        Self.$('#stewardsModal').hide();
      });

      Self.$('button.add').off('click').on('click', function(event){
        event.preventDefault();
        console.log('add button pressed');
        //get list of checked checkboxes

        var selected = [];
        $('#stewardsCheckbox:checked').each(function() {
            selected.push(Self.stewardsCollection.get($(this).val()).toJSON());
        });
        console.log('selected', selected);
        selected.forEach(function(select){
          var exists = false;
          Self.stewards.forEach(function(steward){
            if(steward.stewardname == select.stewardname){
              exists = true;
            }
          })
          if(!exists){
            Self.stewards.push(select);
          }
        })
        console.log('Self.stewards', Self.stewards);

        //render new list of stewards
        Self.$('#stewards').html(Templates['stewardList']({ stewards: Self.stewards }));
        Self.$('#stewardsModal').hide();

        Self.registerRemove();
      });

      Self.$('button[name=addStewardToList]').off('click').on('click', function(event){
        event.preventDefault();
        console.log('addSteward button pressed');

        var stewardname = Self.$('input[name=stewardname]').val();

        if(stewardname == ''){
          Self.$('#addStewardForm').addClass('has-error');
          Self.$('#helpBlock').html('Steward name is required.');
          setTimeout(function(){
            Self.$('#addStewardForm').removeClass('has-error');
            Self.$('#helpBlock').html('');
          },10000);
        } else {
          var addSteward = new Steward();
          addSteward.set('steward', Self.steward);
          addSteward.set('stewardname', stewardname);

          addSteward.credentials = {};
          addSteward.credentials.token = Self.steward.get('access_token');
          addSteward.fetch({
            success: function(model, response){
              console.log('successfully fetched model', model, response);

              //this will re-render the page because it's listening to changes on the collection.
              Self.stewardsCollection.fetch({
                success: function(model, response){
                  console.log('fetched stewards collection', model, response, Self.stewardsCollection.toJSON());
                  Self.modalTable.destroy();
                  Self.$('#modalList').html(Templates['stewardModalList']({ stewards: Self.stewardsCollection.toJSON() }));
                  Self.modalTable = Self.$('[data-sort=checkbox-table]').DataTable({
                    "paging": true,
                    "info": false,
                    "sDom": '<"top"i>rt<"bottom"p><"clear">',
                    "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
                  });
                },
                error: function(model, error){
                  console.log('error getting stewards collection', model, error);
                }
              })
              //re-render the modal list
              // $('#success-notification').html('Successfully added steward.').show();
              // setTimeout(function(){
              //   $('#success-notification').hide();
              // },10000);

              Self.$('#addStewardForm').addClass('has-success');
              Self.$('#helpBlock').html('Successfully added steward.');
              Self.$('input[name=stewardname]').val('')
              setTimeout(function(){
                Self.$('#addStewardForm').removeClass('has-success');
                Self.$('#helpBlock').html('');
              },10000);
            },
            error: function(model, error){
              console.log('failed to fetch model', model, error);
              if(typeof error.responseJSON != 'undefined' && typeof error.responseJSON.message != 'undefined' ){
                console.info(error.responseJSON.message);
                Self.$('#addStewardForm').addClass('has-error');
                Self.$('#helpBlock').html(error.responseJSON.message);
                setTimeout(function(){
                  Self.$('#addStewardForm').removeClass('has-error');
                  Self.$('#helpBlock').html('');
                },10000);
              } else {
                Self.$('#addStewardForm').addClass('has-error');
                Self.$('#helpBlock').html('Error');
                setTimeout(function(){
                  Self.$('#addStewardForm').removeClass('has-error');
                  Self.$('#helpBlock').html('');
                },10000);
              }
            }
          })
        }
      });
    },

    registerRemove: function(){
        Self.$('button[name=remove]').off('click').on('click', Self.removeSteward);
    },

    removeSteward: function(event){
      event.preventDefault();
      console.log('remove event triggered', this.value);
      var stewardId = this.value;

      var newStewards = []
      Self.stewards.forEach(function(steward){
        if(steward.id != stewardId){
          newStewards.push(steward);
        }
      })
      Self.stewards = newStewards;
      //render new list of stewards
      Self.$('#stewards').html(Templates['stewardList']({ stewards: Self.stewards }));
      Self.registerRemove();
    },

    render: function(){
        var id = 'currencies~' + Self.currencyName;
        console.log("currency id: ", id);
        Self.model = Self.collection.get(id);
        console.log('render currency view', Self.model);
        var data = {};
        data.private = false;
        data.disabled = false;
        data.currency_namespace = Self.namespace;
        if(typeof Self.model != 'undefined'){
          data = Self.model.toJSON();
          if(typeof data.disabled == 'undefined'){
            if(typeof data.enabled != 'undefined'){
              if(data.enabled){
                data.disabled = false;
              } else {
                data.disabled = true;
              }
            } else {
              data.disabled = false;
            }
          }
          if(typeof data.private == 'undefined'){
            data.private = false;
          }

          data.accounts = Self.accounts.getByCurrency(Self.model.get('currency'), Self.model.get('currency_namespace'));
          for(var i = 0; i < data.accounts.length; i++){
            data.accounts[i] = data.accounts[i].toJSON();
            data.accounts[i].accountName = data.accounts[i].account + (data.accounts[i].account_namespace == '' ? '' : '.' + data.accounts[i].account_namespace);
            data.accounts[i].currencyName = data.accounts[i].currency + (data.accounts[i].currency_namespace == '' ? '' : '.' + data.accounts[i].currency_namespace);
            if(typeof data.accounts[i].balance == 'undefined'){
              data.accounts[i].balance = 0.00;
            }
            if(typeof data.accounts[i].volume == 'undefined'){
              data.accounts[i].volume = 0.00;
            }
            _.extend(data.accounts[i], ViewHelpers);
          }
        }
        data.currencyName = Self.currencyName;


        data.namespaces = Self.namespaces.toJSON();
        for(var i = 0; i < data.namespaces.length; i++){
          _.extend(data.namespaces[i], ViewHelpers);
        }
        data.balance = 0;
        data.volume = 0;

        var doubleEntries = [];

        data.journals = Self.journals.getByCurrency(data.currency, data.currency_namespace);
        for(var i = 0; i < data.journals.length; i++){
          data.journals[i] = data.journals[i].toJSON();
          console.log('journal entry', data.journals[i])
          var from_account_id = 'accounts~' + data.journals[i].from_account + '.' + data.journals[i].from_account_namespace + '~' + Self.currencyName;
          var fromAccount = Self.accounts.get(from_account_id);

          if(typeof fromAccount != 'undefined'){
            console.log('from account is mine', fromAccount);
            //from account is mine;
            data.journals[i].fromstewardname = Self.steward.get('stewardname');
            data.journals[i].currencyName = Self.currencyName;
            data.balance -= data.journals[i].amount;
            data.volume += data.journals[i].amount;
            data.journals[i].charge = 'CREDIT';
            data.journals[i].balance = _.clone(data.balance);
            data.journals[i].volume = _.clone(data.volume);

            var toAccount = Self.accounts.get('accounts~' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + '~' + Self.currencyName);
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
              doubleEntry.currencyName = Self.currencyName;
              doubleEntry.balance = _.clone(data.balance);
              doubleEntry.volume = _.clone(data.volume);
              doubleEntry.charge = 'DEBIT';

              doubleEntries.push(doubleEntry);
            }
          } else {
            console.log('from account not found', from_account_id)
            var toAccount = Self.accounts.get('accounts~' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + '~' + Self.currencyName);
            if(typeof toAccount != 'undefined'){
              console.log('to account is mine', toAccount);
              //to account is mine
              data.journals[i].tostewardname = Self.steward.get('stewardname');
              data.journals[i].currencyName = Self.currencyName;
              data.balance += data.journals[i].amount;
              data.volume += data.journals[i].amount;
              data.journals[i].charge = 'DEBIT'
              data.journals[i].balance = _.clone(data.balance);
              data.journals[i].volume = _.clone(data.volume);
            }
          }
        }



        data.journals = data.journals.concat(doubleEntries);

        for(var i = 0; i < data.journals.length; i++){
          _.extend(data.journals[i], ViewHelpers);
        }
        if(typeof data.journals != 'undefined'){
          data.isEditable = data.journals.length < 1;
        } else {
          data.isEditable = true;
        }
        data.isSteward = true;
        data.stewards = Self.stewards = [ Self.steward.toJSON() ];
        if(typeof Self.model != 'undefined'){
          data.isSteward = false;
          var stewardsArray = [];
          Self.model.get('stewards').forEach(function(steward){
            console.log('steward compare', steward, Self.steward.get('id'))
            if(typeof steward != 'undefined'){
              if(typeof steward == 'string'){
                stewardsArray.push(Self.stewardsCollection.get(steward).toJSON());
                if(steward == Self.steward.get('id')){
                  data.isSteward = true;
                }
              } else {
                stewardsArray.push(Self.stewardsCollection.get(steward.id).toJSON());
                if(steward.id == Self.steward.get('id')){
                  data.isSteward = true;
                }
              }
            }
          })
          data.stewards = Self.stewards = stewardsArray;
          if(!data.isSteward){
            data.isEditable = false;
          }
        }

        if(Self.currencyName == 'add'){
          data.isSteward = false;
        }

        data.stewardsCollection = Self.stewardsCollection.toJSON();

        console.log('currency view data:', data);
        _.extend(data, ViewHelpers);
        Self.$el.html(Self.template(data));

        Self.registerRemove();

        Self.$('button[name=csvaccounts]').off('click').on('click', function(event){
          console.log('Export CSV button pressed', event);
          var csv = 'Account,Currency,Balance,Volume\n';
          for(var i = 0; i < data.accounts.length; i++){
            csv += data.accounts[i].accountName + ',' + data.accounts[i].currencyName + ',' + parseFloat(Math.round(data.accounts[i].balance * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.accounts[i].volume * 100) / 100).toFixed(2) + '\n';
          }
          var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
          FileSaver.saveAs(blob, Self.steward.get('stewardname') + "-currency-" + Self.currencyName + "-accounts.csv");
        });

        Self.$('button[name=csvledger]').off('click').on('click', function(event){
          console.log('Export CSV button pressed', event);
          var csv = 'Date,Time,From,To,Description,Amount,Balance,Volume\n';
          for(var i = 0; i < data.journals.length; i++){
            csv += new Date(data.journals[i].created).toLocaleString() + ',' + data.journals[i].from_account  + '.' + data.journals[i].from_account_namespace + ',' + data.journals[i].to_account + '.' + data.journals[i].to_account_namespace + ','
            if(typeof data.journals[i].payload != 'undefined' && typeof data.journals[i].payload.description != 'undefined'){
              csv += data.journals[i].payload.description.replace(',','') + ',';
            } else {
              csv += ',';
            }
            csv += data.journals[i].charge == 'CREDIT' ? '-' : '';
            csv += parseFloat(Math.round(data.journals[i].amount * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.journals[i].balance * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.journals[i].volume * 100) / 100).toFixed(2) + '\n';
          }
          var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
          FileSaver.saveAs(blob, Self.steward.get('stewardname') + "-currency-" + Self.currencyName + ".csv");
        });

        this.$('[data-sort=basic]').DataTable({
          "order": [[ 0, "desc" ], [5, "desc"]]
        });

        this.$('[data-sort=table].accounts > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log('clicked on account ID:', id);
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/accounts/' + id.split('~')[1] + '/' + id.split('~')[2]);
        })

        $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
          },
          "Please check your input."
        );

        $('#currencyForm').validate({
            onkeyup: false,
            rules: {
                currency: {
                    required: true,
                    minlength: 1,
                    maxlength: 65,
                    regex: '^[A-Za-z0-9_-]+$'
                },
                currency_namespace: {
                    required: true,
                }
            },
            messages: {
                currency: {
                    required: "Currency name is required.",
                    minlength: "At least 1 characters is required.",
                    maxlength: "Less than 65 characters is required.",
                    reges: "Alpha, numberic, underscores, periods and hypens are only allowed."
                },
                currency_namespace: {
                    required: "Currency namespace is required.",
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
          Self.$('#currencyForm').show();
          Self.$('#statsButton').hide();
          Self.$('#stats').hide();
        });

        this.$('button[name=cancel]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('cancel button pressed!');
          if(Self.currencyName == 'new'){
            if(typeof Self.namespace == 'undefined' || Self.namespace == null || Self.namespace == ''){
              router.navigate('stewards/' + Self.steward.get('stewardname') + '/currencies');
            } else {
              router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace);
            }
          } else {
            Self.$('#currencyForm').hide();
            Self.$('#statsButton').show();
            Self.$('#stats').show();
          }
        });

        this.$('button[name=upsert]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('upsert button pressed!');

          var isValid = $('#currencyForm').valid();
          console.log("form valid:" + isValid);
          if( isValid ) {

            //this is for adding an existsing currency
            if(Self.currencyName == 'add'){
              if(typeof Self.model == 'undefined'){
                Self.model = new Currency();
              }
              Self.model.set('steward', Self.steward);
              Self.model.set('stewards', [ Self.steward.get('id') ]);
              Self.model.set('currency', Self.$('input[name=currency]').val().toLowerCase());
              Self.model.set('currency_namespace', Self.$('select[name=currency_namespace]').val());

              //console.log('namespace save', Self.model.toJSON());
              Self.model.credentials = {};
              Self.model.credentials.token = Self.steward.get('access_token');
              Self.model.fetch({
                success: function(model, response){
                  console.log('successfully fetched model', model, response);
                  var currencyName = Self.model.get('currency_namespace') == '' ? Self.model.get('currency') : Self.model.get('currency') + '.' + Self.model.get('currency_namespace');
                  // Self.model.set('id', 'currencies~' + currencyName);
                  // Self.collection.set(Self.model, {remove: false});

                  Self.collection.fetch();
                  //Self.journals.fetch();
                  if(typeof Self.namespace != 'undefined'){
                    router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace + '/currencies/' + currencyName.toLowerCase());
                  } else {
                    router.navigate('stewards/' + Self.steward.get('stewardname') + '/currencies/' + currencyName);
                  }
                  //Backbone.history.navigate('#namespaces/namespaces~' + Self.steward.get('stewardname') + '~' + Self.model.get('firstname') + '~' + Self.model.get('lastname'),{trigger:true, replace:true});
                  $('#success-notification').html('Successfully added currency.').show();
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
              });
            } else {

              var editedCurrency = new Currency();
              if(Self.currencyName == 'new' || typeof Self.model == 'undefined' || typeof Self.model.get('id') == 'undefined'){

              } else {
                editedCurrency.set('id', Self.model.get('id'));
              }
              var stewardsArray = [];
              console.log('Self.stewards', Self.stewards);
              Self.stewards.forEach(function(steward){
                if(typeof steward._id != 'undefined'){
                  stewardsArray.push(steward._id);
                } else if(typeof steward.id != 'undefined'){
                  stewardsArray.push(steward.id);
                } else {
                  console.log('both are undefined', steward);
                }
              });
              editedCurrency.set('stewards', stewardsArray);
              editedCurrency.set('steward', Self.steward);
              if(typeof Self.$('input[name=currency]').val() != 'undefined'){
                editedCurrency.set('currency', Self.$('input[name=currency]').val().toLowerCase());
                editedCurrency.set('currency_namespace', Self.$('select[name=currency_namespace]').val());
              } else {
                if(Self.currencyName.indexOf('.') !== -1){
                  editedCurrency.set('currency', Self.currencyName.substr(0, Self.currencyName.indexOf('.')));
                  editedCurrency.set('currency_namespace', Self.currencyName.substr(Self.currencyName.indexOf('.') + 1, Self.currencyName.length));
                } else {
                  editedCurrency.set('currency', Self.currencyName.substr(0, Self.currencyName.length));
                  editedCurrency.set('currency_namespace', '');
                }
              }
              editedCurrency.set('private', Self.$('input[name=private]:checked').val() === 'true');
              editedCurrency.set('disabled', Self.$('input[name=disabled]:checked').val() === 'true');

              var currencyName = editedCurrency.get('currency') + '.' + editedCurrency.get('currency_namespace');

              editedCurrency.credentials = {};
              editedCurrency.credentials.token = Self.steward.get('access_token');
              console.log('currency',editedCurrency.toJSON());
              editedCurrency.save({},{
                success: function(model, response){
                  console.log('successfully saved model', model, response);
                  var currencyName = editedCurrency.get('currency_namespace') == '' ? editedCurrency.get('currency') : editedCurrency.get('currency') + '.' + editedCurrency.get('currency_namespace');
                  // Self.model.set('id', 'currencies~' + currencyName);
                  // Self.collection.set(Self.model, {remove: false});
                  Self.collection.credentials = {};
                  Self.collection.credentials.token = Self.steward.get('access_token');
                  Self.collection.fetch();
                  //Self.journals.fetch();
                  if(typeof Self.namespace != 'undefined'){
                    router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace + '/currencies/' + currencyName.toLowerCase);
                  } else {
                    router.navigate('stewards/' + Self.steward.get('stewardname') + '/currencies/' + currencyName);
                  }
                  //Backbone.history.navigate('#namespaces/namespaces~' + Self.steward.get('stewardname') + '~' + Self.model.get('firstname') + '~' + Self.model.get('lastname'),{trigger:true, replace:true});
                  $('#success-notification').html('Successfully saved currency.').show();
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
              });
            }
          }
        })

        Self.modalTable = Self.$('[data-sort=checkbox-table]').DataTable({
          "paging": true,
          "info": false,
          "sDom": '<"top"i>rt<"bottom"p><"clear">',
          "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
        });
    }
});
