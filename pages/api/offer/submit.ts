import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { getSession } from "next-auth/react"
import offersController from '../../../lib/offers/offersController';


const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (req.body) {
    const offer = { ...req.body, ...{ UserId: session.userId } };
    await offersController.create(offer);
    return res.status(200).json(offer);
  }
  return res.status(500).json({ statusCode: 500, message: 'email missing' });
});

export default handler;
