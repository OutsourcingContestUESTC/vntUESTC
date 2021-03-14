var chai = require('chai');
var assert = chai.assert; 
var Vnt = require('../index.js');
var vnt = new Vnt();
var u = require('./helpers/test.utils.js');

describe('vnt.net', function() {
    describe('methods', function() {
        u.propertyExists(vnt.net, 'listening');
        u.propertyExists(vnt.net, 'peerCount');
    });
});
