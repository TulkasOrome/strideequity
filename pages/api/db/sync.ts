import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import DataBase from '../../../lib/database';
import OfferModel from '../../../lib/offers/offerModel';
import UserModel from '../../../lib/users/userModel';
import PageModel from '../../../lib/pages/pageModel';
import PostModel from '../../../lib/posts/postModel';
import UserInterestModel from '../../../lib/offers/userInterestModel';
import UserPaymentModel from '../../../lib/offers/userPaymentModel';
import BankAccountModel from '../../../lib/users/BankAccountModel';
import UserQuestionModel from '../../../lib/offers/userQuestionModel';
import UserCommentModel from '../../../lib/posts/userComment';
import PostLikeModel from '../../../lib/posts/postLike';
import CommentLikeModel from '../../../lib/posts/commentLike';
import WholesaleVerificationModel from '../../../lib/users/WholesaleVerificationModel';
import AuthAccountModel from '../../../lib/users/authAccountModel';
import VerificationRequestModel from '../../../lib/users/verificationRequestModel';
import SessionModel from '../../../lib/session/SessionModel';
import SettingModel from '../../../lib/settings/settingModel';


const handler = nextConnect();

handler.get(async (req: any, res: NextApiResponse) => {
  if (req.query.model === 'offer') {
    await UserInterestModel.sync({ alter: true }).catch((e) => console.log(e));
    await OfferModel.sync({ alter: true }).catch((e) => console.log(e));
    res.json({ done: true });
  }
  if (req.query.model === 'user') {
    await UserModel.sync({ alter: true }).catch((e) => console.log(e));
    await AuthAccountModel.sync({ alter: true }).catch((e) => console.log(e));
    res.json({ done: true });
  }
  if (req.query.model === 'page') {
    await PageModel.sync({ alter: true }).catch((e) => console.log(e));
    res.json({ done: 1 });
  }
  if (req.query.model === 'post') {
    await PostModel.sync({ alter: true }).catch((e) => console.log(e));
    await UserCommentModel.sync({ alter: true }).catch((e) => console.log(e));
    await PostLikeModel.sync({ alter: true }).catch((e) => console.log(e));
    await CommentLikeModel.sync({ alter: true }).catch((e) => console.log(e));
    res.json({ done: 1 });
  }
  if (req.query.model === 'payment') {
    await BankAccountModel.sync({ alter: true }).catch((e) => console.log(e));
    await UserPaymentModel.sync({ alter: true }).catch((e) => console.log(e));
    res.json({ done: true });
  }
  if (req.query.model === 'setting') {
    await SettingModel.sync({ alter: true }).catch((e) => console.log(e));
    res.json({ done: true });
  }
  if (req.query.model === 'all') {
    await PostModel.sync({}).catch((e) => console.log(e));
    await PageModel.sync({}).catch((e) => console.log(e));
    await UserModel.sync({}).catch((e) => console.log(e));
    await OfferModel.sync({}).catch((e) => console.log(e));
    await UserInterestModel.sync({}).catch((e) => console.log(e));
    await UserPaymentModel.sync({}).catch((e) => res.json(e));
    await BankAccountModel.sync().catch((e) => console.log(e));
    await UserQuestionModel.sync().catch((e) => console.log(e));
    await UserCommentModel.sync().catch((e) => console.log(e));
    await PostLikeModel.sync().catch((e) => console.log(e));
    await CommentLikeModel.sync().catch((e) => console.log(e));
    await WholesaleVerificationModel.sync().catch((e) => console.log(e));
    await AuthAccountModel.sync().catch((e) => console.log(e));
    await VerificationRequestModel.sync().catch((e) => console.log(e));
    await SessionModel.sync().catch((e) => console.log(e));
    res.json({ done: true });
  }
});

export default handler;
