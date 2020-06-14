const { gql } = require('apollo-server-express');
const usersTypeDefs = require('./users');
const carsTypeDefs = require('./cars');

const defaultTypeDef = require('./default');

module.exports = [defaultTypeDef, usersTypeDefs, carsTypeDefs];
