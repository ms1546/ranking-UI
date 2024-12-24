const awsconfig: any = {
    aws_appsync_graphqlEndpoint: process.env.VITE_GRAPHQL_ENDPOINT,
    aws_appsync_region: process.env.VITE_REGION,
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: process.env.VITE_GRAPHQL_API_KEY,
};

export default awsconfig;
