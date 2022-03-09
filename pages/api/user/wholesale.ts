import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import UsersController from '../../../lib/users/usersController';
import Auth from '../../../lib/auth';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (!req.body.id) {
    const verif = await UsersController.submitWholesaleVerification(req.body, user.id);
    return res.status(200).json(verif);
  }
  if (req.body.id) {
    const verif = await UsersController.verifyWholesale(req.body.id, req.body.verify, user.id );
    return res.status(200).json(verif);
  }
  return res.status(500).json({ statusCode: 500, message: 'data missing' });
});

export default handler;
