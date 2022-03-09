import { DataTypes } from 'sequelize';
import DataBase from '../database';
import UserModel from '../users/userModel';
import PostModel from './postModel';

const db = DataBase.get();

const PostLikeModel = db.define('PostLike');

PostLikeModel.belongsTo(UserModel);
PostLikeModel.belongsTo(PostModel);

export default PostLikeModel;
