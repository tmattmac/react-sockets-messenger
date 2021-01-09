const { Op } = require('sequelize');
const User = require("../User");

// TODO: Figure out how to prioritize users for which conversations already exist
async function searchUsers(username, searchTerm) {
  const users = await User.findAll({
    where: {
      username: {
        [Op.not]: username,
        [Op.iLike]: `%${searchTerm}%`
      }
    }
  });
  console.log(users);
  return users;
}

module.exports = { searchUsers };