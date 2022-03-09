import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from './userModel';

const db = DataBase.get();

const AuthAccountModel = db.define('AuthAccountModel', {
  compoundId: {
    type: DataTypes.STRING,
    unique: true,
  },
  provider: {
    type: DataTypes.STRING,
  },
  providerAccountId: {
    type: DataTypes.STRING,
  },
  refreshToken: {
    type: DataTypes.STRING,
  },
  accessToken: {
    type: DataTypes.STRING,
  },
  accessTokenExpires: {
    type: DataTypes.DATE,
  },
})

AuthAccountModel.belongsTo(UserModel);

export default AuthAccountModel;
