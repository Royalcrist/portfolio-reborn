import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: process.env.NEXT_PUBLIC_API_BASE_GQL || 'http://localhost:1337/graphql',
	cache: new InMemoryCache(),
});

export default client;
