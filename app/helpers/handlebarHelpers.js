/**
 * We inject the Handlebars instance, because this module doesn't know where
 * the actual Handlebars instance will come from.
 */
module.exports = function(Handlebars) {
    return {
        pluralize: function(number, single, plural) {
            if (number === 1) { return single; }
            else { return plural; }
        },
        if_eq: function(a, b, opts) {
            if(a == b) // Or === depending on your needs
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        if_not_eq: function(a, b, opts) {
            if(a != b) // Or === depending on your needs
                return opts.fn(this);
            else
                return opts.inverse(this);
        },
        prettify_date: function(timestamp) {
             return new Date(timestamp).toString();
        },
        prettify_date_short: function(timestamp) {
             return new Date(timestamp).toLocaleString();
        },
        decimal_places: function(number) {
            if(typeof number != 'undefined'){
              return parseFloat(Math.round(number * 100) / 100).toFixed(2);
            } else {
              return number;
            }
        },
        capitalizeFirstLetter: function(string) {
            return string[0].toUpperCase() + string.slice(1).toLowerCase();
        },
        obscure: function(string){
            var res = '';
            var numberOfCharToShow = 4;
            if(string.length < 5){
              numberOfCharToShow = 0;
            } else if(string.length < 6){
              numberOfCharToShow = 1;
            } else if(string.length < 7){
              numberOfCharToShow = 2;
            } else if(string.length < 8){
              numberOfCharToShow = 3;
            }
            for(var i = 0; i < string.length - numberOfCharToShow; i++){
              res += 'X';
            }
            res += string.substr(string.length - numberOfCharToShow, string.length);
            return res;
        },
        eq: function (v1, v2) {
            return v1 === v2;
        },
        'not-eq': function (v1, v2) {
            return v1 !== v2;
        },
        'not': function (v1) {
          return !v1;
        },
        lt: function (v1, v2) {
            return v1 < v2;
        },
        gt: function (v1, v2) {
            return v1 > v2;
        },
        lte: function (v1, v2) {
            return v1 <= v2;
        },
        gte: function (v1, v2) {
            return v1 >= v2;
        },
        and: function (v1, v2) {
            return v1 && v2;
        },
        or: function (v1, v2) {
            return v1 || v2;
        }
    }
};
