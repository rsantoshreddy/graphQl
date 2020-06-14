module.exports = {
  Query: {
    car: (parent, args, { models }) => models.cars[0],
    cars: (parent, args, { models }) => models.cars,
  },
  Mutation: {
    addCar: (parent, { id, owner }, { models }) => models.cars.push({ id, owner }),
    removeCar: (parent, { id }, { models }) => {
      let found = false;
      models.cars.filter((car) => {
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
    owner: (parent, args, { models }) => models.users[parent.owner],
  },
};
