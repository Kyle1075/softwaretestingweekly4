import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('DogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Test 1
  it('should return imageUrl and status "success" when API call is successful', async () => {
    const mockData = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockData
    } as Response);

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe('success');
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  // Test 2
  it('should throw an error when API returns error status', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image'
    );
  });
});
