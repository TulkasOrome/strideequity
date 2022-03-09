import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import UsersController from '../../../lib/users/usersController';
import Auth from '../../../lib/auth';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (user) {
    await UsersController.update({verifiedId:true}, user.id ).catch((e) => res.status(500).json({ statusCode: 500, message: e.message }));
    return res.status(200).json({success: true, id: user.id});
  }
  return res.status(500).json({ statusCode: 500, message: 'malformed' });
});


export default handler;
