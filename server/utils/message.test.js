const expect = require('expect');

const {generateMessage} = require('./message');

describe('message.js', () => {
    it('should generate a correct message object', () => {
        let from = 'Test';
        let text = 'Some message';

        let message = generateMessage(from, text);

        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });
});