import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import offersController from '../../../lib/offers/offersController';
import Auth from '../../../lib/auth';
import Access from '../../../utils/access';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  if (req.body) {
    const user = await Auth.getUser(req);
    if (req.body.id){
      const offer = await offersController.findById(req.body.id);
      if (offer.UserId != user.id && !Access.can('manage', user)) {
        res.status(401).json({ message: 'request denied' })
      }
      await offersController.update(req.body, req.body.id)
        .catch((e) => res.status(500).json({ message: e.message }));
      return res.status(200).json(1);
    }
    const result = await offersController.create({...req.body, UserId: user.id})
      .catch((e) => res.status(500).json({ message: e.message }));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
