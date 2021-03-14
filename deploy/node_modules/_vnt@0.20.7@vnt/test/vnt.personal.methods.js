var chai = require('chai');
var assert = chai.assert;
var Vnt = require('../index.js');
var vnt = new Vnt();
var u = require('./helpers/test.utils.js');

describe('vnt.net', function() {
    describe('methods', function() {
        u.propertyExists(vnt.personal, 'listAccounts');
        u.methodExists(vnt.personal, 'newAccount');
        u.methodExists(vnt.personal, 'unlockAccount');
    });
});
