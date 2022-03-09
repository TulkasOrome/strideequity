import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from '../users/userModel';
import OfferModel from './offerModel';

const db = DataBase.get();

const UserQuestionModel = db.define('Question', {
  question: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  answer: {
    type: DataTypes.TEXT,
  },
  answeredBy: {
    type: DataTypes.INTEGER,
  },
});

UserQuestionModel.belongsTo(UserModel);
UserQuestionModel.belongsTo(OfferModel);

export default UserQuestionModel;
