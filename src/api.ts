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
        commitHash
      }
    }
  }
`;

export async function fetchRankings(): Promise<Benchmark[]> {
  try {
    const response: any = await client.graphql({ query: listBenchmarksQuery });

    if (response.errors) {
      console.error("GraphQL Errors:", response.errors);
      throw new Error("Failed to fetch rankings due to GraphQL errors.");
    }

    if (!response.data || !response.data.listBenchmarks || !response.data.listBenchmarks.items) {
      console.error("Invalid Response Data:", response.data);
      throw new Error("Invalid response data received from GraphQL.");
    }

    const sortedRankings = response.data.listBenchmarks.items.sort(
      (a: Benchmark, b: Benchmark) => a.executionTime - b.executionTime
    );

    return sortedRankings;
  } catch (error) {
    console.error("Error fetching rankings:", error);
    throw new Error("An error occurred while fetching rankings.");
  }
}
