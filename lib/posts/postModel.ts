import { DataTypes } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';
import JsonField from 'sequelize-json';
import DataBase from '../database';
import UserModel from '../users/userModel';

const db = DataBase.get();

const PostModel = db.define('Post', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.STRING,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  publishDate: {
    type: DataTypes.DATE,
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  comments: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  coverImage: JsonField(db, 'Page', 'coverImage'),
  colors: JsonField(db, 'Page', 'colors'),
});

SequelizeSlugify.slugifyModel(PostModel, { source: ['name'] });
PostModel.belongsTo(UserModel);
PostModel.statusList = ['draft', 'published', 'archived'];

export default PostModel;
