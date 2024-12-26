export interface Benchmark {
    branch: string;
    timestamp: string;
    executionTime: number;
    commitHash: string;
  }

export interface AwsConfig {
  aws_project_region: string;
  aws_appsync_graphqlEndpoint: string;
  aws_appsync_region: string;
  aws_appsync_authenticationType: string;
  aws_appsync_apiKey: string;
}
