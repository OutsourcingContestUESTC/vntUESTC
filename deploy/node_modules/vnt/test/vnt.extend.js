var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var Vnt = require('../lib/vnt');
var vnt = new Vnt();


var tests = [{
    properties: [new vnt._extend.Property({
        name: 'gasPrice',
        getter: 'core_gasPrice',
        outputFormatter: vnt._extend.formatters.outputBigNumberFormatter
    })]
},{
    methods: [new vnt._extend.Method({
        name: 'getBalance',
        call: 'core_getBalance',
        params: 2,
        inputFormatter: [vnt._extend.utils.toAddress, vnt._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: vnt._extend.formatters.outputBigNumberFormatter
    })]
},{
    property: 'admin',
    properties: [new vnt._extend.Property({
        name: 'gasPrice',
        getter: 'core_gasPrice',
        outputFormatter: vnt._extend.formatters.outputBigNumberFormatter
    })],
    methods: [new vnt._extend.Method({
        name: 'getBalance',
        call: 'core_getBalance',
        params: 2,
        inputFormatter: [vnt._extend.utils.toAddress, vnt._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: vnt._extend.formatters.outputBigNumberFormatter
    })]
}];

describe('vnt', function () {
    describe('_extend', function () {
        tests.forEach(function (test, index) {
            it('test no: ' + index, function () {
                vnt._extend(test);


                if(test.properties)
                    test.properties.forEach(function(property){

                        var provider = new FakeHttpProvider();
                        vnt.setProvider(provider);
                        provider.injectResult('');
                        provider.injectValidation(function (payload) {
                            assert.equal(payload.jsonrpc, '2.0');
                            assert.equal(payload.method, property.getter);
                        });

                        if(test.property) {
                            assert.isObject(vnt[test.property][property.name]);
                            assert.isFunction(vnt[test.property]['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        } else {
                            assert.isObject(vnt[property.name]);
                            assert.isFunction(vnt['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);                        
                        }
                    });

                if(test.methods)
                    test.methods.forEach(function(property){
                        if(test.property)
                            assert.isFunction(vnt[test.property][property.name]);
                        else
                            assert.isFunction(vnt[property.name]);
                    });

            });
        });
    });
});

