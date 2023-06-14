const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/book', () => {
	it('should respond with an array of books', async () => {
		const response = await supertest(app)
			.get('/api/book')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(200)

		// current_page
		expect(response.body.current_page).not.toBeNAN;
		expect(response.body.current_page).toEqual(1);

		// limit 
		expect(response.body.limit).not.toBeNAN;
		expect(response.body.limit).toEqual(10);

		// total_pages
		expect(response.body.total_pages).not.toBeNAN;
		expect(response.body.total_pages).toBeGreaterThan(0);

		// data
		expect(response.body.data.length).toBeGreaterThan(0);
		expect(response.body.data[0].id).not.toBeNAN;
		expect(response.body.data[0].title).toBeNAN;
		expect(response.body.data[0].author_id).not.toBeNAN;
		expect(response.body.data[0].created_at).toBeNAN;
		expect(response.body.data[0].created_at).toBeNAN;
		expect(response.body.data[0].deleted_at).toEqual(null);
	})
});

describe('GET /api/book/:id', () => {
	it('should respond with a single book', async () => {
		const response = await supertest(app)
			.get('/api/book/1')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(200)
		expect(isNaN(response.body.title)).toEqual(true);
		expect(response.body.title.length).toBeGreaterThan(1);
	})

	// wrong id (should be integer)
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.get('/api/book/321310000023')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(400)
		expect(response.body).toEqual({});
	})

	// not existing book
	it('should respond with a 404 (Not Found) status code', async () => {
		const response = await supertest(app)
			.get('/api/book/3213123')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(404)
		expect(response.body).toEqual({});
	})

	// wrong data in id parameter
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.get('/api/book/abc')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(400)
		expect(response.body).toEqual({})
	})
});

describe('POST /api/book', () => {
	it('should create a single book', async () => {
		const response = await supertest(app)
			.post('/api/book')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.send({
				title: "Test book",
				author_id: 4
			})
			.expect(200)
		expect(response.body.id).toBeGreaterThan(1);
		expect(response.body.title).toEqual("Test book");
		expect(response.body.author_id).toEqual(4);
		expect(response.body.created_at).toBeNAN;
		expect(response.body.updated_at).toBeNAN;
		expect(response.body.deleted_at).toEqual(null);

	})

	// lack of data to add a book
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.post('/api/book')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.send({
				title: "Test book"
			})
			.expect(400);
		expect(response.body).toEqual({});
	})

	// not existing author
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.post('/api/book')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.send({
				title: "Test book",
				author_id: 12312312
			})
			.expect(404);
		expect(response.body).toEqual({});
	})

	// wrong data in author_id field
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.post('/api/book')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.send({
				title: "Test book",
				author_id: "ABC"
			})
			.expect(400);
		expect(response.body).toEqual({});
	})
})

describe('PUT /api/book/:id', () => {

	it('should respond edited book', async () => {
		const response = await supertest(app)
			.put('/api/book/12')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.send({
				title: "historia bez cenzury 23",
    		author_id: 3,
    		deleted_at: null
			})
			.expect(200)
		expect(response.body.id).toEqual(12);
		expect(response.body.title).toBeNAN;
		expect(response.body.title.length).toBeGreaterThan(22);
		expect(response.body.author_id).not.toBeNAN;
		expect(response.body.created_at).toBeNAN;
		expect(response.body.updated_at).toBeNAN;
		expect(response.body.deleted_at).toEqual(null);
	})

	// wrong id (should be integer)
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.put('/api/book/10000000000')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(400)
		expect(response.body).toEqual({});
	})

	// not existing book
	it('should respond with a 404 (Not Found) status code', async () => {
		const response = await supertest(app)
			.put('/api/book/100000')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(404)
		expect(response.body).toEqual({});
	})

	// wrong data in author_id parameter 
	it('should respond with a 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.put('/api/book/12')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.send({
				title: "historia bez cenzury 23",
    		author_id: "abc",
    		deleted_at: null
			})
			.expect(400)
		expect(response.body).toEqual({});
	})
})

describe('DELETE /api/book/:id', () => {

	it('should respond with deleted book', async () => {
		const response = await supertest(app)
			.delete('/api/book/12')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(200)
		expect(response.body.id).toEqual(12);
		expect(response.body.title).toBeNAN;
		expect(response.body.title.length).toBeGreaterThan(22);
		expect(response.body.author_id).not.toBeNAN;
		expect(response.body.created_at).toBeNAN;
		expect(response.body.updated_at).toBeNAN;
		expect(response.body.deleted_at).not.toEqual(null);
	})

	// wrong data in id parameter
	it('should respond with 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.delete('/api/book/abc')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(400)
	})

	// not existing book
	it('should respond with 404 (Not Found) status code', async () => {
			const response = await supertest(app)
				.delete('/api/book/100000')
				.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
				.expect(404)
	})

	// wrong id (should be integer)
	it('should respond with 400 (Bad Request) status code', async () => {
		const response = await supertest(app)
			.delete('/api/book/1231231223123')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect(400)
	})
})