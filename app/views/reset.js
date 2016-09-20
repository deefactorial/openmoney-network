'use strict';
var jQuery = require('jquery');
var $ = jQuery;
//require('jquery-ui/core');
require('jquery-ui');
require('jquery-validation');
//require('jquery.inputmask');

//$.mobile = require('jquery-mobile');
var Backbone = require('backbone');
Backbone.$ = $;
var _ = require('underscore');

//require('jquery-mobile-datepicker-wrapper');

var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates');
Templates = Templates(Handlebars);
var Common = require('../common');
var Self;

module.exports = Backbone.View.extend({

    template: Templates['reset'],

    initialize: function (options) {
        console.log("initialize reset view");
        Self = this;
        Self.steward = options.steward;
        Self.stewardname = options.stewardname;
        Self.forgot_token = options.forgot_token;
    },

    render: function(){
        console.log("render reset view");

        Self.$el.html(Self.template(Self.steward.toJSON()));

        Self.$('#reset-button').off('click').on('click', {context: Self}, Self.next);
        Self.$('#back').off('click').on('click', Self.back);

        Self.$('#reset').validate({
            onkeyup: false,
            rules: {
                password: {
                    required: true,
                    minlength: 3
                },
                password2: {
                    required: true,
                    minlength: 3,
                    equalTo: "#password"
                }
            },
            messages: {
                password: {
                    required: "Password is required.",
                    minlength: "At least 3 characters is required."
                },
                password2: {
                    required: "Password is required.",
                    minlength: "At least 3 characters is required.",
                    equalTo: "Passwords did not match."
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

    back: function( event ) {
        console.log("back event called");
        //event.data.context.$back.hide(); //hide the button before changing it.
        router.navigate('#login',{trigger:true, replace:false});
    },

    next: function( event ) {
        console.log('next event called');
        event.preventDefault();
        console.log("form valid:" + Self.$('#reset').valid());
        if( Self.$('#reset').valid() ) {

            var user = {
                stewardname: Self.stewardname,
                password: Self.$('#password').val(),
                forgot_token: Self.forgot_token
            };

            console.log("user:" + JSON.stringify(user));

            var options = {};
            options.type = 'POST';
            options.data = JSON.stringify(user);
            options.dataType = 'json';
            options.contentType = "application/json";
            options.url = '/V1/stewards/reset';
            options.success = function(model){
              console.info('Successfully Sent Reset Password Request.');
              router.navigate('#login',{trigger:true, replace:false});
              $('#success-notification').html('Successfully sent reset password request, verify by logging in.').show();
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
            };
            $.ajax(options);

        }

    }

});
