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
var Namespace = require('../models/namespace');

module.exports = Marionette.ItemView.extend({

    template: Templates['steward'],

    steward: {},

    initialize: function (options) {
        console.log("initialize steward view", options);
        console.log(options);
        Self = this;
        Self.steward = options.steward;
        Self.stewardname = options.stewardname;
        Self.accounts = options.accounts;
        Self.currencies = options.currencies;
        Self.namespaces = options.namespaces;
        Self.listenTo(Self.accounts, 'sync add remove reset', Self.render);
        Self.listenTo(Self.currencies, 'sync add remove reset', Self.render);
        Self.listenTo(Self.namespaces, 'sync add remove reset', Self.render);
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
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace') + '/accounts/new');
    },

    render: function(){
        console.log('stewardname', Self.stewardname);
        Self.model = Self.collection.get('stewards~' + Self.stewardname);
        console.log("render steward view", Self.model);
        var data = {};
        if(typeof Self.model != 'undefined'){
          data = this.model.toJSON();
        }
        data.accounts = Self.accounts.getBySteward(Self.stewardname);
        for(var i = 0; i < data.accounts.length; i++){
          data.accounts[i] = data.accounts[i].toJSON();
          data.accounts[i].accountName = data.accounts[i].account + (data.accounts[i].account_namespace == '' ? '' : '.' + data.accounts[i].account_namespace);
          data.accounts[i].currencyName = data.accounts[i].currency + (data.accounts[i].currency_namespace == '' ? '' : '.' + data.accounts[i].currency_namespace);
          _.extend(data.accounts[i], ViewHelpers);
        }
        data.currencies = Self.currencies.getBySteward(Self.stewardname);
        console.log('currencies getBySteward', data.currencies);
        for(var i = 0; i < data.currencies.length; i++){
          data.currencies[i] = data.currencies[i].toJSON();
          data.currencies[i].currencyName = data.currencies[i].currency + (data.currencies[i].currency_namespace == '' ? '' : '.' + data.currencies[i].currency_namespace);
          for(var j = 0; j < data.currencies[i].stewards.length; j++){
            console.log('lookup currency steward:', data.currencies[i].stewards[j]);
            data.currencies[i].stewards[j] = Self.collection.get(data.currencies[i].stewards[j]);
            if(typeof data.currencies[i].stewards[j] != 'undefined'){
              data.currencies[i].stewards[j] = data.currencies[i].stewards[j].toJSON();
            }
            console.log('result steward:', data.currencies[i].stewards[j]);
          }
          _.extend(data.currencies[i], ViewHelpers);
        }
        data.namespaces = Self.namespaces.getBySteward(Self.stewardname);
        for(var i = 0; i < data.namespaces.length; i++){
          data.namespaces[i] = data.namespaces[i].toJSON();
          for(var j = 0; j < data.namespaces[i].stewards.length; j++){
            console.log('lookup namespaces steward:', data.namespaces[i].stewards[j]);
            data.namespaces[i].stewards[j] = Self.collection.get(data.namespaces[i].stewards[j]);
            if(typeof data.namespaces[i].stewards[j] != 'undefined'){
              data.namespaces[i].stewards[j] = data.namespaces[i].stewards[j].toJSON();
            }
            console.log('result steward:', data.namespaces[i].stewards[j]);
          }
          _.extend(data.namespaces[i], ViewHelpers);
        }
        console.log('steward Data:', data);
        this.$el.html(this.template(data));


        this.$('[data-sort=table]').DataTable();

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
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace + '/accounts/' + id.split('~')[1] + '/' + id.split('~')[2]);
        })

        this.$('[data-sort=table].currencies > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log('clicked on currency ID:', id);
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.namespace + '/currencies/' + id.split('~')[1] );
        })
    }
});
