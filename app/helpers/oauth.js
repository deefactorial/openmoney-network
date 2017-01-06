var $ = require('jquery');
var cache = [];
var authorization = 'Basic ' + new Buffer("openmoney-api:q0LfZKmhvd0H9jXZK56TVJvZM+9tm5zBG0/P60ZPXz/MVh0+/vryhZ5z/X23tME3d0HuzhlB/lRouNauFroLrGmweoXCIHDPqZ19p2EHSCT3JVXQgsQHiyNPDEZiS8b1fl++o5qwFoVx62hx0eO2djFUfTkk9kR+paiyIZLs7jrjwxUVl1J+qmQF0ZPSYdyZSc8KhD7cYITFFp2N2Y9r+A==").toString('base64');

exports.authenticate = function (steward, callback){
  //steward model object instance
  //check cache
  if(steward.get('stewardname') in cache){
    //check expiry of token
    if(new Date(cache[steward.get('stewardname')].expires).getTime() > new Date().getTime()){
      // not expired
      steward.set('access_token', cache[steward.get('stewardname')].access_token);
      steward.set('expires', cache[steward.get('stewardname')].expires);
      steward.set('refresh_token', cache[steward.get('stewardname')].refresh_token);
      steward.save();
      callback(null, steward);
    } else {
      //expired refresh token
      RefreshToken(steward.get('stewardname'), cache[steward.get('stewardname')].refresh_token, function(err, results){
        if(err){
          callback(err);
        } else {
          //put token to cache and steward and return token

          steward.set('access_token', results.access_token);
          steward.set('expires', results.expires);
          steward.set('refresh_token', results.refresh_token);
          steward.save();
                //doesn't matter if err or ok


          cache[steward.get('stewardname')] = {};
          cache[steward.get('stewardname')].expires = results.expires;
          cache[steward.get('stewardname')].access_token = results.access_token;
          cache[steward.get('stewardname')].refresh_token = results.refresh_token;


          callback(null, steward);
        }//else err
      });//RefreshToken
    }//else expired

  } else {


    //if token doesn't exist authenticate and get one
    if(typeof steward.get('access_token') != undefined) {
      var request = {};
      request.grant_type = 'password';
      request.username = steward.get('stewardname');
      request.password = steward.get('password');

      var options = {};
      options.type = 'POST';
      options.data = JSON.stringify(request);
      options.dataType = 'json';
      options.contentType = "application/json";
      options.headers = { 'Authorization': authorization };
      options.url = '/V2/stewards/' + steward.get('stewardname') + '/oauth/token';
      options.success = function(response){
        console.info('success:', response);
        //console.log(response.body);
        //put token to cache and steward and return token
        steward.set('access_token', response.access_token);
        steward.set('expires', response.expires);
        steward.set('refresh_token', response.refresh_token);
        steward.save();

        cache[steward.get('stewardname')] = {};
        cache[steward.get('stewardname')].expires = response.expires;
        cache[steward.get('stewardname')].access_token = response.access_token;
        cache[steward.get('stewardname')].refresh_token = response.refresh_token;

        callback(null, steward);
      };
      options.error = function(error){
        console.info('error:', error);
        callback(error);
      };
      $.ajax(options);
    } else {
      //check expiry of token
      if(typeof steward.get('expires') != undefined && new Date(steward.get('expires')).getTime() > new Date().getTime()){
        //use token
        callback(null, steward);
      } else {
        //refresh token
        RefreshToken(steward.get('stewardname'), steward.get('refresh_token'), function(err, results){
          if(err){
            callback(err);
          } else {
            //put token to cache and steward and return token
            steward.set('access_token', results.access_token);
            steward.set('expires', results.expires);
            steward.set('refresh_token', results.refresh_token);
            steward.save();

            cache[steward.get('stewardname')] = {};
            cache[steward.get('stewardname')].expires = results.expires;
            cache[steward.get('stewardname')].access_token = results.access_token;
            cache[steward.get('stewardname')].refresh_token = results.refresh_token;

            callback(null, steward);
          }//else err
        });//RefreshToken
      }//else expired
    }//else token

  }//else in cache
}//Authenticate


function RefreshToken(stewardname, refresh_token, callback){
  var request = {};
  request.grant_type = 'refresh_token';
  request.username = stewardname;
  request.refresh_token = refresh_token;

  var options = {};
  options.type = 'POST';
  options.data = JSON.stringify(request);
  options.dataType = 'json';
  options.contentType = "application/json";
  options.headers = { 'Authorization': authorization };
  options.url = '/V2/stewards/' + steward.get('stewardname') + '/oauth/token';
  options.success = function(response){
    console.info('success:', response);
    callback(null, response);
  };
  options.error = function(error){
    console.info('error:', error);
    callback(error);
  };
  $.ajax(options);
}//RefreshToken

exports.invalidateCache = function (stewardname){
  console.log('in invalidateCache', stewardname);
  if(typeof stewardname != 'undefined' && typeof cache[stewardname] != 'undefined' && typeof cache[stewardname].access_token != 'undefined'){
    delete(cache[stewardname].access_token);
    delete(cache[stewardname].refresh_token);
    delete(cache[stewardname].expires);
    delete(cache[stewardname]);
  }
}//invalidateCache
