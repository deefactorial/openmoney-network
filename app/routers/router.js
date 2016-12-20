
'use strict';
var $ = require('jquery');
var _ = require('underscore');
//$.mobile = require('jquery-mobile');
var Backbone = require('backbone');
Backbone.$ = $;
require('backbone.basicauth');
var oauth = require('../helpers/oauth');
// var BackboneRouteControl = require('backbone-route-control');
var Marionette = require('backbone.marionette');
var PouchDB = require('pouchdb');
require('fruitdown');
var db = new PouchDB('openmoney');
if (!db.adapter) { // websql not supported by this browser
  console.log('failed to load default websql or indexdb');
  db = new PouchDB('openmoney', {adapter: 'fruitdown'});
}
var Common = require('../common');
var async = require('async');


//set the viewport scale
//http://stackoverflow.com/questions/11592015/support-for-target-densitydpi-is-removed-from-webkit
var viewPortScale = 1 / window.devicePixelRatio;
console.log("set viewport scale:" + viewPortScale);
//$('#viewport').attr('content', 'user-scalable=no, initial-scale='+viewPortScale+', width=device-width, height=device-height');

//Views
 var WelcomeView = require('../views/welcome');
 var LoginView = require('../views/login');
 var RegisterView = require('../views/register');
 var ForgotView = require('../views/forgot');
 var NamespacesView = require('../views/namespaces');
 var NamespaceView = require('../views/namespace');
 var JournalsView = require('../views/journals');
 var ReportsView = require('../views/reports');
 var ReportView = require('../views/report');
 var LayoutView = require('../views/layout');
 var NavigationView = require('../views/navigation');
 var DashheadView = require('../views/dashhead');
 var AccountView = require('../views/account');
 var AccountsView = require('../views/accounts');
 var BreadcrumbsView = require('../views/breadcrumbs');
 var ReceiptView = require('../views/receipt');
 var ResetView = require('../views/reset');
 var CurrencyView = require('../views/currency');
 var CurrenciesView = require('../views/currencies');
 var StewardsView = require('../views/stewards');
 var StewardView = require('../views/steward');
 var SettingsView = require('../views/settings');

//models
var Steward = require('../models/steward');
var Namespace = require('../models/namespace');
var Page = require('../models/page');
var Account = require('../models/account');
var Currency = require('../models/currency');

//collections
var Namespaces = require('../collections/namespaces');
var Stewards = require('../collections/stewards');
var Accounts = require('../collections/accounts');
var Journals = require('../collections/journals');
var Breadcrumbs = require('../collections/breadcrumbs');
var Currencies = require('../collections/currencies');

var Self = {};
var CurrentRoute = null;
var CurrentRouteOptions = null;
var CurrentView = null;

module.exports = Marionette.AppRouter.extend({
  routeParams: {},

  initialize: function(options){
    console.log('initialize router', options);

    // Add a public method so that anything else can also create the header
    Backbone.BasicAuth = {
      getHeader: function(credentials) {
        console.log('in Backbone.BasicAuth.getHeader(credentials) function:', credentials);
        if(typeof credentials.token != 'undefined'){
          return {
            'Authorization': 'Bearer ' + credentials.token
          };
        }
      }
    };

    Self = this;

    Self.page = new Page();
    Self.layout = new LayoutView();
    app.getRegion('mainContainer').show(Self.layout);

    Self.initializeData(function(err, data){
      console.log('initializeData', err, data);
      if(typeof Self.steward.get('theme') != 'undefined' && Self.steward.get('theme') == 'dark'){
        Self.darkTheme();
      }
      Self.layout.getRegion('navigation').show(new NavigationView({model: Self.page, steward: Self.steward}));
      Self.dashhead = new DashheadView({model: Self.page, steward: Self.steward});
      Self.layout.getRegion('dashhead').show(Self.dashhead);
    });
  },

	routes: {
		'':'welcome',
		'login':'login',
    'logout':'logout',
		'signup':'register',
		'forgot':'forgot',
    'stewards/:stewardname/reset/:forgot_token':'reset',
    'stewards':'stewards',
    'settings':'settings',
    'stewards/:stewardname':'stewardRoute',
    'stewards/:stewardname/accounts': 'accounts',
    'stewards/:stewardname/accounts/:accountName/:currencyName': 'account',
    'stewards/:stewardname/currencies': 'currencies',
    'stewards/:stewardname/currencies/:currencyName': 'currency',
		'stewards/:stewardname/namespaces':'namespaces',
    'stewards/:stewardname/namespaces/:namespace':'namespace',
    'stewards/:stewardname/namespaces/:namespace/accounts/:accountName/:currencyName': 'account',
    'stewards/:stewardname/namespaces/:namespace/currencies/:currencyName': 'currency',
		'stewards/:stewardname/journals':'journals',
    'stewards/:stewardname/journals/:accountName/:currencyName':'journals',
    'stewards/:stewardname/journals/:accountName/:currencyName/receipt/:created':'receipt',
		'stewards/:stewardname/reports':'reports',
    'stewards/:stewardname/reports/:currency':'report',
    'stewards/:stewardname/loginSuccess':'loginSuccess',
    '*notFound':'welcome'
	},

  lightTheme: function(){
    $('.darktheme').prop('disabled', true);
    $('.lighttheme').prop('disabled', false);
    $('body').css('background-color', '#ffffff');
  },

  darkTheme: function(){
    $('.lighttheme').prop('disabled', true);
    $('.darktheme').prop('disabled', false);
    $('body').css('background-color', '#202020');
  },
  /*
  *Override navigate function
  *@param {String} route The route hash
  *@param {PlainObject} options The Options for navigate functions.
  *              You can send a extra property "params" to pass your parameter as following:
  *              {
  *               params: 'data'
  *              }
  **/
  navigate: function(route, options) {
     CurrentRoute = route;
     CurrentRouteOptions = options;
     console.log('CurrentRoute', CurrentRoute);
     var routeOption = {
             trigger: true
         },
         params = (options && options.params) ? options.params : null;
     $.extend(routeOption, options);
     delete routeOption.params;

     //set the params for the route
     this.param(route, params);
     Marionette.AppRouter.prototype.navigate(route, routeOption);
  },

 /*
  *Get or set parameters for a route fragment
  *@param {String} fragment Exact route hash. for example:
  *                   If you have route for 'profile/:id', then to get set param
  *                   you need to send the fragment 'profile/1' or 'profile/2'
  *@param {Any Type} params The parameter you to set for the route
  *@return param value for that parameter.
  **/
  param: function(fragment, params) {
     var matchedRoute;
     _.any(Backbone.history.handlers, function(handler) {
         if (handler.route.test(fragment)) {
             matchedRoute = handler.route;
         }
     });
     if (params !== undefined) {
         this.routeParams[matchedRoute] = params;
     }
     //CurrentRoute = fragment;

     return this.routeParams[matchedRoute];
  },

 /*
  * Called when hash changes to home route
  **/
  // onHomeRoute: function() {
  //    console.log("param =", this.param("home"));
  // }

	welcome: function() {
		console.info('Goto: WelcomeView');
    Self.initializeData(function(err, data){
      if(Self.steward.get('stewardname') == ''){
        Self.page.set('currentPage', 'welcome');
        Self.changePage(new WelcomeView(),{changeHash:false, transition: "none"});
      } else {
        Self.navigate('stewards/' + Self.steward.get('stewardname') + '/journals', true);
      }
    });
	},
	login: function() {
		console.log('Goto: LoginView');
    Self.initializeData(function(err, data){
      if(Self.steward.get('stewardname') == ''){
        Self.page.set('currentPage', 'login');
        Self.changePage(new LoginView( { steward: Self.steward } ), {changeHash:false, transition: "none"});
      } else {
        Self.navigate('stewards/' + Self.steward.get('stewardname') + '/journals', true);
      }
    })
	},
  loginSuccess: function(){
    console.log('Goto: LoginSuccessView');
    Self.initializeData(function(err, data){
      console.log('initializeData', err, data);
      // Self.layout.getRegion('navigation').show(new NavigationView({model: Self.page, steward: Self.steward}));
      // Self.dashhead = new DashheadView({model: Self.page, steward: Self.steward});
      // Self.layout.getRegion('dashhead').show(Self.dashhead);
      Self.navigate('stewards/' + Self.steward.get('stewardname') + '/journals',{trigger:true, replace:true})
    });
  },
  logout: function() {
    console.log('Goto: LogoutView');
    db.allDocs({}).then(function(docs){
      console.log("allDocs", docs);

      var parallel = {};
      //delete all docs
      if(typeof docs.rows != 'undefined'){
        for(var i = 0; i < docs.rows.length; i++){
          console.log('doc:',docs.rows[i]);
          var doc = docs.rows[i];
          console.log('id', doc.id);
          console.log('rev', doc.value.rev);
          parallel[i] = function(callback){
            db.remove(doc.id, doc.value.rev).then(function(results){
              console.log(results);
              callback(null, results);
            }).catch(function(error){
              console.log(error);
              callback(error);
            });
          };
        }
      }

      async.parallel(parallel, function(err, res){
        if(err){
          console.log(err);
        } else {
          console.log(res);
          db.compact().then(function(result){
            console.log('destoryed local db!');
            console.log('Self.steward', Self.steward.toJSON());
            oauth.invalidateCache(Self.steward.get('stewardname'));
            console.log('delete local memory');
            if(typeof Self.steward != 'undefined'){
              delete Self.steward;
            }
            if(typeof Self.accountsCollection != 'undefined'){
              delete Self.accountsCollection;
            }
            if(typeof Self.namespacesCollection != 'undefined'){
              delete Self.namespacesCollection;
            }
            if(typeof Self.currenciesCollection != 'undefined'){
              delete Self.currenciesCollection;
            }
            if(typeof Self.journalsCollection != 'undefined'){
              delete Self.journalsCollection;
            }
            if(typeof Self.stewardsCollection != 'undefined'){
              delete Self.stewardsCollection;
            }
            Self.lightTheme();
            Self.page = new Page();
            Self.layout = new LayoutView();
            app.getRegion('mainContainer').show(Self.layout);
            Self.initializeData(function(err, data){
              console.log('initializeData', err, data);
              Self.layout.getRegion('navigation').show(new NavigationView({model: Self.page, steward: Self.steward}));
              Self.dashhead = new DashheadView({model: Self.page, steward: Self.steward});
              Self.layout.getRegion('dashhead').show(Self.dashhead);
            });
            Self.navigate('#login');
          }).catch(function(err){
            console.log(err);
            Self.navigate('#login');
          })
        }
      })
    }).catch(function(error){
      console.log("allDocs error: ", error);
      Self.navigate('#login');
    });
  },
  register: function() {
		console.log('Goto: RegisterView');
		Self.initializeData(function(err, data){
      if(Self.steward.get('stewardname') == ''){
        Self.page.set('currentPage', 'register');
        Self.changePage(new RegisterView( { steward: Self.steward } ), {changeHash:false, transition: "none"});
      } else {
        Self.navigate('stewards/' + Self.steward.get('stewardname') + '/journals', true);
      }
    })
	},
	forgot: function() {
		console.log('Goto: ForgotView');
    Self.initializeData(function(err, data){
      if(Self.steward.get('stewardname') == ''){
        Self.page.set('currentPage', 'forgot');
        Self.changePage(new ForgotView( { steward: Self.steward } ), {changeHash:false, transition: "none"});
      } else {
        Self.navigate('stewards/' + Self.steward.get('stewardname') + '/journals', true);
      }
    })
	},
  reset: function(stewardname, forgot_token) {
		console.log('Goto: ResetView', stewardname, forgot_token);
    Self.initializeData(function(err, data){
      if(Self.steward.get('stewardname') == ''){
        Self.page.set('currentPage', 'reset');
        Self.changePage(new ResetView( { steward: Self.steward, stewardname: stewardname, forgot_token: forgot_token } ), {changeHash:false, transition: "none"});
      } else {
        Self.navigate('stewards/' + Self.steward.get('stewardname') + '/journals', true);
      }
    })
	},
	journals: function(stewardname, accountName, currencyName) {
		console.log('Goto: JournalsView', stewardname, accountName, currencyName);
    Self.initializeData(function(err, res){
      Self.page.set('currentPage', 'journals');
      Self.page.set('title', 'Process Payment');
      var account = Self.accountsCollection.get('accounts~' + accountName + '~' + currencyName);
      console.log('account', account);
      if(typeof account != 'undefined'){
        var breadcrumbs = [{linkText: 'Process Payment'},
                        {active: true, linkText: accountName + ' ' + currencyName}];
      } else {
        var breadcrumbs = [{linkText: 'Process Payment'},
                        {active: true, linkText: 'From Account'}];
      }
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      var breadcrumbRegion = Self.dashhead.getRegion('breadcrumbs');
      if(typeof breadcrumbRegion != 'undefined'){
        breadcrumbRegion.reset();
        breadcrumbRegion.show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      }
      Self.changePage(new JournalsView( { steward: Self.steward, collection: Self.accountsCollection, journals: Self.journalsCollection, accountName: accountName, currencyName: currencyName} ), {changeHash:false, transition: "none"});
    })
	},
  receipt: function(stewardname, accountName, currencyName, created) {
    console.log('Goto: RecepitView', stewardname, accountName, currencyName, created);
    Self.initializeData(function(err, res){
      Self.page.set('currentPage', 'transactions');
      Self.page.set('title', 'Transaction Receipt');
      var account = Self.accountsCollection.get('accounts~' + accountName + '~' + currencyName);
      console.log('account', account);
      var breadcrumbs = [{link: '#stewards/' + Self.steward.get('stewardname') + '/journals', linkText: 'Create Journal'},
                        {link: '#stewards/' + Self.steward.get('stewardname') + '/journals/' + accountName + '/' + currencyName, linkText: accountName + ' ' + currencyName},
                        {active: true, linkText: 'Journal Receipt'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      var breadcrumbRegion = Self.dashhead.getRegion('breadcrumbs');
      if(typeof breadcrumbRegion != 'undefined'){
        breadcrumbRegion.reset();
        breadcrumbRegion.show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      }
      Self.changePage(new ReceiptView( { steward: Self.steward, collection: Self.accountsCollection, journals: Self.journalsCollection, accountName: accountName, currencyName: currencyName, created: created} ), {changeHash:false, transition: "none"});
    })
  },
	reports: function(stewardname) {
		console.log('Goto: ReportsView');
    Self.page.set('currentPage', 'reports');
    Self.page.set('title', 'Reports');
    Self.initializeData(function(err, res){
      var breadcrumbs = [{active:true, linkText: 'Reports'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
  		Self.changePage(new ReportsView( { steward: Self.steward, collection: Self.journals, currencies: Self.currenciesCollection} ), {changeHash:false, transition: "none"});
    });
	},
  report: function(stewardname, currency){
    console.log('Goto: ReportView', currency);
    Self.page.set('currentPage', 'report');
    Self.page.set('title', 'Report');
    Self.initializeData(function(err, res){
      var breadcrumbs = [{link: '#stewards/' + stewardname + '/reports',linkText: 'Reports'},
                        {active: true, linkText: currency[0].toUpperCase() + currency.slice(1).toLowerCase() + ' Report'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
  		Self.changePage(new ReportView( { steward: Self.steward, collection: Self.journals, currency: currency } ), {changeHash:false, transition: "none"});
    });
  },
  namespaces: function(stewardname) {
    console.log('Namespaces Controller List function');
    Self.page.set('currentPage', 'namespaces');
    Self.page.set('title', 'Namespaces');
    Self.initializeData(function(err, res){
      var breadcrumbs = [{active:true, linkText: 'NAMESPACES'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      Self.changePage(new NamespacesView( { collection: Self.namespacesCollection, steward: Self.steward, stewards: Self.stewardsCollection }), {changeHash:false, transition: "none"});
    })
  },
  namespace: function(stewardname, namespace) {
    console.log('goto: namespace', stewardname, namespace);
    Self.initializeData(function(err, results){
      Self.page.set('currentPage', 'settings');
      Self.page.set('title', 'Namespace');
      var namespaceObject = Self.namespacesCollection.get('namespaces~' + namespace);
      if(typeof namespaceObject == 'undefined'){
        var breadcrumbs = [{ link: '#settings', linkText: 'SETTINGS'},
                           { active:true, linkText: 'NAMESPACE: ' + namespace}];
        var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
        Self.dashhead.getRegion('breadcrumbs').reset();
        Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      } else {
        var breadcrumbs = [{ link: '#settings', linkText: 'SETTINGS'},
                           { active:true, linkText: 'NAMESPACE: ' + namespaceObject.get('namespace')}];
        var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
        Self.dashhead.getRegion('breadcrumbs').reset();
        Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      }
      Self.changePage(new NamespaceView( { model: namespaceObject, collection: Self.namespacesCollection, accounts: Self.accountsCollection, currencies: Self.currenciesCollection, steward: Self.steward, stewards: Self.stewardsCollection, namespace: namespace, page: Self.page }), {changeHash:false, transition: "none"});
    });
  },
  accounts: function(stewardname) {
    console.log('goto: accountsView', stewardname);
    Self.initializeData(function(err, results){
      Self.page.set('currentPage', 'accounts');
      Self.page.set('title', 'Accounts');

      var breadcrumbs = [{ active:true, linkText: 'Accounts'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));

      Self.changePage(new AccountsView( { collection: Self.accountsCollection, currencies: Self.currenciesCollection, steward: Self.steward, stewards: Self.stewardsCollection}), {changeHash:false, transition: "none"});
    });
  },
  account: function(stewardname, namespace, accountName, currencyName){
    console.log('goto: account', stewardname, namespace, accountName, currencyName);

    Self.initializeData(function(err, res){
      if(typeof currencyName == 'undefined' || currencyName == null){
        //reorder parameters
        currencyName = accountName;
        accountName = namespace;
        namespace = undefined;
        Self.page.set('currentPage', 'accounts');

          var breadcrumbs = [{ link: '#stewards/' + stewardname + '/accounts', linkText: 'ACCOUNTS'},
                             { active: true, linkText: 'ACCOUNT: ' + accountName + ' ' + currencyName}];
      } else {
        Self.page.set('currentPage', 'namespaces');
        var namespaceObject = Self.namespacesCollection.get(namespace);
        if(typeof namespaceObject == 'undefined'){
          var breadcrumbs = [{ link: '#stewards/' + stewardname + '/namespaces', linkText: 'NAMESPACES'},
                             { link: '#stewards/' + stewardname + '/namespaces/' + namespace, linkText: 'NAMESPACE: ' + namespace},
                             { active: true, linkText: 'ACCOUNT: ' + accountName + ' ' + currencyName}];
        } else {
          var breadcrumbs = [{ link: '#stewards/' + stewardname + '/namespaces', linkText: 'NAMESPACES'},
                             { link: '#stewards/' + stewardname + '/namespaces/' + namespace, linkText: 'NAMESPACE: ' + namespaceObject.get('namespace') },
                             { active: true, linkText: 'ACCOUNT: ' + accountName + ' ' + currencyName}];
        }
      }

      Self.page.set('title', 'Account');
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      Self.changePage(new AccountView( { collection: Self.accountsCollection, namespaces: Self.namespacesCollection, currencies: Self.currenciesCollection, journals: Self.journalsCollection, steward: Self.steward, stewards: Self.stewardsCollection, accountName: accountName, currencyName: currencyName, namespace: namespace} ), {});
    })
  },
  currencies: function(stewardname) {
    console.log('goto: currencies', stewardname);
    Self.initializeData(function(err, results){
      Self.page.set('currentPage', 'currencies');
      Self.page.set('title', 'Currencies');

        var breadcrumbs = [{ active:true, linkText: 'CURRENCIES'}];
        var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
        Self.dashhead.getRegion('breadcrumbs').reset();
        Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));

      Self.changePage(new CurrenciesView( { collection: Self.currenciesCollection, accounts: Self.accountsCollection, namespaces: Self.namespacesCollection, journals: Self.journalsCollection, steward: Self.steward, stewards: Self.stewardsCollection}), {changeHash:false, transition: "none"});
    });
  },
  currency: function(stewardname, namespace, currencyName){
    console.log('goto: currency', stewardname, namespace, currencyName);

    Self.initializeData(function(err, res){
      if(typeof currencyName == 'undefined' || currencyName == null){
        //reorder parameters
        currencyName = namespace;
        namespace = undefined;
        Self.page.set('currentPage', 'currencies');

          var breadcrumbs = [{ link: '#stewards/' + stewardname + '/currencies', linkText: 'CURRENCIES'},
                             { active: true, linkText: 'CURRENCY: ' + currencyName}
                            ];

      } else {
        Self.page.set('currentPage', 'namespaces');
        var namespaceObject = Self.namespacesCollection.get('namespaces~' + namespace);
        if(typeof namespaceObject == 'undefined'){
          var breadcrumbs = [{ link: '#stewards/' + stewardname + '/namespaces', linkText: 'NAMESPACES'},
                             { link: '#stewards/' + stewardname + '/namespaces/' + namespace, linkText: 'NAMESPACE: ' + namespace},
                             { active: true, linkText: 'CURRENCY: ' + currencyName}];
        } else {
          var breadcrumbs = [{ link: '#stewards/' + stewardname + '/namespaces', linkText: 'NAMESPACES'},
                             { link: '#stewards/' + stewardname + '/namespaces/' + namespace, linkText: 'NAMESPACE: ' + namespaceObject.get('namespace') },
                             { active: true, linkText: 'CURRENCY: ' + currencyName}];
        }
      }
      Self.page.set('title', 'Currency');
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      Self.changePage(new CurrencyView( { collection: Self.currenciesCollection, namespaces: Self.namespacesCollection, accounts: Self.accountsCollection,journals: Self.journalsCollection, steward: Self.steward, stewards: Self.stewardsCollection, currencyName: currencyName, namespace: namespace} ), {});
    })
  },
  stewards: function() {
    console.log('Goto: Stewards List');
    Self.page.set('currentPage', 'stewards');
    Self.page.set('title', 'Stewards');
    Self.initializeData(function(err, res){
      var breadcrumbs = [{active:true, linkText: 'STEWARDS'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      Self.changePage(new StewardsView( { collection: Self.stewardsCollection, steward: Self.steward }), {changeHash:false, transition: "none"});
    })
  },
  stewardRoute: function(stewardname) {
    console.log('goto: steward', stewardname);
    Self.initializeData(function(err, results){
      Self.page.set('currentPage', 'settings');
      Self.page.set('title', 'Steward');
      var breadcrumbs = [{ link: '#settings', linkText: 'SETTINGS'},
                         { active:true, linkText: 'STEWARD: ' + stewardname}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));

      Self.changePage(new StewardView( { model: Self.stewardsCollection.get('stewards~' + stewardname), stewards: Self.stewardsCollection, accounts: Self.accountsCollection, currencies: Self.currenciesCollection, namespaces: Self.namespacesCollection, steward: Self.steward, stewardname: stewardname}), {changeHash:false, transition: "none"});
    });
  },
  settings: function() {
    console.log('Goto: Settings');
    Self.page.set('currentPage', 'settings');
    Self.page.set('title', 'Settings');
    Self.initializeData(function(err, res){
      var breadcrumbs = [{active:true, linkText: 'SETTINGS'}];
      var breadcrumbsCollection = new Breadcrumbs(breadcrumbs);
      Self.dashhead.getRegion('breadcrumbs').reset();
      Self.dashhead.getRegion('breadcrumbs').show(new BreadcrumbsView( {collection: breadcrumbsCollection }));
      Self.changePage(new SettingsView( { steward: Self.steward, currencies: Self.currenciesCollection, accounts: Self.accountsCollection, stewards: Self.stewardsCollection, namespaces: Self.namespacesCollection, journals: Self.journalsCollection}), {});
    })
  },
  initializeData: function(done){
    console.log('initializeData');
    var series = {};
    var parallel = {};
    series.steward = function(callback){
      if(typeof Self.steward != 'undefined'){
        callback(null, Self.steward);
      } else {
        db.get('config~credentials', function(error, doc){
          console.log('config~credentials:', error, doc)
          if(error){
            console.log('error getting steward from pouchdb',error);
            Self.steward = new Steward();
          } else {
            Self.steward = new Steward(doc.steward);
            Self.steward.credentials = {};
            Self.steward.credentials.token = Self.steward.get('access_token');
            Self.steward.fetch({
              success: function(model, res){
                console.log('successfully got steward', model);
              },
              error: function(err){
                console.log('could not get stewards', err);
              }
            });
          }
          callback(error, Self.steward);
        });
      }
    };

    parallel.stewards = function(callback){
      if(typeof Self.steward == 'undefined' || Self.steward.get('stewardname') == ''){
        callback(null, null);
      } else {
        if(typeof Self.stewardsCollection != 'undefined'){
          callback(null, Self.stewardsCollection);
        } else {
          Self.stewardsCollection = new Stewards();
          Self.stewardsCollection.credentials = {};
          Self.stewardsCollection.credentials.token = Self.steward.get('access_token');
          Self.stewardsCollection.fetch({
            success: function(collection, response){
              console.log('successfully fetched stewards collection', collection, response);
            },
            error: function(collection, response){
              console.log('failed to fetched stewards collection', collection, response);
            }
          });
          callback(null, Self.stewardsCollection);
        }
      }
    };

    parallel.namespaces = function(callback){
      if(typeof Self.steward == 'undefined' || Self.steward.get('stewardname') == ''){
        callback(null, null);
      } else {
        if(typeof Self.namespacesCollection != 'undefined'){
          callback(null, Self.namespacesCollection);
        } else {
          Self.namespacesCollection = new Namespaces([],{ steward: Self.steward });
          Self.namespacesCollection.credentials = {};
          Self.namespacesCollection.credentials.token = Self.steward.get('access_token');
          Self.namespacesCollection.fetch({
            success: function(collection, response){
              console.log('successfully fetched namespaces collection', collection, response);
            },
            error: function(collection, response){
              console.log('failed to fetched namespaces collection', collection, response);
            }
          });
          callback(null, Self.namespacesCollection);
        }
      }
    };

    parallel.accounts = function(callback){
      if(typeof Self.steward == 'undefined' || Self.steward.get('stewardname') == ''){
        callback(null, null);
      } else {
        if(typeof Self.accountsCollection != 'undefined'){
          callback(null, Self.accountsCollection);
        } else {
          Self.accountsCollection = new Accounts([],{steward: Self.steward});
          Self.accountsCollection.credentials = {};
          Self.accountsCollection.credentials.token = Self.steward.get('access_token');
          Self.accountsCollection.fetch({
            success: function(collection, response){
              console.log('successfully fetched accounts collection', collection, response);
            },
            error: function(collection, response){
              console.log('failed to fetched accounts collection', collection, response);
            }
          });
          callback(null, Self.accountsCollection);
        }
      }
    };

    parallel.currencies = function(callback){
      if(typeof Self.steward == 'undefined' || Self.steward.get('stewardname') == ''){
        callback(null, null);
      } else {
        if(typeof Self.currenciesCollection != 'undefined'){
          callback(null, Self.currenciesCollection);
        } else {
          Self.currenciesCollection = new Currencies([],{steward: Self.steward});
          Self.currenciesCollection.credentials = {};
          Self.currenciesCollection.credentials.token = Self.steward.get('access_token');
          Self.currenciesCollection.fetch({
            success: function(collection, response){
              console.log('successfully fetched currencies collection', collection, response);
            },
            error: function(collection, response){
              console.log('failed to fetched currencies collection', collection, response);
            }
          });
          callback(null, Self.currenciesCollection);
        }
      }
    };

    parallel.journals = function(callback){
      if(typeof Self.steward == 'undefined' || Self.steward.get('stewardname') == ''){
        callback(null, null);
      } else {
        if(typeof Self.journalsCollection != 'undefined'){
          callback(null, Self.journalsCollection);
        } else {
          Self.journalsCollection = new Journals([],{steward: Self.steward});
          Self.journalsCollection.credentials = {};
          Self.journalsCollection.credentials.token = Self.steward.get('access_token');
          Self.journalsCollection.fetch({
            success: function(collection, response){
              console.log('successfully fetched journals collection', collection, response);
            },
            error: function(collection, response){
              console.log('failed to fetched journals collection', collection, response);
            }
          });
          callback(null, Self.journalsCollection);
        }
      }
    };

    async.series(series, function(err, steward){
      async.parallel(parallel, done);
    });
  },

	changePage:function (page, options) {
		console.info('changePage called', page, options);
    Self.CurrentView = page; //keep a local reference
    Self.layout.getRegion('pageContainer').show(Self.CurrentView);
	}

});

console.info('router loaded');
