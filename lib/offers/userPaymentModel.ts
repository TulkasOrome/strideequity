import { DataTypes } from 'sequelize';
import DataBase from '../database';
import OfferModel from './offerModel';
import BankAccountModel from '../users/BankAccountModel';
import UserModel from '../users/userModel';

const db = DataBase.get();

const UserPaymentModel = db.define('Payment', {
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shares: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  BankAccountId: {
    type: DataTypes.INTEGER,
  },
  key: {
    type: DataTypes.STRING,
    defaultValue: 'xyz',
  },
});

UserPaymentModel.belongsTo(OfferModel);
UserPaymentModel.belongsTo(UserModel);
export default UserPaymentModel;
