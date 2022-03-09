import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import UsersController from '../../../lib/users/usersController';
import Auth from '../../../lib/auth';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (!req.body.id) {
    const bankAccount = await UsersController.createBankAccount(req.body, user.id);
    return res.status(200).json(bankAccount);
  }
  if (req.body.id) {
    const bankAccount = await UsersController.updateBankAccount(req.body, req.body.id);
    return res.status(200).json(bankAccount);
  }
  return res.status(500).json({ statusCode: 500, message: 'data missing' });
});

handler.delete(async (req: any, res: NextApiResponse) => {
  if (req.body) {
    const bankAccounts = await UsersController.updateBankAccount({ status: 'archived' }, req.body);
    return res.status(200).json(bankAccounts);
  }
  return res.status(500).json({ statusCode: 500, message: 'data missing' });
});

export default handler;
