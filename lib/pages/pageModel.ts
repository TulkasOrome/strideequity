import { DataTypes } from 'sequelize';
import JsonField from 'sequelize-json';
import SequelizeSlugify from 'sequelize-slugify';
import DataBase from '../database';
import UserModel from '../users/userModel';

const db = DataBase.get();

const PageModel = db.define('Page', {
  name: {
    type: DataTypes.STRING,
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
    defaultValue: 'draft',
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  publishDate: {
    type: DataTypes.DATE,
  },
  coverImage: JsonField(db, 'Page', 'coverImage'),
  colors: JsonField(db, 'Page', 'colors'),
});

SequelizeSlugify.slugifyModel(PageModel, { source: ['name'] });
PageModel.belongsTo(UserModel);
PageModel.statusList = ['draft', 'published', 'archived'];

export default PageModel;
