const { gql } = require('apollo-server-express');
module.exports = gql`
  extend type Query {
    myCar: Car
    car(id: Int!): Car
    cars: [Car]
  }

  extend type Mutation {
    addCar(id: Int!, owner: Int!): User!
    removeCar(id: Int!): Boolean
  }

  type Car {
    id: ID!
    make: String
    model: String
    owner: User!
  }
`;
