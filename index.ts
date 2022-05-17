'use strict';

import { loadSchema } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { bindDirectiveTransformer } from './lib';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer, ServerInfo } from 'apollo-server';
import { GraphQLSchema } from 'graphql';

loadSchema('./schema.graphql', {
  loaders: [new GraphQLFileLoader()]
}).then((schema: GraphQLSchema) => {
  schema = bindDirectiveTransformer(schema);

  const server = new ApolloServer({ 
    schema
  });

  return server.listen();
}).then(({ url }: ServerInfo) => {
  console.log(`🚀  Server ready at ${url}`);
});