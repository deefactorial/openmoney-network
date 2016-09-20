'use strict';

var _ = require('underscore');
var Backbone = require('backbone');
var Common = require('../common');

module.exports = Backbone.Model.extend({

    sync: function(method, model, options) {
      options = options || {};
      if(method.toLowerCase() == 'create'){
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('account_namespace') + '/accounts';
      } else if(method.toLowerCase() == 'update'){
        //use the id attribute for update because the id has not been modified.
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('account_namespace') + '/accounts/' + model.get('account');
      } else {
        options.url = '/V2/stewards/' + model.get('steward').get('stewardname') + '/namespaces/' + model.get('account_namespace') + '/accounts/' + model.get('account');
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
