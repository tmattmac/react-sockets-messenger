const { Op } = require('sequelize');
const User = require("../User");

async function searchUsers(username, searchTerm) {
  const users = await User.findAll({
    where: {
      username: {
        [Op.not]: username,
        [Op.iLike]: searchTerm
      }
    }
  });
  return users;
}

module.exports = { searchUsers };