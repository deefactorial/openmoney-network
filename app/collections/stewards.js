'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
// var BackbonePouch = require('backbone-pouch');
// var PouchDB = require('pouchdb');
var Steward = require('../models/steward');
var Self;

module.exports = Backbone.Collection.extend({
    model: Steward,
    // sync: BackbonePouch.sync({
    //   db: new PouchDB('openmoney'),
    //   fetch: 'query',
    //   options: {
    //     query: {
    //       include_docs: true,
    //       fun: {
    //         map: function(doc, emit) {
    //           if (doc.type === 'stewards~') {
    //             emit(doc._id, null)
    //           }
    //         }
    //       },
    //       limit: 10
    //     },
    //     changes: {
    //       include_docs: true,
    //       filter: function(doc) {
    //         return doc._deleted || doc.type === 'stewards~';
    //       }
    //     }
    //   }
    // }),
    // parse: function(result) {
    //   return _.pluck(result.rows, 'doc');
    // },
    // findByStewardId: function(id, callback){
    //   var steward = this.get(id);
    //   if(typeof steward != 'undefined'){
    //     callback(null, steward);
    //   } else {
    //     callback('steward not found');
    //   }
    // }
    url: function() {
      return '/V2/stewards';
    },
    initialize: function(models, options) {
      Self = this;
    },

});
