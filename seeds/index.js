const sequelize = require('../config/connection');

const seedUser = require('./userSeedData');
const seedPost = require('./postSeedData');
const seedComment = require('./commentSeedData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();