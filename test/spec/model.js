/*global describe, it, expect, sinon, Merchant */
'use strict';

describe('Tests for model', function () {
    //var Merchants = require('../../app/models/merchants');

    it('should create global variables for sinon', function () {
        expect(sinon).to.be.exist;
    });

    it('should create global variables for Merchant', function () {
        expect(Merchant).to.be.exist;
    });

    it('should be created with default values for its attributes', function() {
        var merchant = new Merchant();
        expect(merchant.get('merchantname')).to.equal('');
    });

    it('should fire a custom event when state change', function() {
        var spy = sinon.spy();

        var merchant = new Merchant();

        merchant.on('change', spy);

        //merchant.set({'password': '12345', 'email': 'test@test.com'});
        merchant.set('merchantname', 'myname');
        merchant.set('merchantname', 'myname2');

        sinon.assert.calledTwice(spy);
    });

    // it('should trigger an invalid event on failed validation', function() {
    //     var errorCallback = sinon.spy();
    //     //var sucessCallback = sinon.spy();
    //     var merchant = new Merchant();
    //
    //     //merchant.on('invalid', errorCallback);
    //     var options = {};
    //     options.error = errorCallback;
    //     //options.sucess = sucessCallback;
    //
    //     merchant.save({ merchantname: 'test' }, options).done(function(){
    //       sinon.assert.calledOnce(errorCallback);
    //
    //       //sinon.assert.calledWithMatch(errorCallback, merchant, 'Merchant.merchantname must be a boolean value.');
    //       // Unless set {validate:true} to be called before set
    //       expect(merchant.get('merchantname')).to.equal('test');
    //     });
    // });
});
