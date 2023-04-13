const express = require('express');
const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/author', () => {
	it('should respond with an array of authors', async () => {
		const response = await supertest(app)
			.get('/api/author')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(200)

		expect(!isNaN(response.body[1].id)).toBe(true);
		expect(isNaN(response.body[1].surname) && typeof response.body[1].surname ==='string').toBe(true);
		expect(isNaN(response.body[1].name) && typeof response.body[1].name ==='string').toBe(true);
	});

	it('should respond with an individual author', async () => {
		const response = await supertest(app)
			.get('/api/author/1')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(200)

		expect(response.body.id).toBe(1);
	});

	it('should respond with 404 for a not found author', async () => {
		const response = await supertest(app)
			.get('/api/author/213742069')
			.set('Authorization', `Bearer ${process.env.LONG_LIVE_JWT}`)
			.expect('Content-Type', /json/)
			.expect(404)
	});
});