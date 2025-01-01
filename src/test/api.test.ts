import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchRankings } from '../api';
import { Benchmark } from '../types';

vi.mock('aws-amplify/api', () => {
  const mockGraphql = vi.fn();
  return {
    generateClient: () => ({
      graphql: mockGraphql,
    }),
    __esModule: true,
    mockGraphql,
  };
});

describe('fetchRankings', () => {
  let mockGraphql: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    const { mockGraphql: importedMockGraphql } = vi.mocked(vi.importActual('aws-amplify/api') as any);
    mockGraphql = importedMockGraphql;
    vi.clearAllMocks();
  });

  it('should fetch and return sorted rankings', async () => {
    const mockResponse = {
      data: {
        listBenchmarks: {
          items: [
            { branch: 'main', timestamp: '2024-01-01T10:00:00Z', executionTime: 120, commitHash: 'abc123' },
            { branch: 'feature', timestamp: '2024-01-01T11:00:00Z', executionTime: 100, commitHash: 'def456' },
          ],
        },
      },
    };

    mockGraphql.mockResolvedValueOnce(mockResponse);

    const expected: Benchmark[] = [
      { branch: 'feature', timestamp: '2024-01-01T11:00:00Z', executionTime: 100, commitHash: 'def456' },
      { branch: 'main', timestamp: '2024-01-01T10:00:00Z', executionTime: 120, commitHash: 'abc123' },
    ];

    const result = await fetchRankings();
    expect(result).toEqual(expected);
    expect(mockGraphql).toHaveBeenCalledWith({ query: expect.any(String) });
  });

  it('should throw an error if GraphQL response contains errors', async () => {
    const mockErrorResponse = {
      errors: [{ message: 'Some error occurred' }],
    };

    mockGraphql.mockResolvedValueOnce(mockErrorResponse);

    await expect(fetchRankings()).rejects.toThrow('Failed to fetch rankings due to GraphQL errors.');
    expect(mockGraphql).toHaveBeenCalledWith({ query: expect.any(String) });
  });

  it('should throw an error if response data is invalid', async () => {
    const mockInvalidResponse = {
      data: null,
    };

    mockGraphql.mockResolvedValueOnce(mockInvalidResponse);

    await expect(fetchRankings()).rejects.toThrow('Invalid response data received from GraphQL.');
    expect(mockGraphql).toHaveBeenCalledWith({ query: expect.any(String) });
  });

  it('should handle unexpected errors gracefully', async () => {
    mockGraphql.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchRankings()).rejects.toThrow('An error occurred while fetching rankings.');
    expect(mockGraphql).toHaveBeenCalledWith({ query: expect.any(String) });
  });
});
