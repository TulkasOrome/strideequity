import { DataTypes } from 'sequelize';
import JsonField from 'sequelize-json';
import DataBase from '../database';

const db = DataBase.get();

const SubscriptionModel = db.define('Subscription', {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  invest: {
    type: DataTypes.BOOLEAN
  },
  news: {
    type: DataTypes.BOOLEAN
  },
  raise: {
    type: DataTypes.BOOLEAN
  },
  interests: JsonField(db, 'Subscription', 'interests'),
})


export default SubscriptionModel;
