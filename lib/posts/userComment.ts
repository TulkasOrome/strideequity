import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from '../users/userModel';
import PostModel from './postModel';

const db = DataBase.get();

const UserCommentModel = db.define('Comment', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  parent: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'posted',
  },
});

UserCommentModel.belongsTo(UserModel);
UserCommentModel.belongsTo(PostModel);

export default UserCommentModel;
