const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const app = express();
let users = require('./users');
const cars = require('./cars');

const typeDefs = gql`
  type Query {
    me: User
    users: [User]
    user(id: Int!): User
    myCar: Car
    car(id: Int!): Car
    cars: [Car]
  }

  type Mutation {
    addUser(id: Int!, name: String!): User!
    removeUser(id: Int!): Boolean
    addCar(id: Int!, owner: Int!): User!
    removeCar(id: Int!): Boolean
  }

  type User {
    id: Int!
    name: String!
    cars: [Car]
  }
  type Car {
    id: ID!
    make: String
    model: String
    owner: User!
  }
`;
const resolvers = {
  Query: {
    me: () => users[0],
    user: (parent, { id }, context, info) => {
      return users.filter((user) => user.id === id)[0];
    },
    users: () => users,
    car: (parent, args) => cars[0],
    cars: () => cars,
  },
  Mutation: {
    addUser: (parent, { id, name, cars = [] }) => {
      console.log('user added');
      const user = { id, name, cars };
      users.push(user);
      console.log(users);

      return user;
    },
    removeUser: (parent, { id }) => {
      let found = false;
      console.log(id);
      users.filter((user) => {
        if (user.id === id) {
          found = true;
        } else {
          return user;
        }
      });

      return found;
    },
    addCar: (id, owner) => cars.push({ id, owner }),
    removeCar: (id) => {
      let found = false;
      cars.filter((car) => {
        if (car.id === id) {
          found = true;
        } else {
          return car;
        }
      });

      return found;
    },
  },
  Car: {
    owner: (parent) => users[parent.owner],
  },
  User: {
    cars: (parent) => parent.cars.map((car) => cars[car]),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(3000, () => console.log('Profile app with graphql is running @3000'));
