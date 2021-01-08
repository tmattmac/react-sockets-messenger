require('dotenv').config();

const sequelize = require('./db');
const User = require('./User');
const Message = require('./Message');
const Conversation = require('./Conversation');
const ConversationUser = require('./ConversationUser');
const associations = require('./associations');

if (require.main === module) {
  if (!process.env.DB_NAME) {
    console.error("Error: Database info not found. Did you create a .env in the root directory?");
    process.exit(1);
  }

  sequelize.sync({ force: true })
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}