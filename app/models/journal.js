'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Common = require('../common');

module.exports = Backbone.Model.extend({

    sync: function(method, model, options) {
      console.log('journal sync function', method, model, options);
      options = options || {};
      //options.url = model.methodToURL[method.toLowerCase()];
      options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('namespace') + '/accounts/' + model.get('account') + '/journals';
      if(method.toLowerCase() == 'create'){
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('namespace') + '/accounts/' + model.get('account') + '/journals/' + model.get('currency') + '?currency_namespace=' + model.get('currency_namespace');
      }

      return Backbone.sync.apply(this, arguments);
    },

    idAttribute: '_id',

    initialize: function(object) {
      console.info("initialize journal model", object);
      if(typeof object != 'undefined'){
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            this.set(key, object[key]);
          }
        }
      }
    }
});
