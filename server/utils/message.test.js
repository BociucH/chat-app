const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

describe('message.js', () => {
    it('should generate a correct message object', () => {
        let from = 'Test';
        let text = 'Some message';

        let message = generateMessage(from, text);

        expect(message).toInclude({from, text});
        expect(message.createdAt).toBeA('number');
    });

    it('should generate correct location object', () => {
        let from = 'Test';
        let latitude = 15;
        let longitude = 19;
        let url = 'https://www.google.com/maps?q=15,19';

        let message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});