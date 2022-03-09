import { DataTypes } from 'sequelize';
import DataBase from '../database';

const db = DataBase.get();

const SessionModel = db.define('Session', {
  userId: {
    type: DataTypes.INTEGER,
  },
  expires: {
    type: DataTypes.DATE,
  },
  sessionToken: {
    type: DataTypes.STRING,
    unique: true,
  },
  accessToken: {
    type: DataTypes.STRING,
    unique: true,
  },
})


export default SessionModel;
