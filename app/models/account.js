'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Common = require('../common');

module.exports = Backbone.Model.extend({

    sync: function(method, model, options) {
      options = options || {};
      console.log('account sync:', method, model, options)
      if(method.toLowerCase() == 'create'){
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('account_namespace') + '/accounts';
      } else if(method.toLowerCase() == 'read'){
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('account_namespace') + '/accounts/' + model.get('account') + '?currency=' + model.get('currency') + '&currency_namespace=' + model.get('currency_namespace');
      } else {
        //use the id attribute for update because the id has not been modified.
        var accountName = model.get('id').split('~')[1];
        var account = accountName.substr(0 ,accountName.indexOf('.'));
        var account_namespace = accountName.substr(accountName.indexOf('.') + 1, accountName.length);
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + account_namespace + '/accounts/' + account;
      }
      return Backbone.sync.apply(this, arguments);
    },

    idAttribute: 'id',

    initialize: function(object) {
      console.info("initialize account model", object);
      if(typeof object != 'undefined'){
        for (var key in object) {
          if (object.hasOwnProperty(key)) {
            this.set(key, object[key]);
          }
        }
      }
    }
});
