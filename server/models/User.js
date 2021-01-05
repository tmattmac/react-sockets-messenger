const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');

class User extends Model {

  /** 
   * given a username and password, return the user if found and password
   * matches; throws an error otherwise
   */
  static authenticate(username, password) {
    const user = User.findByPk(username);
    if (!user) {
      throw new Error("A user with that username could not be found.");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error("The password entered was incorrect.");
    }
    return user;
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(pw) {
      const hashedPw = bcrypt.hashSync(pw, +process.env.BCRYPT_ROUNDS || 10);
      this.setDataValue('password', hashedPw);
    }
  }
}, {
  sequelize,
  modelName: 'User'
});

module.exports = User;