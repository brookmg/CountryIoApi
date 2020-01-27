import { start } from './server'
import { startApolloServer } from './graphql/server';

start();    // Start the Rest API
startApolloServer(); // Start the GQL server