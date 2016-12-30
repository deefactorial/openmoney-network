'use strict';

var $ = require('jquery');
//$.mobile = require('jquery-mobile');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates');
var Templates = Templates(Handlebars);
var Common = require('../common');
var Steward = require('../models/steward');
var Stewards = require('../collections/stewards');
var PouchDB = require('pouchdb');
var Self;
var oauth = require('../helpers/oauth');
//var Buffer = require('buffer/').Buffer;
//require('buffer/');

module.exports = Backbone.View.extend({


    template: Templates['login'],

    name: 'login',

    initialize: function (options) {
        console.log("initialize login view", options);
        Self = this;
        Self.steward = options.steward;

    },

    render: function(){
        console.log("render login view");

        this.$el.html(this.template({}));

        this.$('#register-button').off('click').on('click', this.register);
        this.$('#login-button').off('click').on('click', this.login);
        this.$('.fb-button').off('click').on('click', this.fblogin);
        this.$('.forgot-link').off('click').on('click', this.forgot);


        if(typeof this.model != 'undefined'){
          console.info('model:' + JSON.stringify(this.model));
          if(typeof this.model.get('stewardname') != 'undefined'){
            this.$('#stewardname').val(this.model.get('stewardname'));
          }
        }


        $('#login').validate({
            onkeyup: false,
            rules: {
                username: {
                    required: true,
                    minlength: 8,
                    maxlength: 20
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                username: {
                    required: "Username is required",
                    minlength: "At least 8 characters is required.",
                    maxlength: "No more that 20 characters for a username."
                },
                password: {
                    required: "Password is required",
                    minlength: "At least 5 characters is required."
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
    },

    register: function( event ) {
        console.log('register event called');
        router.navigate('#signup',{trigger:true, replace:false});
    },

    login: function( event, done ) {
        event.preventDefault();
        console.log('login event called');

        if ( $('#login').valid() ) {

          var steward = new Steward();

          steward.set('_id', 'stewards~' + $('#stewardname').val());
          steward.set('stewardname', $('#stewardname').val());
          steward.set('password', $('#password').val());
          steward.set('type', 'stewards~');
          //var steward = new Steward({_id: , stewardname: $('#stewardname').val(), password: $('#password').val(), type: 'stewards~'});
          //Self.steward.save();

          oauth.authenticate(steward, function(error, authSteward){
            console.log('oauth.authenticate results', error, authSteward);
            if(error){
              console.log(JSON.stringify(error));
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
              if(_.isFunction(done)){
                done();
              }
            } else {
              // delete(steward.rev);
              console.log('authenticated steward:',authSteward);
              //Self.steward = authSteward;
              Self.steward.set('_id', 'stewards~' + $('#stewardname').val());
              Self.steward.set('stewardname', $('#stewardname').val());
              Self.steward.set('password', $('#password').val());
              Self.steward.set('type', 'stewards~');
              Self.steward.set('access_token', authSteward.get('access_token'))
              Self.steward.credentials = {};
              Self.steward.credentials.token = Self.steward.get('access_token');
              Self.steward.fetch({
                success: function(model, res){
                  if(typeof Self.steward.get('theme') != 'undefined' && Self.steward.get('theme') == 'dark'){
                    router.darkTheme();
                  } else {
                    router.lightTheme();
                  }
                  console.log('successfully got steward', model);
                },
                error: function(err){
                  console.log('could not get stewards', err);
                }
              });
              //update the persistent steward credentials
              var db = new PouchDB('openmoney');
              db.get('config~credentials', function(err, doc){
                console.log('config~credentials results', err, doc);
                if(err && err.status == 404){
                  db.put({
                    _id: 'config~credentials',
                    steward: authSteward.toJSON()
                  }, function(err, res){
                    console.log('config~credentials.put'. err, res);
                  });
                } else {
                  if(err){
                    console.log('config~credentials error not 404', err);
                  } else {
                    console.log('config~credentials successfully inserted steward into ', authSteward)
                    doc.steward = authSteward;
                    db.put(doc);
                  }
                }
              });

              // Self.steward.save({}, {
              //   success: function(model, res){
              //     console.log('saved steward model!', model, res)
              //   },
              //   error: function(model, res){
              //     console.log('error saving steward model', model, res)
              //   }
              // });

              if(_.isFunction(done)){
                done();
              }
              router.navigate('#stewards/' + Self.steward.get('stewardname') + '/loginSuccess',{trigger:true, replace:true});
              $('#success-notification').html('Successfully Logged In.').show();
              setTimeout(function(){
                $('#success-notification').hide();
              },10000);
            }
          })

            //
            // var login = {};
            // login.username = $('#stewardname').val();
            // login.password = $('#password').val();
            //
            // $.ajax({
            //   url: '/V2/stewards/' + login.username,
            //   headers: {
            //     'Authorization': 'Basic ' + new Buffer(login.username + ':' + login.password).toString("base64")
            //   }
            // }).done(function(result){
            //   console.log('success')
            //   console.log(JSON.stringify(result));
            //
            //   Self.steward.set('_id', 'stewards~' + login.username);
            //   Self.steward.set('stewardname', login.username);
            //   Self.steward.set('password', login.password);
            //   delete(result._rev);
            //   // result.password = login.password;
            //   Self.steward.save(result, {
            //     success: function(model, res){
            //       console.log('saved steward model!', model, res)
            //     },
            //     error: function(model, res){
            //       console.log('error saving steward model', model, res)
            //     }
            //   });
            //   //Common.DB.credentials = login;
            //   var db = new PouchDB('giftcard');
            //   db.get('config~credentials', function(err, doc){
            //     if(err && err.status == 404){
            //       db.put({
            //         _id: 'config~credentials',
            //         username: login.username,
            //         password: login.password
            //       });
            //     } else {
            //       if(err){
            //         console.log('error inserting config credentials:',err);
            //       } else {
            //         doc.username = login.username;
            //         doc.password = login.password;
            //         db.put(doc);
            //       }
            //     }
            //   })
            //
            //   if(_.isFunction(done)){
            //     done();
            //   }
            //   router.navigate('#stewards/' + login.username + '/loginSuccess',{trigger:true, replace:true});
            //   $('#success-notification').html('Successfully Logged In.').show();
            //   setTimeout(function(){
            //     $('#success-notification').hide();
            //   },10000);
            // }).fail(function(error){
            //   console.log('fail')
            //   console.log(JSON.stringify(error));
            //   if(typeof error.responseJSON != 'undefined' && typeof error.responseJSON.message != 'undefined' ){
            //     console.info(error.responseJSON.message);
            //     $('#error-notification').html(error.responseJSON.message).show();
            //     setTimeout(function(){
            //       $('#error-notification').hide();
            //     },10000);
            //   } else {
            //     $('#error-notification').html('Error').show();
            //     setTimeout(function(){
            //       $('#error-notification').hide();
            //     },10000);
            //   }
            //   if(_.isFunction(done)){
            //     done();
            //   }
            // });
            // submit credentials to server for verification
            // do a get post with the steward information.

        }
    },

    fblogin: function( event ) {
        console.log('fb login event called');
    },

    forgot: function( event ) {
        console.log('forgot password event called');
        router.navigate('#forgot',{trigger:true, replace:false});
    }

});
