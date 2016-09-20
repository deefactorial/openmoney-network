'use strict';

var jQuery = require('jquery');
var $ = jQuery;
var _ = require('underscore');
// require('tablesorter');
// require('tablesorterPager');
require('datatables');
//require('jquery.browser');
require('toolkit');
// require('../../node_modules/sidr/dist/jquery.sidr.min.js');
var Backbone = require('backbone');
var Marionette = require('backbone.marionette');
Backbone.$ = $;
var Handlebars = require('handlebars');
var Templates = require('../templates/compiledTemplates')(Handlebars);
var Common = require('../common');
var Self = {};

module.exports = Marionette.CollectionView.extend({

    template: Templates['stewards'],

    initialize: function (options) {
        console.log("initialize stewards view", options);
        Self = this;


        Self.steward = options.steward;
        Self.stewards = options.stewards;

        Self.listenTo(Self.collection, 'sync add remove reset', Self.render);
    },

    setCollection: function(collection){
      this.collection = collection;
    },

    collectionEvents: {
      'change': 'render'
    },

    render: function(){
        console.log("render stewards view");

        var Self = this;
        var data = { collection : Self.collection.toJSON() };
        // for(var i = 0; i < data.collection.length; i++){
        //   for(var j = 0; j < data.collection[i].stewards.length; j++){
        //     data.collection[i].stewards[j] = Self.stewards.get(data.collection[i].stewards[j]);
        //     if(typeof data.collection[i].stewards[j] != 'undefined'){
        //       data.collection[i].stewards[j] = data.collection[i].stewards[j].toJSON();
        //     }
        //   }
        // }
        console.log('stewards view data:', data);
        Self.$el.html(Self.template(data));

        this.$('[data-sort=table]').DataTable();

        this.$('[data-sort=table] > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log(id);
          router.navigate('stewards/' + id);
        })

        this.$('button[name=newNamespace]').off('click').on('click', function(event){
          event.preventDefault();
          router.navigate('stewards/new');
        })
    }
});
