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
var NamespaceView = require('../views/namespace');
var Namespace = require('../models/namespace');
//var Router = require('../routers/router');
var Self = {};

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

module.exports = Marionette.CollectionView.extend({

    template: Templates['namespaces'],

    //el: '#namespacesView',

    initialize: function (options) {
        console.log("initialize namespaces view", options);
        Self = this;


        Self.steward = options.steward;
        Self.stewards = options.stewards;

        //Self.render();
        Self.listenTo(Self.stewards, 'sync add remove reset', Self.render);
        Self.listenTo(Self.collection, 'sync add remove reset', Self.render);
        //console.log(Self.collection);
    },

    setCollection: function(collection){
      this.collection = collection;
    },

    state : 'undefined',

    activeInput : 'amount',

    collectionEvents: {
      'change': 'render'
    },

    render: function(){
        console.log("render namespaces view");

        var Self = this;
        var data = {};
        if(typeof Self.collection != 'undefined'){
          data = { collection : Self.collection.toJSON() };
          for(var i = 0; i < data.collection.length; i++){
            for(var j = 0; j < data.collection[i].stewards.length; j++){
              data.collection[i].stewards[j] = Self.stewards.get(data.collection[i].stewards[j]);
              if(typeof data.collection[i].stewards[j] != 'undefined'){
                data.collection[i].stewards[j] = data.collection[i].stewards[j].toJSON();
              }
            }
          }
        }
        console.log('namespaces view data:', data);
        Self.$el.html(Self.template(data));

        this.$('[data-sort=table]').DataTable();

        this.$('[data-sort=table] > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log(id);
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/' + id);
        })

        Self.$('button[name=newNamespace]').off('click').on('click', function(event){
          event.preventDefault();
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/new');
        })

        Self.$('button[name=addNamespace]').off('click').on('click', function(event){
          event.preventDefault();
          router.navigate('stewards/' + Self.steward.get('stewardname') + '/namespaces/add');
        })
    }
});
