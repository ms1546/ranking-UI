import { Benchmark } from './types';
import { generateClient } from 'aws-amplify/api';
import { Amplify } from 'aws-amplify';
import awsconfig from './config';

Amplify.configure(awsconfig);
const client = generateClient();

const listBenchmarksQuery = `
  query ListBenchmarks {
    listBenchmarks {
      items {
        branch
        timestamp
        executionTime
      }
    }
  }
`;

export async function fetchRankings(): Promise<Benchmark[]> {
  try {
    const response: any = await client.graphql({ query: listBenchmarksQuery });
    console.log("GraphQL Response:", response);
    return response.data.listBenchmarks.items.sort(
      (a: Benchmark, b: Benchmark) => a.executionTime - b.executionTime
    );
  } catch (error) {
    console.error("Error fetching rankings:", error);
    throw error;
  }
}
