require('dotenv').config();

const sequelize = require('./db');
const User = require('./User');

if (!process.env.DB_NAME) {
  console.error("Error: Database info not found. Did you create a .env in the root directory?");
  process.exit(1);
}

sequelize.sync({ force: true })
  .then(() => process.exit(0))
  .catch(() => {
    console.error(`Error: Either the database '${process.env.DB_NAME}' doesn't exist or the credentials provided were invalid.`);
    process.exit(1);
  });