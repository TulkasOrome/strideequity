import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import Auth from '../../../lib/auth';
import Access from '../../../utils/access';
import UsersController from '../../../lib/users/usersController';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  console.log('changepass', req.body);
  if (req.body.key) {
    const keyUser = await UsersController.findBy('resetPasswordKey', req.body.key );
    console.log('changepass',keyUser);
    await UsersController.update({password: req.body.password}, keyUser.id);
    return res.status(200).json({ok: true});
  } else {
    const user = await Auth.getUser(req);
    if (req.body.id === user.id || Access.can('manage', user ) ) {
      const result = await UsersController.update({password: req.body.password}, req.body.id);
      return res.status(200).json({ok: true});
    }
    return res.status(500).json({ statusCode: 500, message: 'malformated request' });
  }
});


export default handler;
