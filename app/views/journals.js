'use strict';

var $ = require('jquery');
var _ = require('underscore');
// require('../../node_modules/sidr/dist/jquery.sidr.min.js');
var Backbone = require('backbone');
Backbone.$ = $;
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var ViewHelpers = require('../helpers/handlebarHelpers');
var ViewHelpers = ViewHelpers(Handlebars);
var Common = require('../common');
var Self = {};
var Journal = require('../models/journal');
//http://stackoverflow.com/questions/2897155/get-cursor-position-in-characters-within-a-text-input-field
(function($) {
    $.fn.getCursorPosition = function() {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
})(jQuery);

//http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
(function($) {
  $.fn.setCursorPosition = function(caretPos) {
      var el = this.get(0);
      if (!el) return; // No (input) element found
      //var el = document.getElementById(elemId);

      el.value = el.value;
      // ^ this is used to not only get "focus", but
      // to make sure we don't have it everything -selected-
      // (it causes an issue in chrome, and having it doesn't hurt any other browser)

      if (el !== null) {

          if (el.createTextRange) {
              var range = el.createTextRange();
              range.move('character', caretPos);
              range.select();
              return true;
          }

          else {
              // (el.selectionStart === 0 added for Firefox bug)
              if (el.selectionStart || el.selectionStart === 0) {
                  el.focus();
                  el.setSelectionRange(caretPos, caretPos);
                  return true;
              }

              else  { // fail city, fortunately this never happens (as far as I've tested) :)
                  el.focus();
                  return false;
              }
          }
      }
  }
})(jQuery);

var isMobileCache;
var isMobile = function(){

  if(isMobileCache !== true || isMobileCache !== false){
    //detect user agent if agent is android, ios, blackberry or windows mobile then return true.
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ){
      isMobileCache = true;
    } else if( userAgent.match( /Android/i ) ){
      isMobileCache = true;
    } else if( userAgent.match( /Blackberry/i ) || userAgent.match( /BB10/i ) || userAgent.match( /RIM Tablet OS/i ) ){
      isMobileCache = true;
    } else if( userAgent.match( /Windows Phone/i ) || userAgent.match( /IEMobile/i ) ){
      isMobileCache = true;
    } else{
      isMobileCache = false;
    }
  }

  return isMobileCache;
};

var hasSoftKeyboard = function(){
  return isMobile();
};

module.exports = Backbone.View.extend({

    template: Templates['journals'],

    initialize: function (options) {
        console.log("initialize journals view", options);
        Self = this;
        Self.steward = options.steward;
        Self.journals = options.journals;
        Self.accountName = options.accountName;
        Self.currencyName = options.currencyName;
        Self.listenTo(Self.collection, 'sync reset', Self.render);
        //Self.listenTo(Self.journals, 'sync reset', Self.render);
    },

    activeInput : 'amount',

    render: function(){
        console.log("render journals view", Self.collection.toJSON());

        var data = {};
        data.accounts = Self.collection.getBySteward(Self.steward.get('stewardname'));

        if((typeof Self.accountName == 'undefined' || Self.accountName == null)&&(typeof data.accounts[0] != 'undefined')){
          var first = data.accounts[0].toJSON();
          data.accountName = first.account_namespace == '' ? first.account : first.account + '.' + first.account_namespace;
          data.currencyName = first.currency_namespace == '' ? first.currency : first.currency + '.' + first.currency_namespace;
          //hack to finish rendering first before navigating
          setTimeout(function(){
            router.navigate('#stewards/' + Self.steward.get('stewardname') + '/journals/' + data.accountName + '/' + data.currencyName);
          }, 1);
        } else {

          for(var i = 0; i < data.accounts.length; i++){
            data.accounts[i] = data.accounts[i].toJSON();
            data.accounts[i].accountName = data.accounts[i].account_namespace == '' ? data.accounts[i].account : data.accounts[i].account + '.' + data.accounts[i].account_namespace;
            data.accounts[i].currencyName = data.accounts[i].currency_namespace == '' ? data.accounts[i].currency : data.accounts[i].currency + '.' + data.accounts[i].currency_namespace;
            _.extend(data.accounts[i], ViewHelpers);
          }
          _.extend(data, ViewHelpers);

          data.page = 0;
          if(typeof Self.accountName != 'undefined' && Self.accountName != null){
            data.accountName = Self.accountName;
            data.currencyName = Self.currencyName;
            var account = Self.collection.get('accounts~' + Self.accountName + '~' + Self.currencyName);
            if(typeof account != 'undefined' && account != null){
              data.balance = account.get('balance');
              data.volume = account.get('volume');
              //if there is more than a page of data
              if(data.accounts.length > 4){
                for(var i = 0; i < data.accounts.length; i++){
                  if(data.accounts[i].accountName == data.accountName && data.accounts[i].currencyName == data.currencyName){
                    console.log('account found at ' + i + ' in total number of results of :', (data.accounts.length + 1));
                    data.page = Math.ceil((i + 1) / 5) - 1;
                  }
                }
              }
            }
          }
          if(typeof data.balance == 'undefined'){
            data.balance = '0.00';
          }
          if(typeof data.volume == 'undefined'){
            data.volume = '0.00';
          }

          console.log('Process Journal Entry data:', data);
          //console.log('Self.template(data)', Self.template(data))
          //console.log('Self.$el',Self.$el)
          //$('#pageContainer').html(Self.template(data));
          Self.$el.html(Self.template(data));

          //set the tradding name button.
          if(typeof data.accountName != 'undefined' && data.accountName != null){
            var account = Self.collection.get('accounts~' + data.accountName + '~' + data.currencyName);
            if(typeof account != 'undefined'){
              var isSteward = false;
              account.get('stewards').forEach(function(steward){
                if(steward == Self.steward.get('id')){
                  isSteward = true;
                }
              })
              if(isSteward){
                Self.tradingNameButton(data.accountName, data.currencyName);
              } else {
                Self.$('#toAccountName').val(data.accountName);
                var fromAccountName = '';
                var currencyAccounts = Self.collection.getByCurrency(data.currencyName.substr(0,data.currencyName.indexOf('.')), data.currencyName.substr(data.currencyName.indexOf('.') + 1, data.currencyName.length));
                console.log('currencyAccounts', currencyAccounts);
                currencyAccounts.forEach(function(account){
                  var isAccountSteward = false;
                  account.get('stewards').forEach(function(steward){
                    if(steward == Self.steward.get('id')){
                      isAccountSteward = true;
                    }
                  })
                  if(isAccountSteward){
                    fromAccountName = account.get('account') + '.' + account.get('account_namespace');
                  }
                })
                Self.tradingNameButton(fromAccountName, data.currencyName);
              }
            } else {
              Self.tradingNameButton('','');
            }
          } else {
            Self.tradingNameButton('','');
          }

          Self.initializeButtons();

          var table = Self.$('[data-sort=table]').DataTable({
            "paging": true,
            "info": false,
            "sDom": '<"top"i>rt<"bottom"p><"clear">',
            "lengthMenu": [[5, 10, 15, -1], [5, 10, 15, "All"]]
          });

          table.on( 'page.dt', function () {
              // var info = table.page.info();
              console.log( 'onpage handler called' );
              if(typeof data.accountName != 'undefined' && data.accountName != null){
                Self.tradingNameButton(data.accountName, data.currencyName);
              }

          });

          console.log('set data.page to ', data.page)
          if(data.page > 0){
            table.page( data.page ).draw( 'page' );
          }



          this.$('.numberpad-button').off('click').on('click', function(event){
            event.preventDefault();
            var number = this.value;
            //console.log('button ' + number + ' pressed');
            //console.log('active input ' + Self.activeInput);
            if(Self.activeInput == 'amount') {
              var val = $('#amount').val();
              var position = val.length;
              if(!hasSoftKeyboard()){
                position = $('#' + Self.activeInput).getCursorPosition();
              }
              console.log('cursor position ' + position);
              val = val.slice(0, position) + number + val.slice(position);
              val = val.replace('.','');
              val = val.slice(0, val.length-2) + '.' + val.slice(val.length-2);
              if(val.substr(0,1) == '0'){
                if(val.substr(1,2)!='.'){
                  val = val.substr(1,val.length);
                  position = position - 1;
                }
              }
              if(hasSoftKeyboard()){
                $('#amount').val(val);
              } else {
                $('#amount').val(val).setCursorPosition(position+1);
                $('#amount').focus();
              }
            } else {
              //Active input is card
              //$('#card').val($('#card').val() + number).focus();
              var val = $('#card').val();
              var position = val.length;
              if(hasSoftKeyboard()){
                $('#card').val(val.slice(0, position) + number + val.slice(position));
              } else {
                position = $('#' + Self.activeInput).getCursorPosition();
                $('#card').val(val.slice(0, position) + number + val.slice(position)).setCursorPosition(position+1);
                $('#card').focus();
              }

            }
          });

          this.$('#del').off('click').on('click', function(event){
              event.preventDefault();
              //console.log('Delete button pressed');
              if(Self.activeInput == 'amount'){
                var val = $('#amount').val();
                var position = val.length;
                if(!hasSoftKeyboard()){
                  var position = $('#' + Self.activeInput).getCursorPosition()
                  //console.log('cursor position ' + position);
                }
                if(position > 0){
                  val = val.slice(0, position-1) + val.slice(position);
                  //remove dot
                  val = val.replace('.','');
                  //add dot
                  val = val.slice(0, val.length-2) + '.' + val.slice(val.length-2);
                  //add zero to begining if less than three characters
                  if(val.length == 3 || (val.substr(0,1) == '+' && val.length == 4 ) || (val.substr(0,1) == '-' && val.length == 4 )){
                    val = val.slice(0, val.length-3) + '0' + val.slice(val.length-3);
                  }
                  if(val.length > 4){
                    position--;
                  }
                  if(hasSoftKeyboard()){
                    $('#amount').val(val);
                  } else {
                    $('#amount').val(val).setCursorPosition(position);
                    $('#amount').focus();
                  }
                } else {
                  $('#amount').setCursorPosition(position).focus();
                }

              } else {
                var val = $('#card').val();
                var position = val.length;
                if(!hasSoftKeyboard()){
                  position = $('#card').getCursorPosition();
                }
                //console.log('cursor position ' + position);
                //Active input is card
                if(position > 0){
                  val = val.slice(0, position-1) + val.slice(position);
                  if(hasSoftKeyboard()){
                    $('#card').val(val).blur();
                  } else {
                    $('#card').val(val).setCursorPosition(position-1)
                    $('#card').focus();
                  }
                } else {
                  if(!hasSoftKeyboard()){
                    $('#card').setCursorPosition(position);
                    $('#card').focus();
                  }
                }
              }
          });

          this.$('#process').off('click').on('click', function(event){
              event.preventDefault();
              Self.processJournalEntry();
          });

          this.$('#card').off('click').on('click', function(event){
            event.preventDefault();
            console.log('clicked on card input');
            $('#card').addClass('card-highlight');
            Self.activeInput = 'card';
            if(hasSoftKeyboard()){
              $('#card').blur();
            } else {
              $('#card').focus();
            }
          })

          Self.$('#card').off('change').on('change', function(event){
            //check if card number exists in card database
            var val = Self.$('#card').val();
            var card = Self.collection.get('accounts~' + Self.steward.get('stewardname') + '~' + val);
            if(typeof card != 'undefined'){
              router.navigate('#stewards/' + Self.steward.get('stewardname') + '/transactions/' + val, true);
            }
          });

          this.$('#amount').off('click').on('click', function(event){
            event.preventDefault();
            console.log('clicked on amount input');
            $('#card').removeClass('card-highlight');
            Self.activeInput = 'amount';
            if(hasSoftKeyboard()){
              $('#amount').blur();
            } else {
              $('#amount').focus();
            }
          })

          this.$('#amount').keypress(function(event){
            event.preventDefault();
            console.log('which event :' + event.which);
            var number = 'undefined';
            if(event.which == 49){
              number = 1;
            } else if(event.which == 50){
              number = 2;
            } else if(event.which == 51){
              number = 3;
            } else if(event.which == 52){
              number = 4;
            } else if(event.which == 53){
              number = 5;
            } else if(event.which == 54){
              number = 6;
            } else if(event.which == 55){
              number = 7;
            } else if(event.which == 56){
              number = 8;
            } else if(event.which == 57){
              number = 9;
            } else if(event.which == 48){
              number = 0;
            } else if(event.which == 13){
              Self.processJournalEntry();
            }



            if(number != 'undefined'){
              console.log('number:' + number);
              console.log('active input ' + Self.activeInput);
              var position = $('#' + Self.activeInput).getCursorPosition()
              console.log('cursor position ' + position);
              if(Self.activeInput == 'amount') {
                var val = $('#amount').val();
                val = val.slice(0, position) + number + val.slice(position);
                val = val.replace('.','');
                val = val.slice(0, val.length-2) + '.' + val.slice(val.length-2);
                if(val.substr(0,1) == '0'){
                  if(val.substr(1,2)!='.'){
                    val = val.substr(1,val.length);
                    position = position - 1;
                  }
                }
                $('#amount').val(val).setCursorPosition(position+1);
                if(hasSoftKeyboard()){
                  $('#amount').blur();
                } else {
                  $('#amount').focus();
                }
              } else {
                //Active input is card
                $('#card').val($('#card').val().slice(0, position) + number + $('#card').val().slice(position)).setCursorPosition(position+1);
                if(hasSoftKeyboard()){
                  $('#card').blur();
                } else {
                  $('#card').focus();
                }
              }
            }

            if(event.which == '46'){
              console.log('Delete key pressed.');
              var position = $('#' + Self.activeInput).getCursorPosition()
              console.log('cursor position ' + position);
              if(Self.activeInput == 'amount'){
                var val = $('#amount').val();
                if(position < val.length){
                  var characterAt = val.substr(position, 1);
                  console.log('characterAt:' + characterAt);
                  var lastChar = position == val.length-1;
                  //remove character at position
                  val = val.slice(0, position) + val.slice(position+1);
                  //remove dot
                  val = val.replace('.','');
                  //add dot
                  val = val.slice(0, val.length-2) + '.' + val.slice(val.length-2);
                  //add zero to begining if less than three characters
                  if(val.length == 3 || (val.substr(0,1) == '+' && val.length == 4 ) || (val.substr(0,1) == '-' && val.length == 4 )){
                    val = val.slice(0, val.length-3) + '0' + val.slice(val.length-3);
                  }
                  //if it's the dot character increment the cursor position.
                  if(characterAt == '.' || (val.length == 4 && characterAt == '0') || lastChar){
                    position++;
                  }
                  $('#amount').val(val).setCursorPosition(position);
                } else {
                  $('#amount').setCursorPosition(position);
                }
                if(hasSoftKeyboard()){
                  $('#amount').blur();
                } else {
                  $('#amount').focus();
                }
              }
            }
          })

          this.$('#amount').keydown(function(e){
              if(e.keyCode == 8) {
                  e.preventDefault();
                  console.log('Backspace Key Pressed');
                  var position = $('#' + Self.activeInput).getCursorPosition()
                  console.log('cursor position ' + position);
                  if(Self.activeInput == 'amount'){
                    var val = $('#amount').val();
                    if(position > 0){
                      val = val.slice(0, position-1) + val.slice(position);
                      //remove dot
                      val = val.replace('.','');
                      //add dot
                      val = val.slice(0, val.length-2) + '.' + val.slice(val.length-2);
                      //add zero to begining if less than three characters
                      if(val.length == 3 || (val.substr(0,1) == '+' && val.length == 4 ) || (val.substr(0,1) == '-' && val.length == 4 )){
                        val = val.slice(0, val.length-3) + '0' + val.slice(val.length-3);
                      }
                      $('#amount').val(val).setCursorPosition(position);
                    } else {
                      $('#amount').setCursorPosition(position);
                    }
                    if(hasSoftKeyboard()){
                      $('#amount').blur();
                    } else {
                      $('#amount').focus();
                    }
                  }
              } else if(e.keyCode == 46){
                e.preventDefault();
                console.log('Delete key pressed.');
                var position = $('#' + Self.activeInput).getCursorPosition()
                console.log('cursor position ' + position);
                if(Self.activeInput == 'amount'){
                  var val = $('#amount').val();
                  if(position < val.length){
                    var characterAt = val.substr(position, 1);
                    console.log('characterAt:' + characterAt);
                    var lastChar = position == val.length-1;
                    //remove character at position
                    val = val.slice(0, position) + val.slice(position+1);
                    //remove dot
                    val = val.replace('.','');
                    //add dot
                    val = val.slice(0, val.length-2) + '.' + val.slice(val.length-2);
                    //add zero to begining if less than three characters
                    if(val.length == 3 || (val.substr(0,1) == '+' && val.length == 4 ) || (val.substr(0,1) == '-' && val.length == 4 )){
                      val = val.slice(0, val.length-3) + '0' + val.slice(val.length-3);
                    }
                    //if it's the dot character increment the cursor position.
                    if(characterAt == '.' || (val.length == 4 && characterAt == '0') || lastChar){
                      position++;
                    }

                    $('#amount').val(val).setCursorPosition(position);
                  } else {
                    $('#amount').setCursorPosition(position);
                  }
                  if(hasSoftKeyboard()){
                    $('#amount').blur();
                  } else {
                    $('#amount').focus();
                  }
                }
              } else {
                console.log(e.keyCode);
              }
          });

          setTimeout(function(){
            $('#amount').setCursorPosition($('#amount').val().length);
            if(hasSoftKeyboard()){
              $('#amount').blur();
            } else {
              $('#amount').focus();
            }
          },500);
        }
    },

    tradingNameButton: function(accountName, currencyName){
      console.log('tradingName toggle triggered for:', accountName, currencyName);
      Self.$('input[name=currencyName]').val(currencyName);
      Self.$('input[name=accountName]').val(accountName);
      var account = Self.collection.get('accounts~' + accountName + '~' + currencyName);
      //escape the dot characters in the selectors.
      accountName = accountName.replace(/\./g,'\\.');
      currencyName = currencyName.replace(/\./g,'\\.');
      Self.$('.value-buttons').hide();
      Self.$('.account-buttons').removeClass('highlight');
      //hide send/recieve buttons because recieve doesn't work
      //Self.$('#' + accountName + '\\:' + currencyName + '').show();
      Self.$('#' + accountName + '\\:' + currencyName + '\\:button').addClass('highlight');
      Self.$('#amount').setCursorPosition(Self.$('#amount').val().length);
      if(hasSoftKeyboard()){
        Self.$('#amount').blur();
      } else {
        Self.$('#amount').focus();
      }
      if(typeof account != 'undefined' && typeof account.get('balance') != 'undefined'){
        Self.$('#balance').html(account.get('balance').toFixed(2));
        Self.$('#volume').html(account.get('volume').toFixed(2));
      } else {
        Self.$('#balance').html('0.00');
        Self.$('#volume').html('0.00');
      }

    },

    processJournalEntry: function(){
      console.log('process journal entry event');
      var toAccountName = Self.$('#toAccountName').val();
      var description = Self.$('#description').val();
      var amount = Self.$('#amount').val();
      var accountName = Self.$('input[name=accountName]').val();
      var currencyName = Self.$('input[name=currencyName]').val();
      var polarity = Self.$('input[name=polarity]').val();

      //journal.set('polarity', polarity);

      var journal = new Journal();

      if(polarity == 'send'){
        if(toAccountName.indexOf('.') !== -1){
          journal.set('to_account', toAccountName.substr( 0, toAccountName.indexOf('.')));
          journal.set('to_account_namespace', toAccountName.substr(toAccountName.indexOf('.') + 1, toAccountName.length));
        } else {
          journal.set('to_account', toAccountName);
          journal.set('to_account_namespace', '');
        }
        if(accountName.indexOf('.') !== -1){
          journal.set('account', accountName.substr( 0, accountName.indexOf('.')));
          journal.set('namespace', accountName.substr( accountName.indexOf('.') + 1, accountName.length));
        } else {
          journal.set('account', accountName.substr( 0, accountName.indexOf('.')));
          journal.set('namespace', accountName.substr( accountName.indexOf('.') + 1, accountName.length));
        }
      } else {
        if(toAccountName.indexOf('.') !== -1){
          journal.set('account', toAccountName.substr( 0, toAccountName.indexOf('.')));
          journal.set('namespace', toAccountName.substr(toAccountName.indexOf('.') + 1, toAccountName.length));
        } else {
          journal.set('account', toAccountName);
          journal.set('namespace', '');
        }
        if(accountName.indexOf('.') !== -1){
          journal.set('to_account', accountName.substr( 0, accountName.indexOf('.')));
          journal.set('to_account_namespace', accountName.substr( accountName.indexOf('.') + 1, accountName.length));
        } else {
          journal.set('to_account', accountName.substr( 0, accountName.indexOf('.')));
          journal.set('to_account_namespace', accountName.substr( accountName.indexOf('.') + 1, accountName.length));
        }
      }

      if(currencyName.indexOf('.') !== -1){
        journal.set('currency', currencyName.substr( 0, currencyName.indexOf('.')));
        journal.set('currency_namespace', currencyName.substr( currencyName.indexOf('.') + 1, currencyName.length));
      } else {
        journal.set('currency', currencyName);
        journal.set('currency_namespace', '');
      }
      journal.set('amount', parseFloat(amount));
      journal.set('steward', Self.steward);
      journal.set('payload', { description: description} );

      journal.credentials = {};
      journal.credentials.token = Self.steward.get('access_token');

      journal.save({},{
        success: function(model, res){
          console.log('successfully saved journal', model, res);
          $('#success-notification').html('Successfully Processed Journal Entry.').show();
          setTimeout(function(){
            $('#success-notification').hide();
          },10000);
          Self.collection.fetch();
          Self.journals.fetch();
          //display receipt
          router.navigate('#/stewards/' + Self.steward.get('stewardname') + '/journals/' + accountName + '/' + currencyName + '/receipt/' + res.id.split('~')[4], true);
        },
        error: function(model, res){
          if(typeof res.responseJSON != 'undefined' && typeof res.responseJSON.message != 'undefined' ){
            console.info(res.responseJSON.message);
            $('#error-notification').html(res.responseJSON.message).show();
            setTimeout(function(){
              $('#error-notification').hide();
            },10000);
          } else {
            $('#error-notification').html('Error').show();
            setTimeout(function(){
              $('#error-notification').hide();
            },10000);
          }
          console.log('failed to saved journal', model, res);
        }
      });
    },

    initializeButtons: function(){
      Self.$('.account-buttons').off('click').on('click', function(event){
        event.preventDefault();
        var accountName = this.id.split(':')[0];
        var currencyName = this.id.split(':')[1];
        console.log('Account button pressed: ', accountName, currencyName);
        //Self.tradingNameButton(accountName, currencyName);
        router.navigate('stewards/' + Self.steward.get('stewardname') + '/journals/' + accountName + '/' + currencyName);
      });

      Self.$('.send-value').off('click').on('click', function(event){
        event.preventDefault();
        Self.$('#sign').val('+');
        Self.$('#amount').addClass('plus');
        Self.$('#amount').removeClass('minus');
        Self.$('#plus-icon').show();
        Self.$('#minus-icon').hide();
        Self.$('.send-value').addClass('send-value-selected');
        Self.$('.receive-value').removeClass('receive-value-selected');
        Self.$('#amount').setCursorPosition($('#amount').val().length);
        if(hasSoftKeyboard()){
          Self.$('#amount').blur();
        } else {
          Self.$('#amount').focus();
        }
        Self.$('input[name=polarity]').val('send');
      });

      Self.$('.receive-value').off('click').on('click', function(event){
        event.preventDefault();
        Self.$('#sign').val('-');
        Self.$('#amount').addClass('minus');
        Self.$('#amount').removeClass('plus');
        Self.$('#plus-icon').hide();
        Self.$('#minus-icon').show();
        Self.$('.send-value').removeClass('send-value-selected');
        Self.$('.receive-value').addClass('receive-value-selected');
        Self.$('#amount').setCursorPosition(Self.$('#amount').val().length);
        if(hasSoftKeyboard()){
          Self.$('#amount').blur();
        } else {
          Self.$('#amount').focus();
        }
        Self.$('input[name=polarity]').val('receive');
      });
    }
});
