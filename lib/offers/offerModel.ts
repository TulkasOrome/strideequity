import { DataTypes, Deferrable } from 'sequelize';
import JsonField from 'sequelize-json';
import SequelizeSlugify from 'sequelize-slugify';
import DataBase from '../database';
import UserModel from '../users/userModel';

const db = DataBase.get();

const OfferModel = db.define('Offer', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  pitch: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
  raiseRange: {
    type: DataTypes.STRING,
  },
  companyStage: {
    type: DataTypes.STRING,
  },
  informationFiles: JsonField(db, 'Offer', 'informationFiles'),
  informationLinks: {
    type: DataTypes.TEXT,
  },
  offerDocument: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'submitted',
  },
  type: {
    type: DataTypes.STRING,
    defaultValue: 'retail',
  },
  sharePrice: {
    type: DataTypes.INTEGER,
  },
  minInvestment: {
    type: DataTypes.INTEGER,
  },
  target: {
    type: DataTypes.INTEGER,
  },
  wholesale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  coverImage: JsonField(db, 'Offer', 'coverImage'),
  colors: JsonField(db, 'Offer', 'colors'),
});
OfferModel.belongsTo(UserModel);
SequelizeSlugify.slugifyModel(OfferModel, { source: ['companyName'] });
OfferModel.statusList = ['submitted', 'draft', 'preview', 'active', 'finished', 'rejected'];

export default OfferModel;
