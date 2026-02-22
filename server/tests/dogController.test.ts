import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

describe('DogController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let jsonMock: ReturnType<typeof vi.fn>;
  let statusMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    jsonMock = vi.fn().mockReturnValue(mockResponse);
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });

    mockRequest = {};
    mockResponse = {
      json: jsonMock,
      status: statusMock
    } as unknown as Response;
  });

  // Test 3
  it('should return JSON with success true and mocked dog data', async () => {
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/bernard/n0210525_15579.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValueOnce(mockDogData);

    await getDogImage(mockRequest as Request, mockResponse as Response);

    expect(jsonMock).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
    });
  });
});
