var chai = require('chai');
var assert = chai.assert;
var Vnt = require('../index.js');
var vnt = new Vnt();
var u = require('./helpers/test.utils.js');

describe('vnt.shh', function() {
    describe('methods', function() {
        u.methodExists(vnt.shh, 'version');
        u.methodExists(vnt.shh, 'info');
        u.methodExists(vnt.shh, 'setMaxMessageSize');
        u.methodExists(vnt.shh, 'setMinPoW');
        u.methodExists(vnt.shh, 'markTrustedPeer');
        u.methodExists(vnt.shh, 'newKeyPair');
        u.methodExists(vnt.shh, 'addPrivateKey');
        u.methodExists(vnt.shh, 'deleteKeyPair');
        u.methodExists(vnt.shh, 'hasKeyPair');
        u.methodExists(vnt.shh, 'getPublicKey');
        u.methodExists(vnt.shh, 'getPrivateKey');
        u.methodExists(vnt.shh, 'newSymKey');
        u.methodExists(vnt.shh, 'addSymKey');
        u.methodExists(vnt.shh, 'generateSymKeyFromPassword');
        u.methodExists(vnt.shh, 'hasSymKey');
        u.methodExists(vnt.shh, 'getSymKey');
        u.methodExists(vnt.shh, 'deleteSymKey');
        u.methodExists(vnt.shh, 'newMessageFilter');
        u.methodExists(vnt.shh, 'post');

    });
});

