import { Benchmark } from './types';
import { API } from 'aws-amplify';

const listBenchmarksQuery = `
  query ListBenchmarks {
    listBenchmarks {
      branch
      timestamp
      executionTime
    }
  }
`;

export async function fetchRankings(): Promise<Benchmark[]> {
  const response = (await API.graphql({ query: listBenchmarksQuery })) as any;
  return response.data.listBenchmarks.sort(
    (a: Benchmark, b: Benchmark) => a.executionTime - b.executionTime
  );
}
