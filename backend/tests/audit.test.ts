import request from 'supertest';
import app from '../src/app';

describe('POST /api/audit API Test Suite', () => {
  describe('Happy Path Tests', () => {
    it('should successfully audit a valid HTML website and return all required metrics', async () => {
      const res = await request(app)
        .post('/api/audit')
        .send({ url: 'https://example.com' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('status', 200);
      expect(res.body).toHaveProperty('responseTime');
      expect(typeof res.body.responseTime).toBe('number');
      expect(res.body).toHaveProperty('title');
      expect(typeof res.body.title).toBe('string');
      expect(res.body).toHaveProperty('metaDescription');
      expect(typeof res.body.metaDescription).toBe('string');
      expect(res.body).toHaveProperty('h1Count');
      expect(typeof res.body.h1Count).toBe('number');
      expect(res.body).toHaveProperty('imagesWithoutAlt');
      expect(typeof res.body.imagesWithoutAlt).toBe('number');
      expect(res.body).toHaveProperty('wordCount');
      expect(typeof res.body.wordCount).toBe('number');
    }, 15000);
  });

  describe('Failure Mode Tests', () => {
    it('Failure Case 1: Malformed protocol or empty URL should return HTTP 400 validation error', async () => {
      const res = await request(app)
        .post('/api/audit')
        .send({ url: 'http://' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe('INVALID_URL');
      expect(res.body.error).toContain('Invalid URL format');
    });

    it('Failure Case 1 (Missing payload): Missing URL field should return HTTP 400 Bad Request', async () => {
      const res = await request(app).post('/api/audit').send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe('INVALID_URL');
    });

    it('Failure Case 2: Unsupported Content-Type (JSON payload) should return HTTP 422', async () => {
      const res = await request(app)
        .post('/api/audit')
        .send({ url: 'https://jsonplaceholder.typicode.com/todos/1' });

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
      expect(res.body.status).toBe(422);
      expect(res.body.message).toBe('Only HTML webpages are supported.');
      expect(res.body.code).toBe('NON_HTML_RESPONSE');
    }, 15000);

    it('Failure Case 3: Unreachable domain / DNS failure should return HTTP 400 with DNS_LOOKUP_FAILED', async () => {
      const res = await request(app)
        .post('/api/audit')
        .send({ url: 'https://thisdomainshouldneverexist12345abcxyz.com' });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.code).toBe('DNS_LOOKUP_FAILED');
      expect(res.body.error).toContain('DNS lookup failed');
    }, 15000);
  });
});
