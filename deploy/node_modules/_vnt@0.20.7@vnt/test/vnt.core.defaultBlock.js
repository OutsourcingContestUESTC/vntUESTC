var chai = require('chai');
var assert = chai.assert;
var Vnt = require('../index');
var vnt = new Vnt();

describe('vnt.core', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(vnt.core.defaultBlock, 'latest');
        });
    });
});
