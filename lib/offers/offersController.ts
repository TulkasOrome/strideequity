import { Op, Utils } from 'sequelize';
import { customAlphabet } from 'nanoid';
import OfferModel from './offerModel';
import UserModel from '../users/userModel';
import UserInterestModel from './userInterestModel';
import UserPaymentModel from './userPaymentModel';
import UserQuestionModel from './userQuestionModel';

const transferKey = customAlphabet('1234567890', 5);
const IncUser = { model: UserModel, attributes: ['id', 'name', 'avatar', 'email', 'wholesale', 'verifiedId', 'verifiedWholesale'] };
const IncOffer = { model: OfferModel, attributes: ['companyName', 'slug', 'pitch', 'sharePrice', 'minInvestment', 'target', 'coverImage', 'colors'] };

const offersController = {
  create: async (data) => OfferModel.create(data),
  findById: async (id) => OfferModel.findOne({ where: { id }, include: IncUser }),
  findBySlug: async (slug) => OfferModel.findOne({ where: { slug } }),
  find: async (where) => OfferModel.findAll({ where, include: IncUser, order: [['createdAt', 'DESC']] }),
  getOffers: async () => OfferModel.findAll({ include: IncUser, order: [['createdAt', 'DESC']] }),
  update: async (data, id) => OfferModel.update(data, { where: { id } }),
  getStats: async (OfferId) => {
    const payment = await UserPaymentModel.sum('amount', { where: { OfferId } });
    const interest = await UserInterestModel.sum('range', { where: { OfferId } });
    return { payment, interest };
  },
  getFeatured: async () => OfferModel.findAll({
    where: {
      [Op.or]: [
        { status: 'preview' },
        { status: 'active' },
      ],
    },
  }),
  getPublished: async () => OfferModel.findAll({
    where: {
      [Op.or]: [
        { status: 'preview' },
        { status: 'active' },
      ],
    },
  }),
  interest: async (data) => {
    const interest = await UserInterestModel.findOne(
      { where: { UserId: data.UserId, OfferId: data.OfferId } },
    );
    if (interest) {
      return UserInterestModel.update(
        data,
        { where: { UserId: data.UserId, OfferId: data.OfferId } },
      );
    }
    return UserInterestModel.create(data);
  },
  search: async (s) => OfferModel.findAll(
    {
      where: {
        [Op.or]: [
          new Utils.Where(
            new Utils.Fn('LOWER', [new Utils.Col('User.email')]), {[Op.like]: `%${s}%`}
          ),
          new Utils.Where(
            new Utils.Fn('LOWER', [new Utils.Col('User.name')]), {[Op.like]: `%${s}%`}
          ),
          new Utils.Where(
            new Utils.Fn('LOWER', [new Utils.Col('companyName')]), {[Op.like]: `%${s}%`}
          ),
          new Utils.Where(
            new Utils.Fn('LOWER', [new Utils.Col('pitch')]), {[Op.like]: `%${s}%`}
          ),
        ],
      },
      include: [IncUser],
    },
  ),
  deleteInterest: async (data) => UserInterestModel.destroy(data),
  getInterests: async (data) => UserInterestModel.findAll({ ...data, ...{ include: [IncOffer, IncUser], order: [['createdAt', 'DESC']] } }),

  createPayment: async (data) => UserPaymentModel.create({ ...data, key: transferKey() }),
  updatePayment: async (data) => UserPaymentModel.update(data, { where: { id: data.id } }),
  getPayments: async (data) => UserPaymentModel.findAll({ ...data, ...{ include: [IncOffer, IncUser], order: [['createdAt', 'DESC']] } }),
  getPayment: async (data) => UserPaymentModel.findOne(
    { ...data, ...{ include: [IncOffer, IncUser] } },
  ),
  createQuestion: async (data) => UserQuestionModel.create(data),
  updateQuestion: async (data) => UserQuestionModel.update(data, { where: { id: data.id } }),
  getQuestions: async (data) => UserQuestionModel.findAll(
    { ...data, ...{ include: [IncOffer, IncUser] } },
  ),
  searchPayments: async (s) => UserPaymentModel.findAll(
    {
      where: {
        [Op.or]: [
          { '$User.email$': { [Op.like]: `%${s}%` } },
          { '$User.name$': { [Op.like]: `%${s}%` } },
          { '$Offer.companyName$': { [Op.like]: `%${s}%` } },
        ],
      },
      include: [IncOffer, IncUser],
    },
  ),
};

export default offersController;
