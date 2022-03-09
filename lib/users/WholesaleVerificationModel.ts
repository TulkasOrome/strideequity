import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from './userModel';

const db = DataBase.get();

const WholesaleVerificationModel = db.define('WholesaleVerification', {
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  documentation: {
    type: DataTypes.STRING,
  },
  verifiedBy: {
    type: DataTypes.INTEGER,
  },
});

WholesaleVerificationModel.belongsTo(UserModel);

export default WholesaleVerificationModel;
