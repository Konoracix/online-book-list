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

	it('should respond with an individual author', async () => {
		const response = await supertest(app)
			.get('/api/author/1')
			.expect('Content-Type', /json/)
			.expect(200)

		expect(response.body.id).toBe(1);
	});

	it('should respond with 404 for a not found author', async () => {
		const response = await supertest(app)
			.get('/api/author/213742069')
			.expect('Content-Type', /json/)
			.expect(404)
	});
});