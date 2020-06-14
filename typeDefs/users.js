const { gql } = require('apollo-server-express');
module.exports = gql`
  extend type Query {
    me: User
    users: [User]
    user(id: Int!): User
  }

  extend type Mutation {
    addUser(id: Int!, name: String!): User!
    removeUser(id: Int!): Boolean
  }

  type User {
    id: Int!
    name: String!
    cars: [Car]
  }
`;
