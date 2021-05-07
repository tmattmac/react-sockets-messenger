const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const Message = sequelize.define(
  "message",
  {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    scopes: {
      ordered: {
        order: [["createdAt", "ASC"]],
      },
      last: {
        order: [["createdAt", "DESC"]],
        limit: 1,
        required: true,
      },
    },
  }
);

module.exports = Message;
