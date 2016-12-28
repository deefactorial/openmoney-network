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

    initialize: function (options) {
        console.log("initialize card view", options);
        Self = this;
        Self.collection = options.collection; //accounts
        Self.steward = options.steward;
        Self.stewardsCollection = options.stewards;
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
        Self.listenTo(Self.stewardsCollection, 'sync reset', Self.render);
        Self.listenTo(Self.steward, 'sync reset', Self.render);
    },

    events: {
      'click button[name=newJournal]': 'processJournalEntry',
      'click button[name=addSteward]': 'addSteward',
    },

    collectionEvents: {
      'sync reset': 'render'
    },

    processJournalEntry: function(event){
      console.log('process Journal Entry event fired:', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/journals/' + Self.accountName + '/' + Self.currencyName );
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
        var id = 'accounts~' + Self.accountName + '~' + Self.currencyName;
        console.log("accountsID",id);
        Self.model = Self.collection.get(id);
        console.log('render account view', Self.model);
        var data = {};
        data.disabled = false;
        if(typeof Self.namespace == 'undefined' || Self.namespace == null || Self.namespace == ''){
          data.namespace = Self.steward.get('stewardname') + '.cc';
        } else {
          data.namespace = Self.namespace;
        }
        if(typeof Self.model != 'undefined'){
          data = Self.model.toJSON();
          data.namespace = data.account_namespace;
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

        data.accountName = Self.accountName;
        data.currencyName = Self.currencyName;
        console.log('currencyName = ', Self.currencyName);
        data.currency = Self.currencies.get('currencies~' + Self.currencyName);
        data.isCurrencySteward = false;
        if(typeof data.currency != 'undefined'){
          data.currency = data.currency.toJSON();
          data.currency.stewards.forEach(function(steward){
            if(steward == Self.steward.get('id')){
              data.isCurrencySteward = true;
            }
          })
        }



        data.isSteward = true;

        if(typeof Self.model != 'undefined'){
          data.isSteward = false;
          var stewardsArray = [];
          Self.model.get('stewards').forEach(function(steward){
            console.log('steward', steward, Self.steward.get('id'));
            if(typeof steward == 'string'){
              var stewardObject = Self.stewardsCollection.get(steward);
              if(typeof stewardObject != 'undefined'){
                stewardsArray.push(stewardObject.toJSON());
                if(steward == Self.steward.get('id')){
                  data.isSteward = true;
                }
              }
            } else {
              stewardsArray.push(Self.stewardsCollection.get(steward.id).toJSON());
              if(steward.id == Self.steward.get('id')){
                data.isSteward = true;
              }
            }
          })
          data.stewards = Self.stewards = stewardsArray;
        } else {
          data.stewards = Self.stewards = [ Self.steward.toJSON() ];
        }

        data.stewardsCollection = Self.stewardsCollection.toJSON();
        if(typeof data.journals != 'undefined'){
          data.isEditable = data.journals.length < 1
        } else {
          data.isEditable = true;
        }

        if(!data.isSteward){
          data.isEditable = false;
        }

        data.isStewardOrCurrencySteward = data.isSteward || data.isCurrencySteward;

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

        Self.registerRemove();


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
          Self.$('#accountForm').show();
          Self.$('#statsButton').hide();
          Self.$('#stats').hide();
        });

        this.$('button[name=cancel]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('cancel button pressed!');
          if(Self.accountName == 'new'){
            if(typeof Self.namespace == 'undefined' || Self.namespace == null || Self.namespace == ''){
              router.navigate('stewards/' + Self.steward.get('stewardname') + '/accounts');
            } else {
              router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace);
            }
          } else {
            Self.$('#accountForm').hide();
            Self.$('#statsButton').show();
            Self.$('#stats').show();
          }
        });

        this.$('button[name=upsert]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('upsert button pressed!');

          var isValid = $('#accountForm').valid();
          console.log("form valid:" + isValid);
          if( isValid ) {

            var editedAccount = new Account();
            if(typeof Self.accountName != 'undefined' && Self.accountName != '' && Self.accountName != null && Self.accountName != 'new'){
              editedAccount.set('id', 'accounts~' + Self.accountName + '~' + Self.currencyName);
            }
            editedAccount.set('steward', Self.steward);
            var stewardsArray = [];
            Self.stewards.forEach(function(steward){
              stewardsArray.push(steward.id);
            })
            editedAccount.set('stewards', stewardsArray);
            if(typeof Self.$('input[name=account]').val() != 'undefined'){
              editedAccount.set('account', Self.$('input[name=account]').val().toLowerCase());
              editedAccount.set('account_namespace', Self.$('select[name=account_namespace]').val());
            } else {
              if(Self.accountName.indexOf('.') !== -1){
                editedAccount.set('account', Self.accountName.substring(0, Self.accountName.indexOf('.')))
                editedAccount.set('account_namespace', Self.accountName.substring(Self.accountName.indexOf('.') + 1, Self.accountName.length));
              } else {
                editedAccount.set('account', Self.accountName)
                editedAccount.set('account_namespace', '');
              }
            }

            var currencyName = Self.$('select[name=currencyName]').val();
            if(typeof currencyName == 'undefined'){
              currencyName = Self.currencyName;
            }
            if(currencyName.indexOf('.') !== -1){
              editedAccount.set('currency', currencyName.substr(0, currencyName.indexOf('.')));
              editedAccount.set('currency_namespace', currencyName.substr(currencyName.indexOf('.')+1, currencyName.length));
            } else {
              editedAccount.set('currency', currencyName);
              editedAccount.set('currency_namespace', '');
            }
            editedAccount.set('disabled', Self.$('input[name=disabled]:checked').val() === 'true');

            //console.log('namespace save', Self.model.toJSON());
            editedAccount.credentials = {};
            editedAccount.credentials.token = Self.steward.get('access_token');
            editedAccount.save({},{
              success: function(model, response){
                console.log('successfully saved model', model, response);
                var accountName = editedAccount.get('account_namespace') == '' ? editedAccount.get('account') : editedAccount.get('account') + '.' + editedAccount.get('account_namespace');
                Self.collection.fetch();
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

        Self.$('[data-sort=basic]').DataTable({
          "order": [[ 0, "desc" ], [4, "desc"]],
          // "columnDefs": [ {
          //     targets: [ 0 ],
          //     orderData: [ 0, "desc" ]
          // }, {
          //     targets: [ 6 ],
          //     orderData: [ 1, 0 ]
          // }]
        });

        Self.modalTable = Self.$('[data-sort=checkbox-table]').DataTable({
          "paging": true,
          "info": false,
          "sDom": '<"top"i>rt<"bottom"p><"clear">',
          "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
        });
    }
});
