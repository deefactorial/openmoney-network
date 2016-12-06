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
        Self.stewardsCollection = options.stewards;
        Self.namespace = options.namespace;
        Self.page = options.page;
        Self.accounts = options.accounts;
        Self.currencies = options.currencies;
        Self.listenTo(Self.accounts, 'sync add remove reset', Self.render);
        Self.listenTo(Self.currencies, 'sync add remove reset', Self.render);
        Self.listenTo(Self.stewardsCollection, 'sync add remove reset', Self.render);
        Self.listenTo(Self.steward, 'sync reset', Self.render);
        console.log('namespaceview model', Self.model);
    },

    events: {
      'click button[name=newAccount]': 'createAccount',
      'click button[name=newCurrency]': 'createCurrency',
      'click button[name=addSteward]': 'addSteward',
    },

    collectionEvents: {
      'sync add remove reset': 'render'
    },

    createAccount: function(event){
      console.log('create account event fired', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace') + '/accounts/new/cc');
    },

    createCurrency: function(event){
      console.log('create currency event fired', event);
      event.preventDefault();
      router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace') + '/currencies/new');
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

        Self.model = Self.collection.get('namespaces~' + Self.namespace);
        console.log("render namespace view", Self.model);
        var data = {};
        data.namespace = Self.namespace;
        data.isEditable = true;
        data.private = false;
        data.disabled = false;
        if(typeof Self.model != 'undefined'){
          data = Self.model.toJSON();
          if(typeof data.disabled == 'undefined'){
            data.disabled = false;
          }
          if(typeof data.private == 'undefined'){
            data.private = false;
          }
          data.namespace = Self.namespace;
          data.isEditable = true;
          for(var i = 0; i < data.stewards.length; i++){
            data.stewards[i] = Self.stewardsCollection.get(data.stewards[i]);
            if(typeof data.stewards[i] != 'undefined'){
              data.stewards[i] = data.stewards[i].toJSON();
            }
          }
          data.accounts = Self.accounts.getByNamespace(Self.model.get('namespace'));
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
            if(data.accounts[i].volume > 0){
              data.isEditable = false;
            }
            _.extend(data.accounts[i], ViewHelpers);
          }
          data.currencies = Self.currencies.getByNamespace(Self.model.get('namespace'));
          for(var i = 0; i < data.currencies.length; i++){
            data.currencies[i] = data.currencies[i].toJSON();
            data.currencies[i].currencyName = data.currencies[i].currency + (data.currencies[i].currency_namespace == '' ? '' : '.' + data.currencies[i].currency_namespace);
            for(var j = 0; j < data.currencies[i].stewards.length; j++){
              console.log('lookup currency steward:', data.currencies[i].stewards[j]);
              data.currencies[i].stewards[j] = Self.stewardsCollection.get(data.currencies[i].stewards[j]);
              if(typeof data.currencies[i].stewards[j] != 'undefined'){
                data.currencies[i].stewards[j] = data.currencies[i].stewards[j].toJSON();
              }
              console.log('result steward:', data.currencies[i].stewards[j]);
            }
            _.extend(data.currencies[i], ViewHelpers);
          }
        }

        data.isSteward = true;
        data.stewards = Self.stewards = [ Self.steward.toJSON() ];
        if(typeof Self.model != 'undefined'){
          data.isSteward = false;
          var stewardsArray = [];
          Self.model.get('stewards').forEach(function(steward){
            console.log('steward', steward);
            if(typeof steward != 'undefined'){
              stewardsArray.push(Self.stewardsCollection.get(steward).toJSON());
              if(steward.id == Self.steward.get('id')){
                data.isSteward = true;
              }
            }

          })
          data.stewards = Self.stewards = stewardsArray;
          if(!data.isSteward){
            data.isEditable = false;
          }
        }

        if(Self.namespace == 'add'){
          data.isSteward = false;
        }

        data.stewardsCollection = Self.stewardsCollection.toJSON();

        console.log('Namespace Data:', data);
        _.extend(data, ViewHelpers);
        this.$el.html(this.template(data));

        Self.registerRemove();

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
          if(Self.namespace == 'add' || Self.namespace == 'new'){
            router.navigate('#settings');
          } else {
            Self.$('#namespaceForm').hide();
            Self.$('#statsButton').show();
            Self.$('#stats').show();
          }
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
            var stewardsArray = [];
            Self.stewards.forEach(function(steward){
              stewardsArray.push(steward.id);
            });
            Self.model.set('stewards', stewardsArray );
            if(typeof Self.$('input[name=namespace]').val() != 'undefined' && Self.$('input[name=namespace]').val() != ''){
              Self.model.set('namespace', Self.$('input[name=namespace]').val());
            }
            if(Self.model.get('namespace').indexOf('.') !== -1){
              Self.model.set('parent_namespace', Self.model.get('namespace').substr(Self.model.get('namespace').indexOf('.') + 1, Self.model.get('namespace').length));
            } else {
              Self.model.set('parent_namespace', '');
            }

            Self.model.set('private', Self.$('input[name=private]:checked').val() === 'true');
            Self.model.set('disabled', Self.$('input[name=disabled]:checked').val() === 'true');

            //console.log('namespace save', Self.model.toJSON());
            Self.model.credentials = {};
            Self.model.credentials.token = Self.steward.get('access_token');

            if(Self.namespace == 'add'){
              Self.model.fetch({
                success: function(model, response){
                  console.log('successfully added model', model, response);
                  Self.model.set('id', 'namespaces~' + Self.model.get('namespace') );

                  Self.collection.fetch();
                  router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace'));

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
                  //Self.collection.set(model, {remove: false});
                  Self.collection.fetch();

                  router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + Self.model.get('namespace'));
                  //Self.render();
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

        this.$('[data-sort=table]').DataTable({
          "order": [[ 0, "desc" ], [1, "desc"]],
        });

        Self.modalTable = Self.$('[data-sort=checkbox-table]').DataTable({
          "paging": true,
          "info": false,
          "sDom": '<"top"i>rt<"bottom"p><"clear">',
          "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
        });
    }
});
