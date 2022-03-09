import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import UsersController from '../../../lib/users/usersController';
import Email from '../../../lib/email';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  if (req.body.email) {
    const user = await UsersController.register({
      ...req.body,
      ...{ username: req.body.email },
    }).catch((e) => res.status(500).json({ statusCode: 500, message: e.message }));
    Email.send({to:req.body.email, content:'Welcome content', subject: 'Welcome to StrideEquity'})
    return res.status(200).json({success: true, id: user.id});
  }
  return res.status(500).json({ statusCode: 500, message: 'malformed' });
});

handler.get(async (req: any, res: NextApiResponse) => {
  if (req.query.email) {
    const user = await UsersController.findBy('email', req.query.email)
    return res.status(200).json(!user);
  }
  return res.status(500).json({ statusCode: 500, message: 'malformed' });
});

export default handler;
