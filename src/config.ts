import { AwsConfig } from './types';

const awsconfig: AwsConfig = {
    aws_project_region: import.meta.env.VITE_REGION,
    aws_appsync_graphqlEndpoint: import.meta.env.VITE_GRAPHQL_ENDPOINT,
    aws_appsync_region: import.meta.env.VITE_REGION,
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: import.meta.env.VITE_GRAPHQL_API_KEY,
  };

  export default awsconfig;
