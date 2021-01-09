const { Model, DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');

class User extends Model {

  /** 
   * given a username and password, return the user if found and password
   * matches; throws an error otherwise
   */
  static async authenticate(username, password) {
    const user = await User.scope('all').findByPk(username);

    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new Error("The credentials you entered were incorrect.")
  }
}

User.init({
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "That email address has been taken."
    }
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "That username has been taken."
    },
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
  modelName: 'user',
  scopes: {
    all: { attributes: { exclude: [] } }
  },
  defaultScope: {
    attributes: ['username']
  }
});

module.exports = User;