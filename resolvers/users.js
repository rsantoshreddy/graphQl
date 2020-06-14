module.exports = {
  Query: {
    me: (parent, args, { models }) => models.users[0],
    user: (parent, { id }, { models }, info) => {
      return models.users.filter((user) => user.id === id)[0];
    },
    users: (parent, args, { models }, info) => models.users,
  },
  Mutation: {
    addUser: (parent, { id, name, cars = [] }, { models }) => {
      const user = { id, name, cars };
      models.users.push(user);
      return user;
    },
    removeUser: (parent, { id }, { models }) => {
      let found = false;
      models.users.filter((user) => {
        if (user.id === id) {
          found = true;
        } else {
          return user;
        }
      });

      return found;
    },
  },
  User: {
    cars: (parent, args, { models }) => parent.cars.map((car) => models.cars[car]),
  },
};
