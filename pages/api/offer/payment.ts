import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import offersController from '../../../lib/offers/offersController';
import Access from '../../../utils/access';
import Auth from '../../../lib/auth';

const handler = nextConnect();

const error = (e, res) => res.status(500).json({ msg: e.message });

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (req.body && user.id) {
    if (req.body.id && Access.can('manage', user)) {
      const result = await offersController.updatePayment(
        req.body,
      ).catch((e) => error(e, res));
      return res.status(200).json(result);
    }
    const offer = await offersController.findById(req.body.OfferId);
    const amount = req.body.shares * offer.sharePrice;
    const result = await offersController.createPayment(
      { ...req.body, ...{ UserId: user.id, amount } },
    ).catch((e) => error(e, res));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
