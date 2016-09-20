module.exports = function(Handlebars) {

this["openmoney"] = this["openmoney"] || {};

this["openmoney"]["account"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div id=\"statsButton\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"showedit\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Edit</strong>\n    </button>\n  </div>\n  <div id=\"stats\" class=\"statcard statcard-success p-a-md m-b\">\n    <h2><div class=\"statcard-number\">\n        <div>ACCOUNT: "
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</div><div>CURRENCY: "
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</div>\n      </div>\n    </h2>\n    <h3 class=\"statcard-number text-right\">\n      BALANCE "
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n      <!-- <small class=\"delta-indicator delta-positive\">"
    + alias4(((helper = (helper = helpers.balanceDelta || (depth0 != null ? depth0.balanceDelta : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"balanceDelta","hash":{},"data":data}) : helper)))
    + "</small> -->\n    </h3>\n    <h3 class=\"statcard-number text-right\">\n      VOLUME "
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n      <!-- <small class=\"delta-indicator delta-positive\">"
    + alias4(((helper = (helper = helpers.volumeDelta || (depth0 != null ? depth0.volumeDelta : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volumeDelta","hash":{},"data":data}) : helper)))
    + "</small> -->\n    </h3>\n\n  </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"hidden\" name=\"id\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" />";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <option value=\""
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.namespace : depth0),"cc",{"name":"if_eq","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "selected=\"selected\"";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <option value=\""
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency : depth0),"cc",{"name":"if_eq","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "Edit";
},"16":function(container,depth0,helpers,partials,data) {
    return "New";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "  <h2><strong>Ledger</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"csv\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Export CSV</strong>\n    </button>\n    <button type=\"button\" name=\"newJournal\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>Process Journal Entry</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table\" data-sort=\"basic\">\n      <thead>\n        <tr>\n          <th>Timestamp</th>\n          <th>With</th>\n          <th>Amount</th>\n          <th>Balance</th>\n          <th>Volume</td>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.journals : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.charge || (depth0 != null ? depth0.charge : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"charge","hash":{},"data":data}) : helper)))
    + "\">\n              <td>"
    + alias4((helpers.prettify_date_short || (depth0 && depth0.prettify_date_short) || alias2).call(alias1,(depth0 != null ? depth0.created : depth0),{"name":"prettify_date_short","hash":{},"data":data}))
    + "</td>\n              <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.withStewardname : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.program(23, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n              <!-- <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.fromstewardname : depth0),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.program(27, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n              <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.tostewardname : depth0),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.program(31, data, 0),"data":data})) != null ? stack1 : "")
    + "</td> -->\n              <td>"
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.charge : depth0),"CREDIT",{"name":"if_eq","hash":{},"fn":container.program(33, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.amount : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n              <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n              <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n            </tr>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.withStewardname || (depth0 != null ? depth0.withStewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"withStewardname","hash":{},"data":data}) : helper)))
    + "/accounts/"
    + alias4(((helper = (helper = helpers.withAccount || (depth0 != null ? depth0.withAccount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"withAccount","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.withAccount || (depth0 != null ? depth0.withAccount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"withAccount","hash":{},"data":data}) : helper)))
    + "</a>";
},"23":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.withAccount || (depth0 != null ? depth0.withAccount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"withAccount","hash":{},"data":data}) : helper)));
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.fromstewardname || (depth0 != null ? depth0.fromstewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fromstewardname","hash":{},"data":data}) : helper)))
    + "/accounts/"
    + alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)))
    + "</a>";
},"27":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)));
},"29":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.tostewardname || (depth0 != null ? depth0.tostewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tostewardname","hash":{},"data":data}) : helper)))
    + "/accounts/"
    + alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.to_account_namespace || (depth0 != null ? depth0.to_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account_namespace","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.to_account_namespace || (depth0 != null ? depth0.to_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account_namespace","hash":{},"data":data}) : helper)))
    + "</a>";
},"31":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.to_account_namespace || (depth0 != null ? depth0.to_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account_namespace","hash":{},"data":data}) : helper)));
},"33":function(container,depth0,helpers,partials,data) {
    return "-";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\ntr.DEBIT {\n  color: #159c6e;\n}\ntr.CREDIT {\n  color: #E64759;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <form id='accountForm' "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"form-group text-left\">\n      <label for=\"key\">Account Name</label>\n      <input type=\"text\" id=\"account\" name=\"account\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.account || (depth0 != null ? depth0.account : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"account","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Trading Account Name\" class=\"form-control\" />\n    </div>\n    <div class=\"form-group text-left\">\n      <label for=\"type\">Account Namespace</label>\n      <select class=\"custom-select\" name=\"account_namespace\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.namespaces : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </select>\n    </div>\n    <div class=\"form-group text-left\">\n      <label for=\"type\">Account Currency</label>\n      <select class=\"custom-select\" name=\"currencyName\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.currencies : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </select>\n    </div>\n\n    <div class=\"form-group text-right\">\n      <button type=\"button\" name=\"cancel\" class=\"btn btn-lg btn-primary-outline\" >Cancel</button>\n      <button type=\"button\" name=\"upsert\" class=\"btn btn-lg btn-primary-outline\" >\n        <strong>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "")
    + "</strong>\n      </button>\n    </div>\n  </form>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["openmoney"]["accounts"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td class=\"text-right\">"
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n          </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n\n  <h2><strong>Accounts</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"csv\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Export CSV</strong>\n    </button>\n    <button type=\"button\" name=\"newAccount\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Account</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table accounts\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th class=\"text-right\">Account</th>\n          <th>Currency</th>\n          <th>Balance</th>\n          <th>Volume</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.accounts : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["breadcrumb"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\""
    + alias4(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.linkText || (depth0 != null ? depth0.linkText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"linkText","hash":{},"data":data}) : helper)))
    + "</a>";
},"3":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.linkText || (depth0 != null ? depth0.linkText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"linkText","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.link : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"useData":true});

this["openmoney"]["currencies"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stewards : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n          </tr>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href='#stewards/"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n  <h2><strong>Currencies</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <div style=\"padding-bottom: 10px;\">\n      <button type=\"button\" name=\"newCurrency\" class=\"btn btn-lg btn-success-outline\" >\n        <strong>New Currency</strong>\n      </button>\n    </div>\n    <div style=\"padding-bottom: 10px;\">\n      <button type=\"button\" name=\"addCurrency\" class=\"btn btn-lg btn-success-outline\" >\n        <strong>Add Existing Currency</strong>\n      </button>\n    </div>\n    <div style=\"padding-bottom: 10px;\">\n      <button type=\"button\" name=\"csvcurrencies\" class=\"btn btn-lg btn-primary-outline\" >\n        <strong>Export Ledger CSV</strong>\n      </button>\n    </div>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table currencies\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th>Currency</th>\n          <th>Stewards</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currencies : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["currency"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div id=\"statsButton\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"showedit\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Edit</strong>\n    </button>\n  </div>\n  <div id=\"stats\" class=\"statcard statcard-primary p-a-md m-b\">\n    <h2>\n      <div class=\"statcard-number\">\n        CURRENCY: "
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\n      </div>\n    </h2>\n    <h3 class=\"statcard-number text-right\">\n      BALANCE "
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n      <!-- <small class=\"delta-indicator delta-positive\">"
    + alias4(((helper = (helper = helpers.balanceDelta || (depth0 != null ? depth0.balanceDelta : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"balanceDelta","hash":{},"data":data}) : helper)))
    + "</small> -->\n    </h3>\n    <h3 class=\"statcard-number text-right\">\n      VOLUME "
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n      <!-- <small class=\"delta-indicator delta-positive\">"
    + alias4(((helper = (helper = helpers.volumeDelta || (depth0 != null ? depth0.volumeDelta : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"volumeDelta","hash":{},"data":data}) : helper)))
    + "</small> -->\n    </h3>\n  </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"hidden\" name=\"id\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" />";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <option value=\""
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "\" "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.namespace : depth0),"cc",{"name":"if_eq","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "selected=\"selected\"";
},"11":function(container,depth0,helpers,partials,data) {
    return "Edit";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.currencyName : depth0),"add",{"name":"if_eq","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    return "Add";
},"16":function(container,depth0,helpers,partials,data) {
    return "New";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "\n  <h2><strong>Accounts</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"csvaccounts\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Export CSV</strong>\n    </button>\n    <button type=\"button\" name=\"newAccount\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Account</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table accounts\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th>Account</th>\n          <th>Balance</th>\n          <th>Volume</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.accounts : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n\n  <h2><strong>Ledger</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"csvledger\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Export CSV</strong>\n    </button>\n    <button type=\"button\" name=\"newTransaction\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>Process Journal Entry</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table\" data-sort=\"basic\">\n      <thead>\n        <tr>\n          <th>Timestamp</th>\n          <th>From</th>\n          <th>To</th>\n          <th>Amount</th>\n          <th>balance</th>\n          <th>volume</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.journals : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n          </tr>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4(((helper = (helper = helpers.charge || (depth0 != null ? depth0.charge : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"charge","hash":{},"data":data}) : helper)))
    + "\">\n              <td>"
    + alias4((helpers.prettify_date_short || (depth0 && depth0.prettify_date_short) || alias2).call(alias1,(depth0 != null ? depth0.created : depth0),{"name":"prettify_date_short","hash":{},"data":data}))
    + "</td>\n              <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.fromstewardname : depth0),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.program(26, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n              <td>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.tostewardname : depth0),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.program(30, data, 0),"data":data})) != null ? stack1 : "")
    + "</td>\n              <td>"
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.charge : depth0),"CREDIT",{"name":"if_eq","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.amount : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n              <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n              <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n            </tr>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.fromstewardname || (depth0 != null ? depth0.fromstewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"fromstewardname","hash":{},"data":data}) : helper)))
    + "/accounts/"
    + alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)))
    + "</a>";
},"26":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)));
},"28":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.tostewardname || (depth0 != null ? depth0.tostewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"tostewardname","hash":{},"data":data}) : helper)))
    + "/accounts/"
    + alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.to_account_namespace || (depth0 != null ? depth0.to_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account_namespace","hash":{},"data":data}) : helper)))
    + "/"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.to_account_namespace || (depth0 != null ? depth0.to_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account_namespace","hash":{},"data":data}) : helper)))
    + "</a>";
},"30":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + "."
    + alias4(((helper = (helper = helpers.to_account_namespace || (depth0 != null ? depth0.to_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account_namespace","hash":{},"data":data}) : helper)));
},"32":function(container,depth0,helpers,partials,data) {
    return "-";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\ntr.DEBIT {\n  color: #159c6e;\n}\ntr.CREDIT {\n  color: #E64759;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <form id='currencyForm' "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"form-group text-left\">\n      <label for=\"key\">Currency Name</label>\n      <input type=\"text\" id=\"currency\" name=\"currency\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"currency","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Currency Name\" class=\"form-control\" />\n    </div>\n    <div class=\"form-group text-left\">\n      <label for=\"type\">Currency Namespace</label>\n      <select class=\"custom-select\" name=\"currency_namespace\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.namespaces : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </select>\n    </div>\n\n    <div class=\"form-group text-right\">\n      <button type=\"button\" name=\"cancel\" class=\"btn btn-lg btn-primary-outline\" >Cancel</button>\n      <button type=\"button\" name=\"upsert\" class=\"btn btn-lg btn-primary-outline\" >\n        <strong>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "</strong>\n      </button>\n    </div>\n  </form>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["openmoney"]["dashhead"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"stewardname","hash":{},"data":data}) : helper)));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", buffer = 
  "<div class=\"dashhead dashhead-style\">\n  <div class=\"dashhead-titles\">\n    <h6 class=\"dashhead-subtitle\">OPENMONEY.NETWORK</h6>\n    <h3 class=\"dashhead-title\">"
    + container.escapeExpression(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h3>\n  </div>\n  <div class=\"dashhead-toolbar\">\n    <button type=\"button\" id=\"logout-button\" class=\"btn btn-xs btn-pill btn-danger\" style=\"margin-top: 7px;\"><span class=\"icon icon-log-out\"></span> Logout : ";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + " </button>\n    <span class=\"dashhead-toolbar-divider hidden-xs\"></span>\n  </div>\n  <div class=\"dashhead-toolbar\">\n    <button type=\"button\" id=\"help-button\" class=\"btn btn-xs btn-pill btn-info\" style=\"margin-top: 7px;\"><span class=\"icon icon-help-with-circle\"></span> Help</button>\n  </div>\n</div>\n<div id='breadcrumbs' class=\"breadcrumbs\"></div>\n<div id=\"success-notification\" class=\"notifications center-block alert alert-success text-center\" role=\"alert\" style=\"display: none;\"></div>\n<div id=\"error-notification\" class=\"notifications center-block alert alert-danger text-center\" role=\"alert\" style=\"display: none;\"></div>\n";
},"useData":true});

this["openmoney"]["forgot"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"main-content\" class=\"main-content text-center\">\n  <div class=\"main-functions center-block panel panel-default\">\n    <div class=\"panel-heading text-left\"><a href=\"#login\" id='back'><span class=\"glyphicon glyphicon-chevron-left\"></span></a> <strong>FORGOT PASSWORD</strong></div>\n    <div class=\"panel-body\">\n      <form id=\"forgot\">\n        <div class=\"form-group text-left\">\n          <label for=\"stewardname\">Steward Name or Email</label>\n          <input type=\"text\" id=\"stewardname\" name=\"stewardname\" value=\"\" placeholder=\"Steward Name or Email\" class=\"form-control\" />\n        </div>\n        <div class=\"form-group text-right\">\n          <button type=\"button\" name=\"forgot\" id=\"forgot-button\" class=\"btn btn-primary\">Forgot Password</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["journals"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr><td style=\"border-top: none;\">\n            <button type=\"button\" id=\""
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + ":"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + ":button\" class=\"account-buttons btn btn-xm btn-default-outline action-spacing highlight\" style=\"width: 100%; margin: 0;\">"
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + " "
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</button>\n            <div id=\""
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + ":"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\" class=\"value-buttons\">\n              <button type=\"button\" class=\"btn btn-xm btn-success-outline action-spacing tab-spacing send-value send-value-selected\" style=\"width: 80%; margin: 2px;\">\n                <span class=\"icon icon-plus icon-padding\"></span>\n                SEND VALUE\n              </button>\n              <button type=\"button\" class=\"btn btn-xm btn-danger-outline action-spacing tab-spacing receive-value\" style=\"width: 80%; margin: 2px;\">\n                <span class=\"icon icon-minus icon-padding\"></span>\n                RECEIVE VALUE\n              </button>\n            </div>\n          </td></tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<style>\n.input-padding{\n  padding-top: 7px !important;\n  padding-right: 7px !important;\n  padding-left: 7px !important;\n  padding-bottom: 0px !important;\n}\n.p-a-md{\n  padding-top: 0px !important;\n  padding-bottom: 0px !important;\n}\n.account-buttons{\n  white-space: normal;\n}\n</style>\n<div class=\"col-sm-6 table-full\" style=\"padding-top: 10px;\">\n  <table class=\"table display\" data-sort=\"table\">\n    <thead>\n      <tr>\n        <th class=\"\">Accounts</th>\n      </tr>\n    </thead>\n    <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.accounts : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n<div class=\"col-sm-6\" style=\"padding-top: 20px;\">\n  <div class=\"row\">\n    <div class=\"col-xs-6\" style=\"padding-left: 22px; padding-right: 3px;\">\n      <div class=\"statcard statcard-success p-a-md\">\n        <h2 id=\"balance\" class=\"statcard-number\">\n          "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n        </h2>\n        <span class=\"statcard-desc\">Balance</span>\n      </div>\n    </div>\n    <div class=\"col-xs-6\" style=\"padding-left: 3px;padding-right: 22px;\">\n      <div class=\"statcard statcard-info p-a-md\">\n        <h2 id=\"volume\" class=\"statcard-number\">\n          "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n        </h2>\n        <span class=\"statcard-desc\">Volume</span>\n      </div>\n    </div>\n  </div>\n  <div id=\"card-div\" class=\"input-padding\">\n    <input type=\"text\" id=\"toAccountName\" name=\"toAccountName\" value=\""
    + alias3(((helper = (helper = helpers.toAccountName || (depth0 != null ? depth0.toAccountName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"toAccountName","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Trading Name\" class=\"form-control\"/>\n    <input type=\"hidden\" name=\"polarity\" value=\"send\"/>\n    <input type=\"hidden\" name=\"accountName\" value=\""
    + alias3(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "\"/>\n    <input type=\"hidden\" name=\"currencyName\" value=\""
    + alias3(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "\"/>\n  </div>\n  <input type=\"hidden\" name=\"sign\" id=\"sign\" value=\"+\" />\n  <div class=\"input-with-icon input-padding\">\n    <input type=\"text\" name=\"amount\" id=\"amount\" value=\"0.00\" class=\"form-control text-right plus input-padding\" style=\"font-size: 40px;height: 60px;\"/>\n    <span id='plus-icon' class=\"icon icon-plus\" style=\"font-size: 50px;\"></span>\n    <span id='minus-icon' class=\"icon icon-minus\" style=\"display: none; font-size: 50px;\"></span>\n  </div>\n  <div id=\"numberpad\" class=\"numberpad\">\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"1\" value=\"1\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">1</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"2\" value=\"2\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">2</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"3\" value=\"3\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">3</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"4\" value=\"4\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">4</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"5\" value=\"5\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">5</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"6\" value=\"6\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">6</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"7\" value=\"7\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">7</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"8\" value=\"8\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">8</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"9\" value=\"9\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">9</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" name=\"0\" value=\"0\" class=\"btn btn-default-outline numberpad-button\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\">0</span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" id=\"del\" name=\"del\" value=\"del\" class=\"btn btn-warning-outline\" style=\"width: 100%; height: 100%;\"><span class=\"numberpad-font\"><span class=\"icon icon-erase\"></span></span></button>\n          </div>\n      </div>\n    </div>\n    <div class=\"col-xs-4 numberpad-row\">\n      <div class=\"aspect-contianer\">\n          <div class=\"aspect-one-to-one\"></div>\n          <div class=\"aspect-element\">\n              <button type=\"button\" id=\"process\" name=\"process\" value=\"process\" class=\"btn btn-success-outline \" style=\"width: 100%; height: 100%;\"><span class=\"material-icons numberpad-font\" style=\"padding-top: 13px;\">keyboard_return</span></button>\n          </div>\n      </div>\n    </div>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["layout"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"navigation\"></div>\n<div class=\"col-md-8 content\">\n  <div id=\"dashhead\"></div>\n  <div id=\"pageContainer\"></div>\n</div>\n";
},"useData":true});

this["openmoney"]["login"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<style type=\"text/css\">\n</style>\n<div id=\"main-content\" class=\"main-content text-center\">\n    <div id=\"success-notification\" class=\"main-functions center-block alert alert-success\" role=\"alert\" style=\"display: none;\"></div>\n    <div id=\"error-notification\" class=\"main-functions center-block alert alert-danger\" role=\"alert\" style=\"display: none;\"></div>\n    <div class=\"main-functions panel panel-default center-block\">\n      <div class=\"panel-heading text-left\"><strong>LOGIN</strong></div>\n      <div class=\"panel-body\">\n        <form id=\"login\" class=\"login\">\n          <div class=\"form-group text-left\">\n            <label for=\"stewardname\">Steward Name</label>\n            <input type=\"text\" id=\"stewardname\" name=\"stewardname\" value=\"\" placeholder=\"Steward Name\" class=\"form-control\" />\n          </div>\n          <div class=\"form-group text-left\">\n            <label for=\"password\">Password</label>\n            <input type=\"password\" id=\"password\" name=\"password\" value=\"\" placeholder=\"Password\" class=\"form-control\"/>\n          </div>\n          <div class=\"form-group text-right\">\n            <button type=\"button\" name=\"login-button\" id=\"login-button\" class=\"btn btn-primary btn-lg text-uppercase\">Login</button>\n          </div>\n        </form>\n        <div class=\"forgot\">\n            <small><a href=\"#forgot\" class=\"link light forgot-link\">Forgot your password?</a></small>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"fb-signin\" style=\"display: none;\">\n        <button name=\"fb\" class=\"fb-button\">\n            <table class=\"light\" style=\"width:100%;\">\n                <tr style=\"width:100%;\">\n                    <td style=\"width:25%;text-align:right;\">\n                        <img src=\"public/assets/images/login-fb-logo.png\" class=\"fb-logo\"/>\n                    </td>\n                    <td style=\"width:75%;text-align:left;\">Sign in with Facebook\n                    </td>\n                </tr>\n            </table>\n        </button>\n    </div>\n    <div class=\"register\">\n        <span style=\"color: #FFFFFF;\">Don't have an namespace?<span>\n        <button type=\"button\" name=\"register\" id=\"register-button\" class=\"btn btn-success text-uppercase\">Sign up</button>\n    </div>\n    <div id=\"main-spacer\" class=\"main-spacer\">\n        <div style=\"height:100%;\">&nbsp;</div>\n    </div>\n</div>\n";
},"useData":true});

this["openmoney"]["namespace"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "  <div id=\"statsButton\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"showedit\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Edit</strong>\n    </button>\n  </div>\n  <div id=\"stats\" class=\"statcard statcard-info p-a-md m-b\">\n    <h2><div class=\"statcard-number\">NAMESPACE: "
    + container.escapeExpression(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "</div></h2>\n    "
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stewards : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"statcard-desc\">STEWARD: <a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "\" style='color:#FFF'>"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</a></div>";
},"5":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"hidden\" name=\"id\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" />";
},"9":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"namespace","hash":{},"data":data}) : helper)));
},"11":function(container,depth0,helpers,partials,data) {
    return "Edit";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.namespace : depth0),"add",{"name":"if_eq","hash":{},"fn":container.program(14, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data) {
    return "Add";
},"16":function(container,depth0,helpers,partials,data) {
    return "New";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "  <h2><strong>Accounts</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"newAccount\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Account</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table accounts\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th class=\"text-right\">Account</th>\n          <th>Currency</th>\n          <th>Balance</th>\n          <th>Volume</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.accounts : depth0),{"name":"each","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n\n  <h2><strong>Currencies</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"newCurrency\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Currency</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table currencies\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th>Currency</th>\n          <th>Stewards</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.currencies : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td class=\"text-right\">"
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n          </tr>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stewards : depth0),{"name":"each","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n          </tr>\n";
},"24":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"25":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href='#stewards/"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <form id='namespaceForm' "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"form-group text-left\">\n      <label for=\"namespace\">Namespace</label>\n      <input type=\"text\" id=\"namespace\" name=\"namespace\" value=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" placeholder=\"Namespace\" class=\"form-control\" />\n    </div>\n    <div class=\"form-group text-right\">\n      <button type=\"button\" name=\"cancel\" class=\"btn btn-lg btn-primary-outline\" >Cancel</button>\n      <button type=\"button\" name=\"upsert\" class=\"btn btn-lg btn-primary-outline\" >\n        <strong>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "")
    + "</strong>\n      </button>\n    </div>\n  </form>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["openmoney"]["namespaces"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stewards : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n          </tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href=\"#stewards/"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</a> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n  <h2><strong>Namespaces</strong></h2>\n  <div class=\"row text-right\" style=\"padding-top: 20px;padding-bottom: 20px;\">\n    <button type=\"button\" name=\"newNamespace\" class=\"btn btn-lg btn-success-outline\">New Namespace</button>\n  </div>\n  <div class=\"row text-right\" style=\"padding-bottom: 20px;\">\n    <button type=\"button\" name=\"addNamespace\" class=\"btn btn-lg btn-success-outline\">Add Existing Namespace</button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table display\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th class=\"\">Namespace</th>\n          <th class=\"\">Stewards</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.collection : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["navigation"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"stewardname","hash":{},"data":data}) : helper)));
},"3":function(container,depth0,helpers,partials,data) {
    return "class=\"active\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=helpers.blockHelperMissing, buffer = 
  "<div class=\"navigation col-md-3 sidebar right-border\">\n  <nav class=\"sidebar-nav\">\n    <div class=\"sidebar-header\">\n      <button class=\"nav-toggler nav-toggler-md sidebar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#nav-toggleable-md\">\n        <span class=\"sr-only\">Toggle nav</span>\n      </button>\n      <a class=\"sidebar-brand\" href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "/journals\">\n        <img id=\"logo\" src=\"public/assets/images/openmoney-logo-vector.svg\" class=\"svg img-responsive center-block\" alt=\"Openmoney Logo\" style=\"height: 75px;\"/>\n      </a>\n    </div>\n    <div id=\"nav-toggleable-md\" class=\"nav-toggleable-md collapse\">\n      <ul class=\"nav nav-bordered nav-stacked\">\n        <li "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.page : depth0),"journals",{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <a id=\"journals\" href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "/journals\" class=\"nav-padding\">\n            <span class=\"icon icon-dial-pad icon-padding\"></span>\n            Journal Entry\n          </a>\n        </li>\n        <li "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.page : depth0),"accounts",{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <a id=\"accounts\" href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "/accounts\" class=\"nav-padding\">\n            <span class=\"icon icon-v-card icon-padding\"></span>\n            Accounts\n          </a>\n        </li>\n        <li "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.page : depth0),"currencies",{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <a id=\"currencies\" href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "/currencies\" class=\"nav-padding\">\n            <span class=\"icon icon-credit icon-padding\"></span>\n            Currencies\n          </a>\n        </li>\n        <li "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.page : depth0),"namespaces",{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <a id=\"namespaces\" href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "/namespaces\" class=\"nav-padding\">\n            <span class=\"icon icon-folder icon-padding\"></span>\n            Namespaces\n          </a>\n        </li>\n        <li "
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.page : depth0),"stewards",{"name":"if_eq","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <a id=\"stewards\" href=\"#stewards\" class=\"nav-padding\">\n            <span class=\"icon icon-users icon-padding\"></span>\n            Stewards\n          </a>\n        </li>\n      </ul>\n    </div>\n  </nav>\n</div>\n";
},"useData":true});

this["openmoney"]["receipt"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.charge : depth0),"DEBIT",{"name":"if_eq","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.charge : depth0),"CREDIT",{"name":"if_eq","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "success";
},"4":function(container,depth0,helpers,partials,data) {
    return "danger";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"stewardname","hash":{},"data":data}) : helper)));
},"8":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"email","hash":{},"data":data}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.currency || (depth0 != null ? depth0.currency : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currency","hash":{},"data":data}) : helper)))
    + ((stack1 = (helpers.if_not_eq || (depth0 && depth0.if_not_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency_namespace : depth0),"",{"name":"if_not_eq","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4(((helper = (helper = helpers.currency_namespace || (depth0 != null ? depth0.currency_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currency_namespace","hash":{},"data":data}) : helper)));
},"11":function(container,depth0,helpers,partials,data) {
    return ".";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.charge || (depth0 != null ? depth0.charge : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"charge","hash":{},"data":data}) : helper)));
},"15":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.prettify_date_short || (depth0 && depth0.prettify_date_short) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.created : depth0),{"name":"prettify_date_short","hash":{},"data":data}));
},"17":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.from_account || (depth0 != null ? depth0.from_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account","hash":{},"data":data}) : helper)))
    + ((stack1 = (helpers.if_not_eq || (depth0 && depth0.if_not_eq) || alias2).call(alias1,(depth0 != null ? depth0.from_account_namespace : depth0),"",{"name":"if_not_eq","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)));
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return alias4(((helper = (helper = helpers.to_account || (depth0 != null ? depth0.to_account : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"to_account","hash":{},"data":data}) : helper)))
    + ((stack1 = (helpers.if_not_eq || (depth0 && depth0.if_not_eq) || alias2).call(alias1,(depth0 != null ? depth0.to_account_namespace : depth0),"",{"name":"if_not_eq","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias4(((helper = (helper = helpers.from_account_namespace || (depth0 != null ? depth0.from_account_namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"from_account_namespace","hash":{},"data":data}) : helper)));
},"21":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.decimal_places || (depth0 && depth0.decimal_places) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.amount : depth0),{"name":"decimal_places","hash":{},"data":data}));
},"23":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.gift : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promo : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.points : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tab : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stamp : depth0),{"name":"decimal_places","hash":{},"data":data}));
},"25":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampVolume : depth0),{"name":"decimal_places","hash":{},"data":data}));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=helpers.blockHelperMissing, buffer = 
  "<style>\n@media print {\n  .receipt-buttons {\n    display: none;\n  }\n  .dashhead {\n    display: none;\n  }\n  .navigation {\n    display: none;\n  }\n  .breadcrumbs {\n    display: none;\n  }\n  .receipt {\n    border-bottom: 1px dashed black;\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .content {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  .container {\n    padding-left: 0;\n    padding-right: 0;\n  }\n  @page { margin: 0; }\n}\n</style>\n<div class=\"receipt-buttons col-sm-6 text-center\">\n  <div style=\"padding-top: 10px; padding-bottom:10px;\">\n    <button type=\"button\" name=\"email\" class=\"btn btn-lg btn-primary-outline\">Email Receipt</button>\n  </div>\n  <div style=\"padding-top: 10px; padding-bottom:10px;\">\n    <button type=\"button\" name=\"print\" class=\"btn btn-lg btn-primary-outline\">Print Receipt</button>\n  </div>\n  <div style=\"padding-top: 10px; padding-bottom:10px;\">\n    <button type=\"button\" name=\"void\" class=\"btn btn-lg btn-warning-outline\">Void</button>\n  </div>\n  <div style=\"padding-top: 10px; padding-bottom:10px;\">\n    <button type=\"button\" name=\"done\" class=\"btn btn-lg btn-success-outline\">Done</button>\n  </div>\n</div>\n<div class=\"receipt col-sm-6\">\n  <div class=\"statcard statcard-";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += " p-a-md m-b text-center\">\n    <div id='stewardname'>";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n    <div id='email' style=\"padding-bottom: 20px;\">";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</div>\n    <div id='action'>\n      <h3>";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        ";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</h3>\n    </div>\n    <div id='date' class='text-left'>Timestamp: <span style=\"float:right\">";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span></div>\n    <div id='key' class='text-left'>\n      From:\n      <span style=\"float:right;\">";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\n    </div>\n    <div id='key' class='text-left'>\n      To:\n      <span style=\"float:right;\">";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\n    </div>\n    <div id='amount' class='text-left' style=\"padding-top: 20px;\">\n      <strong>\n        Journal Amount:\n        <span style=\"float:right;\">\n            ";
  stack1 = ((helper = (helper = helpers.journal || (depth0 != null ? depth0.journal : depth0)) != null ? helper : alias2),(options={"name":"journal","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.journal) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n        </span>\n      </strong>\n    </div>\n    <div id='balance' class='text-left' >\n      <strong>\n        Remaining Balance:\n        <span style=\"float:right;\">";
  stack1 = ((helper = (helper = helpers.card || (depth0 != null ? depth0.card : depth0)) != null ? helper : alias2),(options={"name":"card","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.card) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "</span>\n      </strong>\n    </div>\n    <div id='volume' class='text-left' >\n      <strong>\n        Total Volume:\n        <span style=\"float:right;\">";
  stack1 = ((helper = (helper = helpers.card || (depth0 != null ? depth0.card : depth0)) != null ? helper : alias2),(options={"name":"card","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.card) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n      </strong>\n    </div>\n</div>\n";
},"useData":true});

this["openmoney"]["register"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"main-content\" class=\"main-content text-center\">\n  <div class=\"main-functions center-block panel panel-default\">\n    <div class=\"panel-heading text-left\"><a href=\"#login\" id='back'><span class=\"glyphicon glyphicon-chevron-left\"></span></a> <strong>REGISTRATION</strong></div>\n    <div class=\"panel-body\">\n      <form id=\"register\">\n        <div class=\"form-group text-left\">\n          <label for=\"stewardname\">Steward Name</label>\n          <input type=\"text\" id=\"stewardname\" name=\"stewardname\" value=\"\" placeholder=\"Steward Name\" class=\"form-control\" />\n        </div>\n        <div class=\"form-group text-left\">\n          <label for=\"email\">Email</label>\n          <input type=\"email\" id=\"email\" name=\"email\" value=\"\" placeholder=\"Email\" class=\"form-control\"/>\n        </div>\n        <div class=\"form-group text-left\">\n          <label for=\"password\">Password</label>\n          <input type=\"password\" id=\"password\" name=\"password\" value=\"\" placeholder=\"Password\" class=\"form-control\"/>\n        </div>\n        <div class=\"form-group text-right\">\n          <button type=\"button\" name=\"register\" id=\"register-button\" class=\"btn btn-primary\">Register</button>\n        </div>\n      </form>\n    </div>\n  </div>\n  <div id=\"main-spacer\" class=\"main-spacer\">\n      <div style=\"height:100%;\">&nbsp;</div>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["report"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<style>\n\n</style>\n<div id=\"gift\" class=\"statcard statcard-success p-a-md m-b\">\n  <h1> Gift </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"startDate\">Start Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"startDate\" value=\""
    + alias3(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Start Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"endDate\">End Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"endDate\" value=\""
    + alias3(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"End Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"table-full\">\n  <table class=\"table display\" data-sort=\"table\">\n    <thead>\n      <tr>\n        <th class=\"\">Date</th>\n        <th class=\"\">Namespace</th>\n        <th class=\"\">Card Number</th>\n        <th class=\"\">Load or Redeem</th>\n        <th class=\"\">Amount</th>\n        <!-- <th class=\"\">By Employee</th> -->\n      </tr>\n    </thead>\n    <tfoot>\n      <tr>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th style=\"text-align:right\"><div>Balance:</div><div>Volume:</div></th>\n        <th><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div></th>\n      </tr>\n    </tfoot>\n    <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.giftJournals : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=helpers.blockHelperMissing, buffer = 
  "        <tr id=\""
    + alias4(((helper = (helper = helpers._id || (depth0 != null ? depth0._id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"_id","hash":{},"data":data}) : helper)))
    + "\">\n          <td>"
    + alias4((helpers.prettify_date_short || (depth0 && depth0.prettify_date_short) || alias2).call(alias1,(depth0 != null ? depth0.timestamp : depth0),{"name":"prettify_date_short","hash":{},"data":data}))
    + "</td>\n          <td><a href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "/namespaces/"
    + alias4(((helper = (helper = helpers.namespaceID || (depth0 != null ? depth0.namespaceID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespaceID","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "</a></td>\n          <td><a href=\"#stewards/";
  stack1 = ((helper = (helper = helpers.steward || (depth0 != null ? depth0.steward : depth0)) != null ? helper : alias2),(options={"name":"steward","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.steward) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "/namespaces/"
    + alias4(((helper = (helper = helpers.namespaceID || (depth0 != null ? depth0.namespaceID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespaceID","hash":{},"data":data}) : helper)))
    + "/accounts/"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "\">"
    + alias4(((helper = (helper = helpers.key || (depth0 != null ? depth0.key : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</a></td>\n          <td>";
  stack1 = ((helper = (helper = helpers.load || (depth0 != null ? depth0.load : depth0)) != null ? helper : alias2),(options={"name":"load","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.load) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helper = (helper = helpers.redeem || (depth0 != null ? depth0.redeem : depth0)) != null ? helper : alias2),(options={"name":"redeem","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data}),(typeof helper === alias3 ? helper.call(alias1,options) : helper));
  if (!helpers.redeem) { stack1 = alias5.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</td>\n          <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.amount : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n          <!-- <td>"
    + alias4(((helper = (helper = helpers.employeeID || (depth0 != null ? depth0.employeeID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"employeeID","hash":{},"data":data}) : helper)))
    + "</td> -->\n        </tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return container.escapeExpression(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"stewardname","hash":{},"data":data}) : helper)));
},"6":function(container,depth0,helpers,partials,data) {
    return "Load";
},"8":function(container,depth0,helpers,partials,data) {
    return "Redeem";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div id=\"gift\" class=\"statcard statcard-primary p-a-md m-b\">\n  <h1> Promotional </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"startDate\">Start Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"startDate\" value=\""
    + alias3(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Start Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"endDate\">End Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"endDate\" value=\""
    + alias3(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"End Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"table-full\">\n  <table class=\"table display\" data-sort=\"table\">\n    <thead>\n      <tr>\n        <th class=\"\">Date</th>\n        <th class=\"\">Namespace</th>\n        <th class=\"\">Card Number</th>\n        <th class=\"\">Load or Redeem</th>\n        <th class=\"\">Amount</th>\n        <!-- <th class=\"\">By Employee</th> -->\n      </tr>\n    </thead>\n    <tfoot>\n      <tr>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th style=\"text-align:right\"><div>Balance:</div><div>Volume:</div></th>\n        <th><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div></th>\n      </tr>\n    </tfoot>\n    <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.promoJournals : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div id=\"gift\" class=\"statcard statcard-warning p-a-md m-b\">\n  <h1> Points </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"startDate\">Start Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"startDate\" value=\""
    + alias3(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Start Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"endDate\">End Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"endDate\" value=\""
    + alias3(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"End Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"table-full\">\n  <table class=\"table display\" data-sort=\"table\">\n    <thead>\n      <tr>\n        <th class=\"\">Date</th>\n        <th class=\"\">Namespace</th>\n        <th class=\"\">Card Number</th>\n        <th class=\"\">Load or Redeem</th>\n        <th class=\"\">Amount</th>\n        <!-- <th class=\"\">By Employee</th> -->\n      </tr>\n    </thead>\n    <tfoot>\n      <tr>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th style=\"text-align:right\"><div>Balance:</div><div>Volume:</div></th>\n        <th><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div></th>\n      </tr>\n    </tfoot>\n    <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.pointsJournals : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div id=\"gift\" class=\"statcard statcard-danger p-a-md m-b\">\n  <h1> Tab </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"startDate\">Start Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"startDate\" value=\""
    + alias3(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Start Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"endDate\">End Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"endDate\" value=\""
    + alias3(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"End Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"table-full\">\n  <table class=\"table display\" data-sort=\"table\">\n    <thead>\n      <tr>\n        <th class=\"\">Date</th>\n        <th class=\"\">Namespace</th>\n        <th class=\"\">Card Number</th>\n        <th class=\"\">Load or Redeem</th>\n        <th class=\"\">Amount</th>\n        <!-- <th class=\"\">By Employee</th> -->\n      </tr>\n    </thead>\n    <tfoot>\n      <tr>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th style=\"text-align:right\"><div>Balance:</div><div>Volume:</div></th>\n        <th><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div></th>\n      </tr>\n    </tfoot>\n    <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.tabJournals : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "<div id=\"gift\" class=\"statcard statcard-info p-a-md m-b\">\n  <h1> Stamp </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"startDate\">Start Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"startDate\" value=\""
    + alias3(((helper = (helper = helpers.startDate || (depth0 != null ? depth0.startDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"startDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Start Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"col-sm-6\" style=\"padding-bottom: 20px;\">\n  <div class=\"form-group text-left\">\n    <label for=\"endDate\">End Date:</label>\n    <div class=\"input-with-icon\">\n      <input type=\"text\" name=\"endDate\" value=\""
    + alias3(((helper = (helper = helpers.endDate || (depth0 != null ? depth0.endDate : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"endDate","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"End Date\" class=\"form-control\">\n      <span class=\"icon icon-calendar\"></span>\n    </div>\n  </div>\n</div>\n<div class=\"table-full\">\n  <table class=\"table display\" data-sort=\"table\">\n    <thead>\n      <tr>\n        <th class=\"\">Date</th>\n        <th class=\"\">Namespace</th>\n        <th class=\"\">Card Number</th>\n        <th class=\"\">Load or Redeem</th>\n        <th class=\"\">Amount</th>\n        <!-- <th class=\"\">By Employee</th> -->\n      </tr>\n    </thead>\n    <tfoot>\n      <tr>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th>&nbsp;</th>\n        <th style=\"text-align:right\"><div>Balance:</div><div>Volume:</div></th>\n        <th><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div><div>"
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</div></th>\n      </tr>\n    </tfoot>\n    <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stampJournals : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </tbody>\n  </table>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency : depth0),"giftcard",{"name":"if_eq","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency : depth0),"promo",{"name":"if_eq","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency : depth0),"points",{"name":"if_eq","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency : depth0),"tab",{"name":"if_eq","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.if_eq || (depth0 && depth0.if_eq) || alias2).call(alias1,(depth0 != null ? depth0.currency : depth0),"stamp",{"name":"if_eq","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});

this["openmoney"]["reports"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<!-- <div class=\"col-sm-6\" style=\"padding-top: 10px;\">\n</div>\n<div class=\"col-sm-6\" style=\"padding-top: 20px;\">\n</div> -->\n<div id=\"gift\" class=\"statcard statcard-success p-a-md m-b\">\n  <h1> Gift </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.giftVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n\n<div id=\"promo\" class=\"statcard statcard-primary p-a-md m-b\">\n  <h1> Promotional </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.promoVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n\n<div id=\"points\" class=\"statcard statcard-warning p-a-md m-b\">\n  <h1> Loyalty </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.pointsVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n\n<div id=\"tab\" class=\"statcard statcard-danger p-a-md m-b\">\n  <h1> Tab </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.tabVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n\n<div id=\"stamp\" class=\"statcard statcard-info p-a-md m-b\">\n  <h1> Stamp </h1>\n  <h3 class=\"statcard-number text-right\">\n    BALANCE "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampBalance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n\n  </h3>\n  <h3 class=\"statcard-number text-right\">\n    VOLUME "
    + alias3((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.stampVolume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "\n  </h3>\n</div>\n";
},"useData":true});

this["openmoney"]["reset"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div id=\"main-content\" class=\"main-content text-center\">\n  <div class=\"main-functions center-block panel panel-default\">\n    <div class=\"panel-heading text-left\"><a href=\"#login\" id='back'><span class=\"glyphicon glyphicon-chevron-left\"></span></a> <strong>RESET PASSWORD</strong></div>\n    <div class=\"panel-body\">\n      <form id=\"reset\">\n        <div class=\"form-group text-left\">\n          <label for=\"password\">New Password</label>\n          <input type=\"password\" id=\"password\" name=\"password\" value=\"\" placeholder=\"New Password\" class=\"form-control\" />\n        </div>\n        <div class=\"form-group text-left\">\n          <label for=\"password2\">Re-type New Password</label>\n          <input type=\"password\" id=\"password2\" name=\"password2\" value=\"\" placeholder=\"Re-type New Password\" class=\"form-control\" />\n        </div>\n        <div class=\"form-group text-right\">\n          <button type=\"button\" name=\"reset\" id=\"reset-button\" class=\"btn btn-primary\">Reset Password</button>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["steward"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <div id=\"statsButton\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"showedit\" class=\"btn btn-lg btn-primary-outline\" >\n      <strong>Edit</strong>\n    </button>\n  </div>\n  <div id=\"stats\" class=\"statcard statcard-info p-a-md m-b\">\n    <h2><div class=\"statcard-number\">STEWARD: "
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</div></h2>\n    <div class=\"statcard-desc\">EMAIL: <a href=\"mailto:"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\" style='color:#FFF'>"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</a></div>\n  </div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "style=\"display: none;\"";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<input type=\"hidden\" name=\"id\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"id","hash":{},"data":data}) : helper)))
    + "\" />";
},"7":function(container,depth0,helpers,partials,data) {
    return "Edit";
},"9":function(container,depth0,helpers,partials,data) {
    return "Add";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {};

  return "  <h2><strong>Accounts</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"newAccount\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Account</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table accounts\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th>Account</th>\n          <th>Currency</th>\n          <th>Balance</th>\n          <th>Volume</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.accounts : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n\n  <h2><strong>Currencies</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"newCurrency\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Currency</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table currencies\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th>Currency</th>\n          <th>Stewards</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.currencies : depth0),{"name":"each","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n\n  <h2><strong>Namespaces</strong></h2>\n  <div id=\"newButtonDiv\" class=\"text-right\" style=\"padding-bottom:10px;\">\n    <button type=\"button\" name=\"newCurrency\" class=\"btn btn-lg btn-success-outline\" >\n      <strong>New Namespace</strong>\n    </button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table currencies\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th>Namespace</th>\n          <th>Stewards</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.namespaces : depth0),{"name":"each","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.accountName || (depth0 != null ? depth0.accountName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"accountName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.balance : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n            <td>"
    + alias4((helpers.decimal_places || (depth0 && depth0.decimal_places) || alias2).call(alias1,(depth0 != null ? depth0.volume : depth0),{"name":"decimal_places","hash":{},"data":data}))
    + "</td>\n          </tr>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.currencyName || (depth0 != null ? depth0.currencyName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"currencyName","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stewards : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n          </tr>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<a href='#stewards/"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "'>"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</a> ";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.blockHelperMissing.call(depth0,container.lambda(depth0, depth0),{"name":"this","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"21":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.id || (depth0 != null ? depth0.id : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"id","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.namespace || (depth0 != null ? depth0.namespace : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"namespace","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.stewards : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</td>\n          </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  <form id='stewardForm' "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n    "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"form-group text-left\">\n      <label for=\"stewardname\">Steward Name</label>\n      <input type=\"text\" id=\"stewardname\" name=\"stewardname\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"Steward Name\" class=\"form-control\" />\n    </div>\n    <div class=\"form-group text-right\">\n      <button type=\"button\" name=\"cancel\" class=\"btn btn-lg btn-primary-outline\" >Cancel</button>\n      <button type=\"button\" name=\"upsert\" class=\"btn btn-lg btn-primary-outline\" >\n        <strong>"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "</strong>\n      </button>\n    </div>\n  </form>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.id : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});

this["openmoney"]["stewards"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "          <tr id=\""
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "\">\n            <td>"
    + alias4(((helper = (helper = helpers.stewardname || (depth0 != null ? depth0.stewardname : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"stewardname","hash":{},"data":data}) : helper)))
    + "</td>\n            <td>"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</td>\n          </tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<style>\n[data-sort=table] > tbody > tr:hover{\n  background-color: #159c6e;\n  cursor: pointer;\n}\n</style>\n<div class=\"col-sm-12\" style=\"padding-top: 10px;\">\n  <h2><strong>Stewards</strong></h2>\n  <div class=\"row text-right\" style=\"padding-top: 20px;padding-bottom: 20px;\">\n    <button type=\"button\" name=\"addSteward\" class=\"btn btn-lg btn-success-outline\">Add Steward</button>\n  </div>\n  <div class=\"table-full\">\n    <table class=\"table display\" data-sort=\"table\">\n      <thead>\n        <tr>\n          <th class=\"\">Steward Name</th>\n          <th class=\"\">Email</th>\n        </tr>\n      </thead>\n      <tbody class=\"table-rows\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.collection : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </tbody>\n    </table>\n  </div>\n</div>\n";
},"useData":true});

this["openmoney"]["welcome"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<section id=\"welcome\" class=\"welcome\">\n    <header id=\"header\" class=\"header\">\n    </header>\n    <section id=\"main\">\n        <img id=\"logo\" src=\"public/assets/images/openmoney-logo-vector.svg\" class=\"svg img-responsive center-block\" alt=\"Openmoney Logo\"/>\n    </section>\n    <footer id=\"footer\" class=\"footer\">\n    </footer>\n</section>\n";
},"useData":true});

return this["openmoney"];

};