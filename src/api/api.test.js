const { idleTimeoutMillis } = require('pg/lib/defaults');
const supertest = require('supertest');

const app = require('../app');

describe('Get /api', () => {
	it('should respond with a message', async () => {
		const response = await supertest(app)
			.get('/api')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(200)
		expect(response.body.message).toEqual('📚 Book list API 📚');
	})
});