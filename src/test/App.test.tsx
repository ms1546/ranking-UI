import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import App from '../App';
import { fetchRankings } from '../api';

vi.mock('../api', () => ({
  fetchRankings: vi.fn(),
}));

describe('App Component', () => {
  const mockRankings = [
    {
      branch: 'main',
      commitHash: 'abcd1234',
      timestamp: '2025-01-01T12:00:00Z',
      executionTime: 123.45,
    },
    {
      branch: 'feature/test',
      commitHash: 'efgh5678',
      timestamp: '2025-01-02T12:00:00Z',
      executionTime: 234.56,
    },
  ];

  it('should display loading message initially', () => {
    render(<App />);
    expect(screen.getByText('ロード中...')).toBeInTheDocument();
  });

  it('should display rankings when data is fetched', async () => {
    (fetchRankings as jest.Mock).mockResolvedValue(mockRankings);

    render(<App />);

    await waitFor(() => expect(fetchRankings).toHaveBeenCalled());

    mockRankings.forEach((ranking, index) => {
      expect(screen.getByText(`#${index + 1} ${ranking.branch}`)).toBeInTheDocument();
      expect(
        screen.getByText(new Date(ranking.timestamp).toLocaleString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(`処理時間: ${ranking.executionTime.toFixed(2)} ms`)
      ).toBeInTheDocument();
    });
  });

  it('should display "no data" message when rankings are empty', async () => {
    (fetchRankings as jest.Mock).mockResolvedValue([]);

    render(<App />);

    await waitFor(() => expect(fetchRankings).toHaveBeenCalled());
    expect(screen.getByText('ランキングデータがありません。')).toBeInTheDocument();
  });

  it('should handle fetch errors gracefully', async () => {
    (fetchRankings as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    render(<App />);

    await waitFor(() => expect(fetchRankings).toHaveBeenCalled());
    expect(screen.queryByText('ランキングデータがありません。')).not.toBeInTheDocument();
  });
});
