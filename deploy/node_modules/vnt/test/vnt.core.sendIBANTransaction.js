var chai = require('chai');
var assert = chai.assert;
var Vnt = require('../index');
var vnt = new Vnt();
var FakeHttpProvider2 = require('./helpers/FakeHttpProvider2');

describe('vnt.core.sendIBANTransaction', function () {
    it('should send transaction', function () {

        var iban = 'XE81VNTXREGGAVOFYORK';
        var address =   '0x1234567890123456789012345678901234500000';
        var exAddress = '0x1234567890123456789012345678901234567890'

        var provider = new FakeHttpProvider2();
        vnt.setProvider(provider);
        vnt.reset();

        provider.injectResultList([{
            result: exAddress
        }, {
            result: ''
        }]);

        var step = 0;
        provider.injectValidation(function (payload) {
            if (step === 0) {
                step++;
                assert.equal(payload.method, 'core_call');
                assert.deepEqual(payload.params, [{
                   data: "0x3b3b57de5852454700000000000000000000000000000000000000000000000000000000",
                   to: vnt.core.icapNamereg().address
                }, "latest"]);

                return;
            }
            assert.equal(payload.method, 'core_sendTransaction');
            assert.deepEqual(payload.params, [{
                data: '0xb214faa54741564f46594f524b0000000000000000000000000000000000000000000000',
                from: address,
                to: exAddress,
                value: payload.params[0].value // don't check this
            }]);
        });

        // vnt.core.sendIBANTransaction(address, iban, 10000);

    });
});
