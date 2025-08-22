import { renderHook, act } from '@testing-library/react';
import usePexelsApi from '../hook/UsePexelApi'; // Adjust the import path as needed
import { Photo } from '../types/pexels'; // Assuming this is your type definition path

// --- MOCK SETUP ---

// We cast fetch to jest.Mock so TypeScript understands it's a mock function
// with methods like .mockClear(), .mockImplementation(), etc.
global.fetch = jest.fn() as jest.Mock;

// Helper function to create a mock successful response.
// We type the parameters and the return value for type safety.
const createMockSuccessResponse = (
  photos: Photo[] = [],
  total_results = 1,
  page = 1,
  per_page = 24
): Promise<{ ok: boolean; json: () => Promise<any> }> => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      photos,
      total_results,
      page,
      per_page,
    }),
  });
};

// Helper function to create a mock error response.
const createMockErrorResponse = (): Promise<never> => {
  return Promise.reject(new Error('Network error'));
};


// --- TESTS ---

describe('usePexelsApi', () => {

  // Before each test, clear mock history and reset environment variables
  // to ensure tests are isolated.
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    // It's safer to manage env variables this way for tests
   
  });


  it('should return the initial state correctly', () => {
    // ARRANGE & ACT: Render the hook
    const { result } = renderHook(() => usePexelsApi());

    // ASSERT: Check if the initial values are as expected
    expect(result.current.photos).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(false);
    expect(result.current.totalResults).toBe(0);
  });

  
  it('should return an error if the PEXELS_API_KEY is not set', async () => {
    // ARRANGE: Render the hook. The API key is undefined due to beforeEach.
    const { result } = renderHook(() => usePexelsApi());

    // ACT: Try to search for images
    await act(async () => {
      await result.current.searchImages('nature');
    });

    // ASSERT: Check that the correct error message is set and fetch was not called
    expect(result.current.error).toContain('Pexels API key not found');
    expect(fetch).not.toHaveBeenCalled();
  });
  
});