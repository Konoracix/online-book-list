const express = require('express');
const { idleTimeoutMillis } = require('pg/lib/defaults');
const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/author', () => {
	it('should respond with an array of authors', async () => {
		const response = await supertest(app)
			.get('/api/author')
			.expect('Content-Type', /json/)
			.expect(200)

		expect(response.body.length).toBeGreaterThan(0);
	});
});