var chai = require('chai');
var assert = chai.assert;
var Vnt = require('../index.js');
var vnt = new Vnt();
var u = require('./helpers/test.utils.js');

describe('vnt.core', function() {
    describe('methods', function() {
        u.methodExists(vnt.core, 'getBalance');
        u.methodExists(vnt.core, 'getStorageAt');
        u.methodExists(vnt.core, 'getTransactionCount');
        u.methodExists(vnt.core, 'getCode');
        u.methodExists(vnt.core, 'sendTransaction');
        u.methodExists(vnt.core, 'call');
        u.methodExists(vnt.core, 'getBlock');
        u.methodExists(vnt.core, 'getTransaction');
        u.methodExists(vnt.core, 'getBlockTransactionCount');
        u.methodExists(vnt.core, 'filter');
        u.methodExists(vnt.core, 'contract');

        u.propertyExists(vnt.core, 'coinbase');
        u.propertyExists(vnt.core, 'mining');
        u.propertyExists(vnt.core, 'gasPrice');
        u.propertyExists(vnt.core, 'accounts');
        u.propertyExists(vnt.core, 'defaultBlock');
        u.propertyExists(vnt.core, 'blockNumber');
        u.propertyExists(vnt.core, 'protocolVersion');
    });
});
