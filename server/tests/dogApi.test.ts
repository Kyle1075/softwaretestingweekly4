import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Express } from 'express';
import dogRoutes from '../routes/dogRoutes';
import * as dogService from '../services/dogService';

describe('DogApi', () => {
  let app: Express;

  beforeEach(() => {
    vi.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use('/api/dogs', dogRoutes);

    // 404 handler
    app.use((_req, res) => {
      res.status(404).json({
        success: false,
        error: 'Route not found'
      });
    });
  });

  // Test 1
  it('return status 200 with success true, data and imageUrl as string', async () => {
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/sheepdog-indian/Himalayan_Sheepdog.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDogData);

    const response = await request(app).get('/api/dogs/random');


    expect(response.status).toBe(200);


    expect(response.body.success).toBe(true);

   
    expect(response.body.data).toBeDefined();

    expect(response.body.data.imageUrl).toBeDefined();

    expect(typeof response.body.data.imageUrl).toBe('string');
  });

  // Test 2
  it('return status 404 with error message for invalid route', async () => {
    const response = await request(app).get('/api/dogs/invalid');

    expect(response.status).toBe(404);

    expect(response.body.error).toBeDefined();

    expect(response.body.error).toMatch(/not found/i);
  });
});