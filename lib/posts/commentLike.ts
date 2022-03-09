import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from '../users/userModel';
import PostModel from './postModel';

const db = DataBase.get();

const CommentLikeModel = db.define('CommentLike');

CommentLikeModel.belongsTo(UserModel);
CommentLikeModel.belongsTo(PostModel);

export default CommentLikeModel;
