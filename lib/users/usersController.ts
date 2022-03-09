import { Op } from 'sequelize';
import OfferModel from '../offers/offerModel';
import { createHash, randomBytes } from 'crypto'
import UserInterestModel from '../offers/userInterestModel';
import AuthAccountModel from './authAccountModel';
import BankAccountModel from './BankAccountModel';
import UserModel from './userModel';
import WholesaleVerificationModel from './WholesaleVerificationModel';
import UserPaymentModel from '../offers/userPaymentModel';

const getCompoundId = (provider, providerAccountId) => {
  return createHash('sha256').update(`${provider}:${providerAccountId}`).digest('hex')
}

const include = [{ model: OfferModel, attributes: ['id', 'slug', 'companyName', 'coverImage', 'colors', 'pitch', 'sharePrice', 'minInvestment', 'target', 'status', 'type'] }];
const IncUser = { model: UserModel, attributes: ['id', 'name', 'avatar', 'email', 'wholesale', 'verifiedId', 'verifiedWholesale'] };
const UsersController = {
  create: async (data) => {
    const userData = { ...data, password: '12345' };
    const user = UsersController.register(userData);
    return user;
  },
  authenticate: async (credentials) => {
    const dbuser = await UserModel.findOne({where: { email: credentials.email }});
    if (!dbuser) return null;
    const promise:Promise<any> = new Promise((resolve, reject) => {
      dbuser.authenticate(credentials.password, (err, user, msg)=> {
        if (err) reject(err);
        resolve(user);
      })
    });
    return promise;
  },
  register: async (data) => {
    const promise:Promise<any> = new Promise((resolve, reject) => {
      const userData = { ...data, ...{ username: data.email } };
      if( process.env.ADMINS.split(',').indexOf(data.email) > -1 ) userData.role = 'admin';
      UserModel.register(userData, data.password, (err, user) => {
        if (err) reject(err);
        resolve(user);
      });
    });
    return promise;
  },
  findById: async (id) => UserModel.findOne({ where: { id } }),
  findByAuth: async (providerAccountId, provider) => {
    const account = await AuthAccountModel.findOne(
      { where : { providerAccountId, provider }, include: IncUser }
    );
    return account?.User;
  },
  createAuthAccount: async (data) => {
    return AuthAccountModel.create({
      ...data,
      accessToken: data.access_token,
      compoundId: getCompoundId(data.provider, data.providerAccountId),
    });
  },
  getUserAuthAccounts: async (UserId) => {
    return AuthAccountModel.findAll({where:{UserId}});
  },
  getUserData: async (id) => {
    const { dataValues } = await UsersController.findById(id);
    delete dataValues.hash;
    delete dataValues.salt;
    delete dataValues.activationKey;
    delete dataValues.resetPasswordKey;
    return dataValues;
  },
  getUsers: async () => UserModel.findAll(),
  update: async (data, id) => {
    if( process.env.ADMINS.split(',').indexOf(data.email) > -1 ) data.role = 'admin';
    return UserModel.update(data, { where: { id } })
  },
  findBy: async (field, value) => UserModel.findOne({ where: { [field]: value } }),
  getBankAccount: async (id) => BankAccountModel.findOne({ where: { id } }),
  getBankAccounts: async (UserId) => BankAccountModel.findAll({ where: { UserId, status: 'active' } }),
  updateBankAccount: async (data, id) => BankAccountModel.update(data, { where: { id } }),
  createBankAccount: async (data, UserId) => BankAccountModel.create({ ...data, ...{ UserId } }),
  getInterests: async (UserId) => UserInterestModel.findAll({ where: { UserId }, include }),
  getOfferInterest: async (UserId, OfferId) => UserInterestModel.findOne(
    { where: { UserId, OfferId }, include },
  ),
  getOfferPayments: async (UserId, OfferId) => UserPaymentModel.findAll(
    { where: { UserId, OfferId } }
  ),
  submitWholesaleVerification: async (
    data,
    UserId,
  ) => WholesaleVerificationModel.create({ ...data, UserId }),
  getWholesaleVerification: async (UserId) => WholesaleVerificationModel.findOne(
    { where: { UserId } },
  ),
  getWholesaleVerifications: async (where) => WholesaleVerificationModel.findAll(
    { where, include: IncUser },
  ),
  updateWholesaleVerification: async (data, verifiedBy) => WholesaleVerificationModel.update(
    { ...data, verifiedBy },
    { where: { id: data.id } },
  ),
  verifyWholesale: async (id, verify, verifiedBy) => {
    const verif = await WholesaleVerificationModel.findOne({where: {id}});
    WholesaleVerificationModel.update(
      { verifiedBy, status: verify ? 'accepted' : 'refused' },
      { where: { id } },
    );
    if (verify) UserModel.update( { verifiedWholesale: true }, { where: { id: verif.UserId } });
    return true;
  },
  search: async (s) => UserModel.findAll(
    {
      where: {
        [Op.or]: [
          { email: { [Op.like]: `%${s}%` } },
          { name: { [Op.like]: `%${s}%` } },
        ],
      },
    },
  ),
};

export default UsersController;
