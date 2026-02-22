import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Express } from 'express';
import dogRoutes from '../routes/dogRoutes';
import * as dogService from '../services/dogService';

describe('DogRoutes', () => {
  let app: Express;

  beforeEach(() => {
    vi.clearAllMocks();

    app = express();
    app.use(express.json());
    app.use('/api/dogs', dogRoutes);
  });

  // Test 4
  it('should return status 200 with success true and mocked imageUrl', async () => {
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/stbernard/n0210525_15579.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDogData);

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockDogData.imageUrl);
  });

  // Test 5
  it('should return status 500 with error when service throws', async () => {
    const errorMessage = 'Failed to fetch dog image: Network error';

    vi.spyOn(dogService, 'getRandomDogImage').mockRejectedValueOnce(
      new Error(errorMessage)
    );

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toContain('Failed to fetch dog image');
  });
});
