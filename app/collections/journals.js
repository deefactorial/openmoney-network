'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Journal = require('../models/journal');
var Self;
var NodeRSA = require('node-rsa');
var crypto = require('crypto');

function encrypt(text, algorithm, password, iv) {
    var cipher = crypto.createCipheriv(algorithm, password, iv);
    var encrypted = cipher.update(JSON.stringify(text), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    var tag = cipher.getAuthTag();
    return {
        content: encrypted,
        tag: tag
    };
}

function decrypt(encrypted, algorithm, password, iv) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv);
    decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(encrypted.content, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return JSON.parse(dec);
}


module.exports = Backbone.Collection.extend({
  model: Journal,
  url: function() {
    return '/V2/stewards/' + Self.steward.get('stewardname') + '/journals';
  },
  initialize: function(models, options) {
    Self = this;
    if(typeof options != 'undefined' && typeof options.steward != 'undefined'){
      Self.steward = options.steward;
    }
  },
  getByDateRange: function(startDate, endDate){
    return Self.models.filter(function(model) {
      return (
        new Date(model.get('created')) > startDate &&
        new Date(model.get('created')) <= endDate
      )
    });
  },
  getCurrencyByDateRange: function(currency, startDate, endDate){
    return Self.models.filter(function(model) {
      return (
        new Date(model.get('created')) > startDate &&
        new Date(model.get('created')) <= endDate &&
        model.get('currency') == currency
      )
    });
  },
  getCurrencyByStartDate: function(currency, startDate){
    return Self.models.filter(function(model) {
      return (
        new Date(model.get('created')) > startDate &&
        model.get('currency') == currency
      )
    });
  },
  getCurrencyByEndDate: function(currency, endDate){
    return Self.models.filter(function(model) {
      return (
        new Date(model.get('created')) <= endDate &&
        model.get('currency') == currency
      )
    });
  },
  getByCurrency: function(currency, currency_namespace){
    return Self.models.filter(function(model) {
      return (
        model.get('currency') == currency &&
        model.get('currency_namespace') == currency_namespace
      )
    })
  },
  getByAccount: function(accountModel){
    return Self.models.filter(function(model) {
      return (
        (accountModel.get('account') == model.get('from_account') && accountModel.get('account_namespace') == model.get('from_account_namespace')) && ( accountModel.get('currency') == model.get('currency') && accountModel.get('currency_namespace') == model.get('currency_namespace')) ||
        (accountModel.get('account') == model.get('to_account') && accountModel.get('account_namespace') == model.get('to_account_namespace')) && ( accountModel.get('currency') == model.get('currency') && accountModel.get('currency_namespace') == model.get('currency_namespace'))
      )
    })
  },
  getByAccountAndCreated: function(accountModel, created){
    return Self.models.filter(function(model) {
      return (
        (accountModel.get('account') == model.get('from_account') && accountModel.get('account_namespace') == model.get('from_account_namespace') && created == model.get('created') )||
        (accountModel.get('account') == model.get('to_account') && accountModel.get('account_namespace') == model.get('to_account_namespace') && created == model.get('created'))
      )
    })
  },
  parse: function(response){
    console.log('journals collection parse method', response);
    console.log('steward', Self.steward);
    var resultsArray = [];
    if(typeof Self.steward.get('privateKey') != 'undefined'){
      var key = new NodeRSA();
      key.importKey(Self.steward.get('privateKey'));
      response.forEach(function(journalEntry){
        var symetricKey = key.decrypt(journalEntry.publicKeyEncryptedSymetricKey, 'utf8');
        journalEntry.encryptedJournal.tag = new Buffer(journalEntry.encryptedJournal.tag.data);
        var journal = decrypt(journalEntry.encryptedJournal, journalEntry.algorithm, symetricKey, journalEntry.initializationVector);
        resultsArray.push(journal);
      });
    }
    console.log('journal results: ', resultsArray);
    return resultsArray;
  },
  comparator: function(model){
    return model.get('created');
  },
});
