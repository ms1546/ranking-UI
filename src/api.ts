import { Benchmark } from './types';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import awsconfig from './config';

Amplify.configure(awsconfig);

const client = generateClient();

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
  const response = (await client.graphql({ query: listBenchmarksQuery })) as any;
  return response.data.listBenchmarks.sort(
    (a: Benchmark, b: Benchmark) => a.executionTime - b.executionTime
  );
}
