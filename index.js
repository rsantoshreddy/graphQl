const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const app = express();
const models = require('./models');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
});

server.applyMiddleware({ app });

app.listen(3000, () => console.log('Profile app with graphql is running @3000'));
