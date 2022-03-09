import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import Access from '../../utils/access';
import Auth from '../../lib/auth';
import SettingsController from '../../lib/settings/settingsController';

const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  if(Access.can('manage', await Auth.getUser(req))){
    SettingsController.set(req.body.key, req.body.value);
    return res.status(200).json({ ok: true });
  }
  return res.status(500).json({ statusCode: 500, message: 'malformed' });
});

handler.get(async (req: any, res: NextApiResponse) => {
  return res.status(500).json({ statusCode: 500, message: 'malformed' });
});

export default handler;
