import { DataTypes } from 'sequelize';
import DataBase from '../database';

const db = DataBase.get();

const VerificationRequestModel = db.define('VerificationRequest', {
  identitifer: DataTypes.STRING,
  token: {
    type: DataTypes.STRING,
    unique: true,
  },
  expires: DataTypes.DATE,
})


export default VerificationRequestModel;
