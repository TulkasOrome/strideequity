import { DataTypes } from 'sequelize';
import JsonField from 'sequelize-json';
import DataBase from '../database';

const db = DataBase.get();

const SettingModel = db.define('Setting', {
  key: {
    type: DataTypes.STRING,
    unique: true,
  },
  data: JsonField(db, 'Setting', 'data'),
})


export default SettingModel;
