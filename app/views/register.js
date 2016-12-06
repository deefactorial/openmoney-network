'use strict';
var jQuery = require('jquery');
var $ = jQuery;

var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');
//require('jquery-ui/core');
require('jquery-ui');
require('jquery-validation');
require('toolkit');
//require('jquery.inputmask');

//$.mobile = require('jquery-mobile');

//require('jquery-mobile-datepicker-wrapper');

var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates');
Templates = Templates(Handlebars);
var Common = require('../common');
//var StewardModel = require('../models/stewards');
var Self;
module.exports = Backbone.View.extend({

    //el: "#body",

    template: Templates['register'],

    name: 'register',

    initialize: function (options) {
        console.log("initialize register view");

        Self = this;

        Self.steward = options.steward;
    },

    render: function(){
        console.log("render register view");
        //this.$title.html("");
        //console.log("typeof this.model:" + typeof this.model );
        Self.$el.html(Self.template(Self.steward.toJSON()));
        //this.$back.attr("src","public/assets/images/app-back.png").off('click').on('click', {context: this}, this.back).show();
        //this.$footer.show();
        //this.$page.trigger('create');
        Self.$('#register-button').off('click').on('click', {context: Self}, Self.next);
        Self.$('#back').off('click').on('click', Self.back);
        //console.log("typeof $.datepicker:" + typeof $.datepicker);
        //console.log("typeof $.mobile.date:" + typeof $.mobile.date);

        //this.$('#bday').date({ dateFormat: 'yy-mm-dd' }).inputmask("9999-99-99");
        Self.Form = Self.$('form#register');
        Self.Form.validate({
            onkeyup: false,
            rules: {
                stewardname: {
                    required: true,
                    minlength: 3,
                    maxlength: 35
                },
                email: {
                    required: true,
                    email: true,
                    minlength: 3,
                    maxlength: 128
                },
                password: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                stewardname: {
                    required: "Steward name is required.",
                    minlength: "At least 3 characters is required.",
                    maxlength: "Less than 35 characters is required."
                },
                email: {
                    required: "Email is required.",
                    email: "Valid email is required.",
                    minlength: "At least 3 characters is required.",
                    maxlength: "Less than 127 characters is required."
                },
                password: {
                    required: "Password is required.",
                    minLength: "More than 3 characters is required."
                }
            },
            submitHandler: function(form) {
                console.log("submit form",form);
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

        return Self;
    },

    back: function( event ) {
        console.log("back event called");
        //event.data.context.$back.hide(); //hide the button before changing it.
        router.navigate('#login',{trigger:true, replace:false});
    },

    next: function( event, done) {
        event.preventDefault();
        console.log('next event called');
        console.log('Self.Form', Self.Form);
        var valid = Self.Form.valid();
        console.log("form valid: ", valid);
        if( valid ) {

          // console.log(window.location.href );
          // $.ajaxSetup({
          //   beforeSend: function(jqXHR, settings) {
          //       jqXHR.url = settings.url;
          //       jqXHR.method = settings.type;
          //       //console.log(JSON.stringify(settings));
          //   }
          // });

            var steward = {
              stewardname: Self.$('input#stewardname').val(),
              email:  Self.$('input#email').val(),
              password: Self.$('input#password').val()
            };
            console.log('steward', steward);
            var options = {};
            options.type = 'POST';
            options.data = JSON.stringify(steward);
            options.dataType = 'json';
            options.contentType = "application/json";
            options.url = '/V2/stewards';
            options.success = function(model){
              console.info('model save success! Go to Login.');
              if(_.isFunction(done)){
                done();
              }
              Backbone.history.navigate('#login',{trigger:true, replace:false});
              $('#success-notification').html('Successfully Signed Up New Steward.').show();
              setTimeout(function(){
                $('#success-notification').hide();
              },10000);
            };
            options.error = function(error){
              console.info('error:');
              //console.info(JSON.stringify(model));
              console.info(JSON.stringify(error));
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
            };
            $.ajax(options);

            // self.model.save({
            //     stewardname: $('#stewardname').val(),
            //     email:  $('#email').val(),
            //     password: $('#password').val()
            // }, options);
        } else {
          if(_.isFunction(done)){
            done();
          }
        }
    }
});
