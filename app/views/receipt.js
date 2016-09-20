'use strict';

var $ = require('jquery');
var _ = require('underscore');
// require('../../node_modules/sidr/dist/jquery.sidr.min.js');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
Backbone.$ = $;
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var ViewHelpers = require('../helpers/handlebarHelpers');
var ViewHelpers = ViewHelpers(Handlebars)
var Common = require('../common');
var Self = {};
module.exports = Marionette.LayoutView.extend({

  template: Templates['receipt'],

  initialize: function (options) {
    console.log("initialize receipt view", options);
    Self = this;
    //collection is accounts
    Self.steward = options.steward;
    Self.journals = options.journals;
    Self.accountName = options.accountName;
    Self.currencyName = options.currencyName;
    Self.created = options.created;
    Self.listenTo(Self.collection, 'sync reset', Self.render);
    Self.listenTo(Self.journals, 'sync reset', Self.render);
  },

  render: function(){
    console.log("render receipt view", Self.accountName, Self.currencyName, Self.created);
    var data = {};
    data.steward = Self.steward.toJSON();
    _.extend(data.steward, ViewHelpers);
    data.account = Self.collection.get('accounts~' + Self.accountName + '~' + Self.currencyName);
    if(typeof data.account != 'undefined'){
      data.journal = Self.journals.getByAccountAndCreated(data.account, Self.created);
      if(data.journal.length >= 1){
        data.journal = data.journal[0];
        data.journal = data.journal.toJSON();
        data.journal.charge = (data.journal.from_account == data.account.get('account') && data.journal.from_account_namespace == data.account.get('account_namespace')) ? 'CREDIT' : 'DEBIT';
        _.extend(data.journal, ViewHelpers);
      }
      data.account.toJSON();
    }

    _.extend(data, ViewHelpers);
    console.log('receipt data', data);
    Self.$el.html(Self.template(data));

    Self.$('button[name=done]').off('click').on('click', Self.done);
    Self.$('button[name=void]').off('click').on('click', Self.void);
    Self.$('button[name=email]').off('click').on('click', Self.email);
    Self.$('button[name=print]').off('click').on('click', Self.print);
  },
  done: function(event){
    event.preventDefault();
    console.log('Done event triggered');
    router.navigate('#stewards/' + Self.steward.get('stewardname') + '/journals/' + Self.accountName + '/' + Self.currencyName, true);
  },
  void: function(event){
    event.preventDefault();
    console.log('void event triggered');
    //post a reverse of the transaction with a void:reference to the timestamp of the previous transaction
    //display voided transactions with a strike through line.
  },
  email: function(event){
    event.preventDefault();
    console.log('Email event triggered');
    //get Namespace's email send a pdf copy of receipt
  },
  print: function(event){
    event.preventDefault();
    console.log('Print event triggered');
    //render pdf copy of receipt and
    window.print();
  }

});
