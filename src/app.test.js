const supertest = require('supertest');

const app = require('./app');

describe('GET /', () => {
	it('should respond with a message', async () => {
		const response = await supertest(app)
			.get('/')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(200)
		
		expect(response.body.message).toEqual('📚 Book list API 📚');
			
	});
});