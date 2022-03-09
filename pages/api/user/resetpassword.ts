import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import UserModel from '../../../lib/users/userModel';
import Email from '../../../lib/email';

const handler = nextConnect();


const resetPassEmail = (user) =>  `
  hi ${user.name}

  ${process.env.HOSTING_URL}/changepassword?key=${user.resetPasswordKey}

`

handler.post(async (req: any, res: NextApiResponse) => {
  UserModel.setResetPasswordKey(req.body.email, (err, user) => {
    console.log(err, user)
    if(!err) Email.send({to: user.email, content: resetPassEmail(user), subject: 'Reset your StrideEquity password'});
  });
  return res.status(200).json({success: true});
});


export default handler;
