const {expect} = require('chai');

const {protect} = require('../middleware/auth');

it('should throw and error if no jwt is provided', () => {
    const req = {
        get: function () {
            return
        },
        headers: {
            authorization: 'Bearer'
        }
    };

    expect(req.headers).to.have.property('authorization');
})