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

    template: Templates['namespace'],

    steward: {},

    initialize: function (options) {
        console.log("initialize namespace view", options);
        console.log(options);
        Self = this;
        Self.steward = options.steward;
        Self.stewards = options.stewards;
        Self.namespace = options.namespace;
        Self.page = options.page;
        Self.accounts = options.accounts;
        Self.currencies = options.currencies;
        Self.listenTo(Self.accounts, 'sync add remove reset', Self.render);
        Self.listenTo(Self.currencies, 'sync add remove reset', Self.render);
        Self.listenTo(Self.stewards, 'sync add remove reset', Self.render);
        if(typeof Self.model != 'undefined'){
          this.render();
        }
        console.log('namespaceview model', Self.model);
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
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace') + '/accounts/new/cc');
    },

    render: function(){

        Self.model = Self.collection.get('namespaces~' + Self.namespace);
        console.log("render namespace view", Self.model);
        var data = {};
        data.namespace = Self.namespace;
        if(typeof Self.model != 'undefined'){
          data = Self.model.toJSON();
          for(var i = 0; i < data.stewards.length; i++){
            data.stewards[i] = Self.stewards.get(data.stewards[i]);
            if(typeof data.stewards[i] != 'undefined'){
              data.stewards[i] = data.stewards[i].toJSON();
            }
          }
          data.accounts = Self.accounts.getByNamespace(Self.model.get('namespace'));
          for(var i = 0; i < data.accounts.length; i++){
            data.accounts[i] = data.accounts[i].toJSON();
            data.accounts[i].accountName = data.accounts[i].account + (data.accounts[i].account_namespace == '' ? '' : '.' + data.accounts[i].account_namespace);
            data.accounts[i].currencyName = data.accounts[i].currency + (data.accounts[i].currency_namespace == '' ? '' : '.' + data.accounts[i].currency_namespace);
            _.extend(data.accounts[i], ViewHelpers);
          }
          data.currencies = Self.currencies.getByNamespace(Self.model.get('namespace'));
          for(var i = 0; i < data.currencies.length; i++){
            data.currencies[i] = data.currencies[i].toJSON();
            data.currencies[i].currencyName = data.currencies[i].currency + (data.currencies[i].currency_namespace == '' ? '' : '.' + data.currencies[i].currency_namespace);
            for(var j = 0; j < data.currencies[i].stewards.length; j++){
              console.log('lookup currency steward:', data.currencies[i].stewards[j]);
              // if(typeof data.currencies[i].stewardsObject == 'undefined'){
              //   data.currencies[i].stewardsObject = [];
              // }
              data.currencies[i].stewards[j] = Self.stewards.get(data.currencies[i].stewards[j]);
              if(typeof data.currencies[i].stewards[j] != 'undefined'){
                data.currencies[i].stewards[j] = data.currencies[i].stewards[j].toJSON();
              }
              console.log('result steward:', data.currencies[i].stewards[j]);
            }
            _.extend(data.currencies[i], ViewHelpers);
          }
        }
        console.log('Namespace Data:', data);
        _.extend(data, ViewHelpers);
        this.$el.html(this.template(data));


        this.$('[data-sort=table]').DataTable({
          "order": [[ 0, "desc" ], [1, "desc"]],
        });

        $.validator.addMethod(
          "regex",
          function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
          },
          "Please check your input."
        );

        $('#namespaceForm').validate({
            onkeyup: false,
            rules: {
                namespace: {
                    required: true,
                    minlength: 1,
                    maxlength: 65,
                    regex: '^[A-Za-z0-9_.-]+$'
                },
            },
            messages: {
                namespace: {
                    required: "Namespace is required.",
                    minlength: "At least 1 characters is required.",
                    maxlength: "Less than 65 characters is required.",
                    regex: "Alpha, numberic, underscores, periods and hypens are only allowed."
                },
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
            Self.model.set('stewards', [ Self.steward.get('id') ] );
            Self.model.set('namespace', Self.$('input[name=namespace]').val());
            if(Self.model.get('namespace').indexOf('.') !== -1){
              Self.model.set('parent_namespace', Self.model.get('namespace').substr(Self.model.get('namespace').indexOf('.') + 1, Self.model.get('namespace').length));
            } else {
              Self.model.set('parent_namespace', '');
            }


            //console.log('namespace save', Self.model.toJSON());
            Self.model.credentials = {};
            Self.model.credentials.token = Self.steward.get('access_token');

            if(Self.namespace == 'add'){
              Self.model.fetch({
                success: function(model, response){
                  console.log('successfully added model', model, response);
                  Self.model.set('id', 'namespaces~' + Self.model.get('namespace') );
                  Self.collection.set(model, {remove: false});
                  router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace'));
                  Self.stewards.fetch();
                  //Backbone.history.navigate('#namespaces/namespaces~' + Self.steward.get('stewardname') + '~' + Self.model.get('firstname') + '~' + Self.model.get('lastname'),{trigger:true, replace:true});
                  $('#success-notification').html('Successfully added namespace.').show();
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
            } else {
              Self.model.save({},{
                success: function(model, response){
                  console.log('successfully saved model', model, response);
                  Self.model.set('id', 'namespaces~' + Self.model.get('namespace') );
                  Self.collection.set(model, {remove: false});
                  router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace'));
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
