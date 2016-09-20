'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Common = require('../common');
var BackbonePouch = require('backbone-pouch');
var PouchDB = require('pouchdb');

module.exports = Backbone.Model.extend({
  sync: BackbonePouch.sync({
    db: new PouchDB('openmoney')
  }),

  idAttribute: '_id',

  initialize: function(object) {
    console.info("initialize page model", object);
    if(typeof object != 'undefined'){
      for (var key in object) {
        if (object.hasOwnProperty(key)) {
          this.set(key, object[key]);
        }
      }
    }
  }
});
