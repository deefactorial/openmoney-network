
'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var Router = require('./routers/router');
var Marionette = require('backbone.marionette');

//require('./test/app'); //for testing
var PouchDB = require('pouchdb');
var db = PouchDB('openmoney');
var Self;

global.app = new Marionette.Application({
  onBeforeStart: function(options){
    console.log('Marionette Application onBeforeStart', options);
  },
  initialize: function(options){
    console.log('Marionette Application Initialize', options);
    Self = this;
  },
  onStart: function(options){
    console.log('Marionette Application onStart', options);
    if(typeof options.steward != 'undefined'){
      Self.steward = options.steward;
    }
    global.router = new Router(options);
    Backbone.history.start();
    console.log('Marionette Framework Started');
  }
});

app.addRegions({
  mainContainer: '#mainContainer',
  navigation: '#navigation',
  dashhead: '#dashhead',
  pageContainer: '#pageContainer'
});

var loadInitialData = function(){

  return db.get('config~credentials', function(error, config){
    console.log('config~credentials', error, config);
    var steward = new Steward();
    if(!error){
      steward.set('_id', 'stewards~' + config.username);
      steward.set('stewardname', config.username);
      steward.set('password', config.password);
      steward.fetch({
        success: function(model, res){
          console.log('successfully got steward', model);
        },
        error: function(err){
          console.log('could not get stewards', err);
        }
      });
    }
    app.start({steward: steward});
  });

};

// Load some initial data, and then start our application
loadInitialData();

module.exports = global.app;

console.info('Application Initialized');
