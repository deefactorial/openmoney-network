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
var ViewHelpers = require('../helpers/handlebarHelpers');
var ViewHelpers = ViewHelpers(Handlebars);
var Self = {};

var Namespace = require('../models/namespace');
var Account = require('../models/account');
var Currency = require('../models/currency');
var Journal = require('../models/journal');
var async = require('async');

var db = new PouchDB('openmoney');
if (!db.adapter) { // websql not supported by this browser
  console.log('failed to load default websql or indexdb');
  db = new PouchDB('openmoney', {adapter: 'fruitdown'});
}

module.exports = Marionette.CollectionView.extend({

    template: Templates['settings'],

    initialize: function (options) {
        console.log("initialize settings view", options);
        Self = this;
        Self.steward = options.steward;
        Self.namespaces = options.namespaces;
        Self.currencies = options.currencies;
        Self.accounts = options.accounts;
        Self.journals = options.journals;
        Self.stewardsCollection = options.stewards;

        Self.listenTo(Self.namespaces, 'sync add remove reset', Self.render);
        Self.listenTo(Self.stewardsCollection, 'sync add remove reset', Self.render);
    },

    setCollection: function(collection){
      this.collection = collection;
    },

    collectionEvents: {
      'change': 'render'
    },

    render: function(){
        console.log("render settings view");

        var data = {};
        data = Self.steward.toJSON();

        if(typeof Self.namespaces != 'undefined'){
          data.namespaces = Self.namespaces.toJSON();
          for(var i = 0; i < data.namespaces.length; i++){
            for(var j = 0; j < data.namespaces[i].stewards.length; j++){
              data.namespaces[i].stewards[j] = Self.stewardsCollection.get(data.namespaces[i].stewards[j]);
              if(typeof data.namespaces[i].stewards[j] != 'undefined'){
                data.namespaces[i].stewards[j] = data.namespaces[i].stewards[j].toJSON();
              }
            }
          }
        }

        if(typeof Self.stewardsCollection != 'undefined'){
          console.log('stewardsCollection', Self.stewardsCollection.toJSON());
          data.stewards = Self.stewardsCollection.toJSON();
          //data.stewardsCollection = Self.stewardsCollection.toJSON():
        }

        console.log('settings view data:', data);
        _.extend(data, ViewHelpers);
        Self.$el.html(Self.template(data));

        Self.$('#lighttheme').off('click').on('click', function(event){
          $('.darktheme').prop('disabled', true);
          $('.lighttheme').prop('disabled', false);
          $('body').css('background-color', '#ffffff');

          db.get('config~credentials', function(error, doc){
            console.log('config~credentials:', error, doc)
            if(error){
              return console.log('error getting steward from pouchdb',error);
            }
            doc.steward.theme = 'light';
            console.log('doc', doc);
            db.put(doc, function(error, result){
              if(error) { console.log(error) } else {
                console.log('successfully updated config~credentials doc', result);
              }
            });
          });
        });

        Self.$('#darktheme').off('click').on('click', function(event){
          $('.lighttheme').prop('disabled', true);
          $('.darktheme').prop('disabled', false);
          $('body').css('background-color', '#202020');
          db.get('config~credentials', function(error, doc){
            console.log('config~credentials:', error, doc)
            if(error){
              return console.log('error getting steward from pouchdb',error);
            }
            doc.steward.theme = 'dark';
            console.log('doc', doc);
            db.put(doc, function(error, result){
              if(error) { console.log(error) } else {
                console.log('successfully updated config~credentials doc', result);
              }
            });
          });
        });


        Self.$('button[name=csvimport]').off('click').on('click', function(event){
          console.log('Import CSV button pressed', event);
          Self.$('#csvmodal').show();

          Self.$('button.close').off('click').on('click', function(event){
            event.preventDefault();
            console.log('close modal');
            Self.$('#csvmodal').hide();
          });

          Self.$('button.cancel').off('click').on('click', function(event){
            event.preventDefault();
            console.log('cancel modal');
            Self.$('#csvmodal').hide();
          });

          Self.$('button.import').off('click').on('click', function(event){
            event.preventDefault();
            console.log('import csv file button pressed');
            Self.$('#csvmodal').hide();

            var input, file, fr, img;

            if (typeof window.FileReader !== 'function') {
              $('#error-notification').html("The file API isn't supported on this browser yet.").show();
              setTimeout(function(){
                $('#error-notification').hide();
              },10000);
              console.log("The file API isn't supported on this browser yet.");
              return;
            }

            input = document.getElementById('csv');
            console.log(input);
            if (!input) {
              console.log("Um, couldn't find the csv element.");
              $('#error-notification').html("Um, couldn't find the csv element.").show();
              setTimeout(function(){
                $('#error-notification').hide();
              },10000);
            }
            else if (!input.files) {
              console.log("This browser doesn't seem to support the `files` property of file inputs.");
              $('#error-notification').html("This browser doesn't seem to support the `files` property of file inputs.").show();
              setTimeout(function(){
                $('#error-notification').hide();
              },10000);
            }
            else if (!input.files[0]) {
              console.log("Please select a file before clicking 'Load'");
              $('#error-notification').html("Please select a file before clicking 'Import'").show();
              setTimeout(function(){
                $('#error-notification').hide();
              },10000);
            }
            else {
              file = input.files[0];
              fr = new FileReader();
              fr.onload = (function(f) {
              return function(e) {
                var csvfile = e.target.result;
                //console.log(csvfile)
                csvfile = csvfile.split("\n");
                console.log(csvfile);

                var csvPosition = {};
                var row = 0;
                var tasks = {};
                csvfile.forEach(function(line){

                  var elements = line.split(',');
                  var rowTasks = {};
                  console.log(elements);
                  if(row == 0){
                    //get column that each element is in.
                    var csv = 'From,To,Description,Currency,Amount';
                    var csv = csv.split(',');

                    //find out which column they are in
                    var columnsMatch = true;
                    for(var i = 0; i < elements.length; i++){
                      for(var j = 0; j < csv.length; j++){
                        if(elements[i].trim().toLowerCase() == csv[j].trim().toLowerCase()){
                          csvPosition[csv[j]] = i;
                        }
                      }
                    }
                    if(Object.keys(csvPosition).length != 5){
                      console.log(csvPosition);
                      console.log(Object.keys(csvPosition).length);
                      console.log("Could not find column headers: From,To,Description,Currency,Amount");
                      $('#error-notification').html("Could not find column headers: From,To,Description,Currency,Amount").show();
                      setTimeout(function(){
                        $('#error-notification').hide();
                      },10000);
                    }
                  } else {
                    if(elements.length > 1){
                      //var date = elements[0];
                      //var time = elements[1];
                      //console.log(csvPosition);
                      //console.log(csvPosition['From']);
                      var from = elements[csvPosition['From']];
                      if(from.indexOf('.cc') === -1){
                        from = from + '.' + Self.steward.get('stewardname') + '.cc';
                      }
                      var to = elements[csvPosition['To']];
                      if(to.indexOf('.cc') === -1){
                        to = to + '.' + Self.steward.get('stewardname') + '.cc';
                      }
                      var description = elements[csvPosition['Description']];
                      var currency = elements[csvPosition['Currency']];
                      var amount = elements[csvPosition['Amount']];
                      //var balance = elements[7];
                      //var volume = elements[8];
                      console.log('entry:', from, to, description, currency, amount);

                      var namespaceString = from.substr(from.indexOf('.') + 1, from.length);
                      tasks['namespaces~' + namespaceString] = function(callback){
                        if(from.indexOf('.') === -1){
                          callback('From account (' + from + ') must have a namespace');
                        } else {

                          if(namespaceString.length == 0){
                            callback('From account namespace has to have at least one character.');
                          } else {
                            var namespace = Self.namespaces.get("namespaces~" + namespaceString)
                            console.log(namespace)
                            if(typeof namespace != 'undefined'){
                              console.log('from account namespace found.');
                              callback(null, 'successfully fetched namespace');
                            } else {
                              console.log('from account namespace not found.');
                              //try adding it first if that fails try creating it.
                              var namespaceModel = new Namespace();

                              namespaceModel.set('steward', Self.steward);
                              var stewardsArray = [ Self.steward.id ];
                              namespaceModel.set('stewards', stewardsArray );
                              namespaceModel.set('namespace', namespaceString);
                              if(namespaceString.indexOf('.') !== -1){
                                namespaceModel.set('parent_namespace', namespaceString.substr(namespaceString.indexOf('.') + 1, namespaceString.length));
                              } else {
                                namespaceModel.set('parent_namespace', '');
                              }

                              namespaceModel.set('private', true);
                              namespaceModel.set('disabled', false);

                              namespaceModel.credentials = {};
                              namespaceModel.credentials.token = Self.steward.get('access_token');

                              namespaceModel.fetch({
                                success: function(model, response){
                                  console.log('successfully fetched namespace',model, response);
                                  Self.namespaces.fetch({
                                    success: function(model, response){
                                      callback(null, 'successfully fetched namespace');
                                    },
                                    error: function(model, response){
                                      callback('failed to fetch namespace collection');
                                    }
                                  });

                                },
                                error: function(model, response){
                                  console.log('failed to fetch namespace',model, response);

                                  //try creating the namespace
                                  namespaceModel.save({},{
                                    success: function(model, response){
                                      console.log('successfully created namespace', model, response);
                                      callback(null, 'successfully created namespace');
                                      //try creating the account
                                    },
                                    error: function(model, response){
                                      console.log('failed to create namespace', model, response);
                                      callback('failed to create namespace');
                                    }});
                                }
                              })
                            }
                          }
                        }
                      }

                      var namespaceString = to.substr(to.indexOf('.') + 1, to.length);
                      tasks['namespaces~' + namespaceString] = function(callback){
                        if(to.indexOf('.') === -1){
                          callback('To account (' + to + ') must have a namespace');
                        } else {

                          if(namespaceString.length == 0){
                            callback('To account namespace has to have at least one character.');
                          } else {
                            var namespace = Self.namespaces.get("namespaces~" + namespaceString)
                            console.log(namespace)
                            if(typeof namespace != 'undefined'){
                              console.log('to account namespace found.', namespace);
                              callback(null, 'successfully fetched namespace');
                            } else {
                              console.log('to account namespace not found.');
                              //try adding it first if that fails try creating it.
                              var namespaceModel = new Namespace();

                              namespaceModel.set('steward', Self.steward);
                              var stewardsArray = [ Self.steward.id ];
                              namespaceModel.set('stewards', stewardsArray );
                              namespaceModel.set('namespace', namespaceString);
                              if(namespaceString.indexOf('.') !== -1){
                                namespaceModel.set('parent_namespace', namespaceString.substr(namespaceString.indexOf('.') + 1, namespaceString.length));
                              } else {
                                namespaceModel.set('parent_namespace', '');
                              }

                              namespaceModel.set('private', true);
                              namespaceModel.set('disabled', false);

                              namespaceModel.credentials = {};
                              namespaceModel.credentials.token = Self.steward.get('access_token');

                              namespaceModel.fetch({
                                success: function(model, response){
                                  console.log('successfully fetched namespace',model, response);
                                  Self.namespaces.fetch({
                                    success: function(model, response){
                                      callback(null, 'successfully fetched namespace');
                                    },
                                    error: function(model, response){
                                      callback('failed to fetch namespace collection');
                                    }
                                  });

                                },
                                error: function(model, response){
                                  console.log('failed to fetch namespace',model, response);
                                  if(response.status !== 404){
                                    callback('namespace: ' + namespaceString + ' error: ' + response.responseJSON.message);
                                  } else {
                                    //try creating the namespace
                                    namespaceModel.save({},{
                                      success: function(model, response){
                                        console.log('successfully created namespace', model, response);
                                        callback(null, 'successfully created namespace');

                                      },
                                      error: function(model, response){
                                        console.log('failed to create namespace', model, response);
                                        callback('failed to create namespace');
                                      }});
                                  }

                                }
                              })
                            }
                          }
                        }
                      }

                      tasks["currencies~" + currency] = function(callback){
                        var currencyModel = Self.currencies.get("currencies~" + currency);
                        if(typeof currencyModel != 'undefined'){
                          callback(null, 'successfully fetched currency');
                        } else {
                          currencyModel = new Currency();

                          currencyModel.set('steward', Self.steward);
                          currencyModel.set('stewards', [ Self.steward.get('id') ]);
                          if(currency.indexOf('.') !== -1){
                            currencyModel.set('currency', currency.substring(0, currency.indexOf('.')));
                            currencyModel.set('currency_namespace', currency.substring(currency.indexOf('.')+1, currency.length));
                          } else {
                            currencyModel.set('currency', currency);
                            currencyModel.set('currency_namespace', '');
                          }

                          currencyModel.credentials = {};
                          currencyModel.credentials.token = Self.steward.get('access_token');
                          currencyModel.fetch({
                            success: function(model, response){
                              console.log('successfully fetched currency', model, response);
                              callback(null, 'successfully fetched currency');
                            },
                            error: function(model, response){
                              console.log('failed to fetch currency', model, response);
                              if(response.status !== 404){
                                callback('Currency: ' + currency + ' error: ' + response.responseJSON.message);
                              } else {
                                currencyModel.save({}, {
                                  success: function(model, response){
                                    console.log('successfully created currency', model, response);
                                    Self.currencies.fetch({
                                      success: function(models, response){
                                        callback(null, 'successfully created currency');
                                      },
                                      error: function(models, response){
                                        callback('created currency, but failed to get currency collection, try refreshing your browser');
                                      }
                                    });
                                  },
                                  error: function(model, response){
                                    console.log('failed to create currency', model, response);
                                    callback('failed to create currency');
                                  }
                                })
                              }
                            }
                          });
                        }
                      }


                    }
                  }
                  row++;
                });

                async.series(tasks, function(err, response){
                  if(err){
                    console.log(err);
                    $('#error-notification').html(err).show();
                    setTimeout(function(){
                      $('#error-notification').hide();
                    },10000);
                  } else {
                    console.log(response);
                    //ok got namespaces and currencies
                    //look for account
                    //check if from and to accounts exists
                    var accountTasks = {};
                    row = 0;
                    csvfile.forEach(function(line){

                      var elements = line.split(',');
                      if(row > 0 && elements.length > 1) {

                        var from = elements[csvPosition['From']];
                        if(from.indexOf('.cc') === -1){
                          from = from + '.' + Self.steward.get('stewardname') + '.cc';
                        }
                        var to = elements[csvPosition['To']];
                        if(to.indexOf('.cc') === -1){
                          to = to + '.' + Self.steward.get('stewardname') + '.cc';
                        }
                        var description = elements[csvPosition['Description']];
                        var currency = elements[csvPosition['Currency']];
                        var amount = elements[csvPosition['Amount']];

                        accountTasks[to + currency] = function(callback){
                          console.log("to:", to);
                          var toAccount = Self.accounts.get('accounts~' + to + '~' + currency);
                          if(typeof toAccount != 'undefined'){
                            //exists
                            callback(null, 'To account found.');

                          } else {
                            console.log('to account is not found in local db');

                            //try creating the account
                            var editedAccount = new Account();
                            var accountName = to;
                            var currencyName = currency;

                            //editedAccount.set('id', 'accounts~' + accountName + '~' + currencyName);
                            editedAccount.set('steward', Self.steward);
                            var stewardsArray = [ Self.steward.id ];
                            editedAccount.set('stewards', stewardsArray);
                            if(accountName.indexOf('.') !== -1){
                              editedAccount.set('account', accountName.substring(0, accountName.indexOf('.')))
                              editedAccount.set('account_namespace', accountName.substring(accountName.indexOf('.') + 1, accountName.length));
                            } else {
                              editedAccount.set('account', accountName)
                              editedAccount.set('account_namespace', '');
                            }

                            if(currencyName.indexOf('.') !== -1){
                              editedAccount.set('currency', currencyName.substr(0, currencyName.indexOf('.')));
                              editedAccount.set('currency_namespace', currencyName.substr(currencyName.indexOf('.')+1, currencyName.length));
                            } else {
                              editedAccount.set('currency', currencyName);
                              editedAccount.set('currency_namespace', '');
                            }
                            editedAccount.set('disabled', false);
                            console.log('save to account:', editedAccount.toJSON())
                            editedAccount.credentials = {};
                            editedAccount.credentials.token = Self.steward.get('access_token');

                            editedAccount.fetch({
                              success: function(model, response){
                                console.log('successfully fetched to account', model, response);
                                //console.log('From account found, and chances are its not yours or it would be in your db.');
                                callback(null, 'Someone else is the steward of this to account: ' + to + ' in the currency: ' + currency);
                              },
                              error: function(model, response){
                                console.log('to account not found in server.');
                                if(response.status !== 404){
                                  callback('Account: ' + accountName + ' in ' + currencyName + ' error: ' + response.responseJSON.message);
                                } else {
                                  editedAccount.save({},{
                                    success: function(model, response){
                                      console.log('successfully saved model', model, response);
                                      callback(null, 'Successfully saved to account.')
                                    },
                                    error: function(model, error){
                                      console.log('failed to saved model', model, error);

                                      if(typeof error.responseJSON != 'undefined' && typeof error.responseJSON.message != 'undefined' ){
                                        console.info(error.responseJSON.message);
                                        callback('Failed to save to account: ' + error.responseJSON.message);
                                      } else {
                                        callback('Failed to save to account.');
                                      }
                                    }
                                  });
                                }
                              }
                            })
                          }
                        };

                        accountTasks[from + currency] = function(callback){
                          console.log("from:", from);
                          var fromAccount = Self.accounts.get('accounts~' + from + '~' + currency);
                          if(typeof fromAccount != 'undefined'){
                            //exists
                            var isSteward = false;
                            fromAccount.get('stewards').forEach(function(steward){
                              if(steward == Self.steward.get('id')){
                                isSteward = true;
                              }
                            })

                            if(!isSteward){
                              //console.log('You are not the steward of the from account!');
                              callback('You are not the steward of the from account!');
                            } else {
                              //console.log('From account found and your are the steward of the account');
                              callback(null, 'From account found and your are the steward of the account');
                            }

                          } else {
                            console.log('from account is not found in local db');

                            //try creating the account
                            var editedAccount = new Account();
                            var accountName = from;
                            var currencyName = currency;

                            //editedAccount.set('id', 'accounts~' + accountName + '~' + currencyName);
                            editedAccount.set('steward', Self.steward);
                            var stewardsArray = [ Self.steward.id ];
                            editedAccount.set('stewards', stewardsArray);
                            if(accountName.indexOf('.') !== -1){
                              editedAccount.set('account', accountName.substring(0, accountName.indexOf('.')))
                              editedAccount.set('account_namespace', accountName.substring(accountName.indexOf('.') + 1, accountName.length));
                            } else {
                              editedAccount.set('account', accountName)
                              editedAccount.set('account_namespace', '');
                            }

                            if(currencyName.indexOf('.') !== -1){
                              editedAccount.set('currency', currencyName.substr(0, currencyName.indexOf('.')));
                              editedAccount.set('currency_namespace', currencyName.substr(currencyName.indexOf('.')+1, currencyName.length));
                            } else {
                              editedAccount.set('currency', currencyName);
                              editedAccount.set('currency_namespace', '');
                            }
                            editedAccount.set('disabled', false);
                            console.log('save account:', editedAccount.toJSON())
                            editedAccount.credentials = {};
                            editedAccount.credentials.token = Self.steward.get('access_token');

                            editedAccount.fetch({
                              success: function(model, response){
                                console.log('from account found:', model, response);
                                var isSteward = false;
                                //check if this account
                                //console.log('From account found, and chances are its not yours or it would be in your db.');
                                callback('Someone else is the steward of this from account: ' + from + ' in the currency: ' + currency);
                              },
                              error: function(model, response){
                                console.log('From account not found in server.');
                                if(response.status !== 404){
                                  callback('Account: ' + accountName + ' in ' + currencyName + ' error: ' + response.responseJSON.message);
                                } else {
                                  editedAccount.save({},{
                                    success: function(model, response){
                                      console.log('successfully saved model', model, response);
                                      callback(null, 'Successfully saved account.')
                                    },
                                    error: function(model, error){
                                      console.log('failed to saved model', model, error);

                                      if(typeof error.responseJSON != 'undefined' && typeof error.responseJSON.message != 'undefined' ){
                                        console.info(error.responseJSON.message);
                                        callback('Failed to save from account: ' + error.responseJSON.message);
                                      } else {
                                        callback('Failed to save from account.');
                                      }
                                    }
                                  })
                                }
                              }
                            })
                          }
                        };
                      }
                      row++;
                    });

                    async.series(accountTasks, function(err, results){
                      if(err){
                        console.log(err);
                        $('#error-notification').html(err).show();
                        setTimeout(function(){
                          $('#error-notification').hide();
                        },10000);
                      } else {
                        console.log(results);
                        //accounts exist make journal entry
                        var journalTasks = {};
                        row = 0;
                        csvfile.forEach(function(line){

                          var elements = line.split(',');
                          if(row > 0 && elements.length > 1) {

                            var from = elements[csvPosition['From']];
                            if(from.indexOf('.') === -1){
                              from = from + '.' + Self.steward.get('stewardname') + '.cc';
                            }
                            var to = elements[csvPosition['To']];
                            if(to.indexOf('.') === -1){
                              to = to + '.' + Self.steward.get('stewardname') + '.cc';
                            }
                            var description = elements[csvPosition['Description']];
                            var currency = elements[csvPosition['Currency']];
                            var amount = elements[csvPosition['Amount']];

                            journalTasks[from + to + currency + amount + row] = function(callback){
                              if(amount < 0){
                                callback('You cannot post journal entries with a negative amount.');
                              } else {

                                var journal = new Journal();

                                if(to.indexOf('.') !== -1){
                                  journal.set('to_account', to.substr( 0, to.indexOf('.')));
                                  journal.set('to_account_namespace', to.substr(to.indexOf('.') + 1, to.length));
                                } else {
                                  journal.set('to_account', to);
                                  journal.set('to_account_namespace', '');
                                }
                                if(from.indexOf('.') !== -1){
                                  journal.set('account', from.substr( 0, from.indexOf('.')));
                                  journal.set('namespace', from.substr( from.indexOf('.') + 1, from.length));
                                } else {
                                  journal.set('account', from);
                                  journal.set('namespace', '');
                                }


                                if(currency.indexOf('.') !== -1){
                                  journal.set('currency', currency.substr( 0, currency.indexOf('.')));
                                  journal.set('currency_namespace', currency.substr( currency.indexOf('.') + 1, currency.length));
                                } else {
                                  journal.set('currency', currency);
                                  journal.set('currency_namespace', '');
                                }
                                journal.set('amount', parseFloat(amount));
                                journal.set('steward', Self.steward);
                                journal.set('payload', { description: description} );

                                journal.credentials = {};
                                journal.credentials.token = Self.steward.get('access_token');

                                journal.save({},{
                                  success: function(model, res){
                                    console.log('successfully saved journal', model, res);
                                    Self.journals.fetch();
                                    Self.accounts.fetch();
                                    callback(null, 'Successfully Processed Journal Entry.');
                                  },
                                  error: function(model, res){
                                    console.log('failed to saved journal', model, res);
                                    if(typeof res.responseJSON != 'undefined' && typeof res.responseJSON.message != 'undefined' ){
                                      console.info(res.responseJSON.message);
                                      callback('journal: from:' + from + ' to:' + to + ' error: ' + res.responseJSON.message);
                                    } else {
                                      callback('failed to save journal.');
                                    }
                                  }
                                });
                              }
                            };
                          }
                          row++;
                        });

                        async.series(journalTasks, function(err, results){
                          if(err){
                            console.log(err);
                            $('#error-notification').html(err).show();
                            setTimeout(function(){
                              $('#error-notification').hide();
                            },10000);
                          } else {
                            console.log(results);
                            $('#success-notification').html('Successfully Processed Journal Entry.').show();
                            setTimeout(function(){
                              $('#success-notification').hide();
                            },10000);
                          }
                        })
                      }
                    });
                  }
                })
              }(f); });
              fr.readAsText(file);
            }
          });
        });



        this.$('[data-sort=namespaces] > tbody > tr').off('click').on('click', function(event){
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

        this.$('[data-sort=stewards] > tbody > tr').off('click').on('click', function(event){
          event.preventDefault();
          var id = $(this).attr('id');
          console.log(id);
          router.navigate('stewards/' + id);
        })

        this.$('button[name=addSteward]').off('click').on('click', function(event){
          event.preventDefault();
          router.navigate('stewards/add');
        })

        this.$('[data-sort=namespaces]').DataTable();
        this.$('[data-sort=stewards]').DataTable();
    }
});
