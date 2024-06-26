const request = require('supertest');
const app = require('../src/app');

describe('User API', () => {
    it('should list all users', async () => {
        const res = await request(app).get('/worko/user').set('Authorization', 'your_token_here');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Add more tests for other endpoints
});
