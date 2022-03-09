import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import UsersController from '../../../lib/users/usersController';
import Auth from '../../../lib/auth';
import Access from '../../../utils/access';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (req.body.id === user.id || Access.can('manage', user ) ) {
    const user = await UsersController.update(req.body, req.body.id);
    return res.status(200).json(user);
  }
  return res.status(500).json({ statusCode: 500, message: 'malformated request' });
});

export default handler;
