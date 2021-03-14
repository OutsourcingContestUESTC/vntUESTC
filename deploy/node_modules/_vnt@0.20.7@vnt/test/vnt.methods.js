var Vnt = require('../index.js');
var vnt = new Vnt();
var u = require('./helpers/test.utils.js');

describe('vnt', function() {
    describe('methods', function () {
        u.methodExists(vnt, 'sha3');
        u.methodExists(vnt, 'toAscii');
        u.methodExists(vnt, 'fromAscii');
        u.methodExists(vnt, 'toDecimal');
        u.methodExists(vnt, 'fromDecimal');
        u.methodExists(vnt, 'fromWei');
        u.methodExists(vnt, 'toWei');
        u.methodExists(vnt, 'toBigNumber');
        u.methodExists(vnt, 'isAddress');
        u.methodExists(vnt, 'setProvider');
        u.methodExists(vnt, 'reset');
        u.propertyExists(vnt, 'providers');
        u.propertyExists(vnt, 'core');
        u.propertyExists(vnt, 'shh');
    });
});
