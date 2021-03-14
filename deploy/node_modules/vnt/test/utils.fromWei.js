var assert = require('assert');
var utils = require('../lib/utils/utils.js');

describe('lib/utils/utils', function () {
    describe('fromWei', function () {
        it('should return the correct value', function () {

            assert.equal(utils.fromWei(1000000000000000000, 'wei'),    '1000000000000000000');
            assert.equal(utils.fromWei(1000000000000000000, 'kwei'),   '1000000000000000');
            assert.equal(utils.fromWei(1000000000000000000, 'mwei'),   '1000000000000');
            assert.equal(utils.fromWei(1000000000000000000, 'gwei'),   '1000000000');
            assert.equal(utils.fromWei(1000000000000000000, 'vnt'),  '1');
        });
    });
});
