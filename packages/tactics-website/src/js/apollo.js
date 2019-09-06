import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const client = new ApolloClient({
    // Provide required constructor fields
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: `http://localhost:${__PORT__}/graphql`
    })
});

export default client;
