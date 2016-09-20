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

module.exports = Marionette.ItemView.extend({

    template: Templates['accounts'],

    steward: {},

    initialize: function (options) {
        console.log("initialize accounts view", options);
        console.log(options);
        Self = this;
        Self.steward = options.steward;
        Self.stewards = options.stewards;
        Self.currencies = options.currencies;
        Self.listenTo(Self.currencies, 'sync add remove reset', Self.render);
        Self.listenTo(Self.stewards, 'sync add remove reset', Self.render);
    },

    ui: {
      newAccount: 'button[name=newAccount]'
    },

    events: {
      'click button[name=newAccount]': 'createAccount'
    },

    collectionEvents: {
      'sync': 'render'
    },

    createAccount: function(event){
      console.log('create account event fired', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/accounts/new/cc');
    },

    render: function(){

        var data = {};

        data.accounts = Self.collection.toJSON();
        for(var i = 0; i < data.accounts.length; i++){
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
        // data.currencies = Self.currencies.getByNamespace(Self.model.get('namespace'));
        // for(var i = 0; i < data.currencies.length; i++){
        //   data.currencies[i] = data.currencies[i].toJSON();
        //   data.currencies[i].currencyName = data.currencies[i].currency + (data.currencies[i].currency_namespace == '' ? '' : '.' + data.currencies[i].currency_namespace);
        //   for(var j = 0; j < data.currencies[i].stewards.length; j++){
        //     console.log('lookup currency steward:', data.currencies[i].stewards[j]);
        //     // if(typeof data.currencies[i].stewardsObject == 'undefined'){
        //     //   data.currencies[i].stewardsObject = [];
        //     // }
        //     data.currencies[i].stewards[j] = Self.stewards.get(data.currencies[i].stewards[j]);
        //     if(typeof data.currencies[i].stewards[j] != 'undefined'){
        //       data.currencies[i].stewards[j] = data.currencies[i].stewards[j].toJSON();
        //     }
        //     console.log('result steward:', data.currencies[i].stewards[j]);
        //   }
        //   _.extend(data.currencies[i], ViewHelpers);
        // }
        console.log('Accounts Data:', data);
        this.$el.html(this.template(data));

        Self.$('button[name=csv]').off('click').on('click', function(event){
          console.log('Export CSV button pressed', event);
          var csv = 'Account,Currency,Balance,Volume\n';
          for(var i = 0; i < data.accounts.length; i++){
            csv += data.accounts[i].accountName + ',' + data.accounts[i].currencyName + ',' + parseFloat(Math.round(data.accounts[i].balance * 100) / 100).toFixed(2) + ',' + parseFloat(Math.round(data.accounts[i].volume * 100) / 100).toFixed(2) + '\n';
          }
          var blob = new Blob([csv], {type: "text/csv;charset=utf-8"});
          FileSaver.saveAs(blob, Self.steward.get('stewardname') + "-accounts.csv");
        });

        $('#namespaceForm').validate({
            onkeyup: false,
            rules: {
                firstname: {
                    required: true,
                    minlength: 1,
                    maxlength: 35
                },
                lastname: {
                    required: true,
                    minlength: 1,
                    maxlength: 35
                },
                email: {
                    required: false,
                    email: true,
                    minlength: 3,
                    maxlength: 128
                },
                phone: {
                    required: false,
                    minlength: 4
                }
            },
            messages: {
                firstname: {
                    required: "First name is required.",
                    minlength: "At least 1 characters is required.",
                    maxlength: "Less than 35 characters is required."
                },
                lastname: {
                    required: "Last name is required.",
                    minlength: "At least 1 characters is required.",
                    maxlength: "Less than 35 characters is required."
                },
                email: {
                    minlength: "At least 3 characters is required.",
                    maxlength: "Less than 127 characters is required."
                },
                phone: {
                    minLength: "More than 4 characters is required."
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
          Self.$('#namespaceForm').show();
          Self.$('#statsButton').hide();
          Self.$('#stats').hide();
        });

        this.$('button[name=cancel]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('cancel button pressed!');
          Self.$('#namespaceForm').hide();
          Self.$('#statsButton').show();
          Self.$('#stats').show();
        });

        this.$('button[name=upsert]').off('click').on('click', function(e){
          e.preventDefault();
          console.log('upsert button pressed!');

          var isValid = $('#namespaceForm').valid();
          console.log("form valid:" + isValid);
          if( isValid ) {

            if(typeof Self.model == 'undefined'){
              Self.model = new Namespace();
            }
            Self.model.set('steward', Self.steward);
            Self.model.set('firstname', Self.$('input[name=firstname]').val());
            Self.model.set('lastname', Self.$('input[name=lastname]').val());
            var email =  Self.$('input[name=email]').val();
            if(email != ''){
              Self.model.set('email', email);
            } else {
              Self.model.unset('email');
            }
            var phone = Self.$('input[name=phone]').val();
            if(phone != ''){
              Self.model.set('phone', phone);
            } else {
              Self.model.unset('phone');
            }

            //console.log('namespace save', Self.model.toJSON());
            Self.model.credentials = {};
            Self.model.credentials.username = Self.steward.get('stewardname');
            Self.model.credentials.password = Self.steward.get('password');
            Self.model.save({},{
              success: function(model, response){
                console.log('successfully saved model', model, response);
                Self.model.set('_id', 'namespaces~' + Self.steward.get('stewardname') + '~' + Self.model.get('firstname') + '~' + Self.model.get('lastname'));
                Self.collection.set(model, {remove: false});
                router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('_id'),{ params: Self.model });
                Self.render();
                //Backbone.history.navigate('#namespaces/namespaces~' + Self.steward.get('stewardname') + '~' + Self.model.get('firstname') + '~' + Self.model.get('lastname'),{trigger:true, replace:true});
                $('#success-notification').html('Successfully saved namespace.').show();
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
        });


        this.$('[data-sort=table].accounts > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log('clicked on account ID:', id);
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/accounts/' + id.split('~')[1] + '/' + id.split('~')[2]);
        })

        this.$('[data-sort=table]').DataTable({
          "order": [[ 0, "desc" ], [1, "desc"]],
        });

    }
});
