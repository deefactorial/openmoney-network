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

  template: Templates['forgot'],

  initialize: function (options) {
    console.log("initialize forgot view");
    Self = this;
    Self.steward = options.steward;
  },

  render: function(){
    console.log("render forgot view");

    Self.$el.html(Self.template(Self.steward.toJSON()));

    Self.$('#forgot-button').off('click').on('click', {context: Self}, Self.next);
    Self.$('#back').off('click').on('click', Self.back);

    Self.$('#forgot').validate({
        onkeyup: false,
        rules: {
            stewardname: {
                required: true,
                minlength: 3,
                maxlength: 128
            }
        },
        messages: {
            stewardname: {
                required: "Steward name or Email is required.",
                minlength: "At least 3 characters is required.",
                maxlength: "Less than 128 characters is required."
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
    console.log("form valid:" + Self.$('#forgot').valid());
    if( Self.$('#forgot').valid() ) {
      var user = {};
      if(Self.$('#stewardname').val().indexOf('@') !== -1){
        user.email = Self.$('#stewardname').val();
      } else {
        user.stewardname = Self.$('#stewardname').val();
      }

      console.log("user:" + JSON.stringify(user));

      var options = {};
      options.type = 'POST';
      options.data = JSON.stringify(user);
      options.dataType = 'json';
      options.contentType = "application/json";
      options.url = '/V1/stewards/forgot';
      options.success = function(model){
        console.info('Successfully Sent Forgot Password Request.');
        router.navigate('#login',{trigger:true, replace:false});
        $('#success-notification').html('Successfully sent forgot password request, check your email.').show();
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
