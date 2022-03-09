import { DataTypes, Deferrable } from 'sequelize';
import DataBase from '../database';
import UserModel from './userModel';

const db = DataBase.get();

const BankAccountModel = db.define('BankAccount', {
  number: {
    type: DataTypes.STRING,
  },
  sortCode: {
    type: DataTypes.STRING,
  },
  accountHolder: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  bank: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
    defaultValue: 'AU',
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
});

BankAccountModel.belongsTo(UserModel);

export default BankAccountModel;
