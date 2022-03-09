import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from '../users/userModel';
import OfferModel from './offerModel';

const db = DataBase.get();

const UserInterestModel = db.define('Interest', {
  range: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

UserInterestModel.belongsTo(UserModel);
UserInterestModel.belongsTo(OfferModel);

export default UserInterestModel;
