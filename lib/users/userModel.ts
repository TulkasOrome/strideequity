import { DataTypes } from 'sequelize';
import JsonField from 'sequelize-json';
import passportLocalSequelize from 'passport-local-sequelize';
import DataBase from '../database';

const db = DataBase.get();

const UserModel = passportLocalSequelize.defineUser(db, {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  avatar: {
    type: DataTypes.STRING,
  },
  bio: {
    type: DataTypes.TEXT,
  },
  linkedinId: DataTypes.STRING,
  linkedinUser: JsonField(db, 'User', 'linkedinUser'),
  googleId: DataTypes.STRING,
  googleUser: JsonField(db, 'User', 'googleUser'),
  wholesale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  hasPassword: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifiedId: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verifiedWholesale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'member',
  },
  interests: JsonField(db, 'User', 'interests'),
}, {
  hashField: 'hash',
  saltField: 'salt',
});

export default UserModel;
