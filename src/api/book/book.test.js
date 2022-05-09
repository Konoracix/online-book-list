const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/book', () => {
	it('should respond with an array of books', async () => {
		const response = await supertest(app)
			.get('/api/book')
			.expect('Content-Type', /json/)
			.expect(200)

		expect(response.body.length).toBeGreaterThan(0);
	})

	it('should respond with a single book', async () => {
		const response = await supertest(app)
			.get('/api/book/1')
			.expect('Content-Type', /json/)
			.expect(200)
		console.log(response.body);
		console.log(response.body.length);
		expect(isNaN(response.body.title)).toEqual(true);
		expect(response.body.title.length).toBeGreaterThan(1);
	})
});