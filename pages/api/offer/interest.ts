import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import { getSession } from "next-auth/react"
import offersController from '../../../lib/offers/offersController';


const handler = nextConnect();

handler.post(async (req: any, res: NextApiResponse) => {

  if (req.body) {
    const session = await getSession({ req });
    const result = await offersController.interest({ ...req.body, ...{ UserId: session.userId } })
      .catch((e) => res.status(500).json({ statusCode: 500, message: e.message }));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

handler.delete(async (req: any, res: NextApiResponse) => {
  if (req.body) {
    const session = await getSession({ req });
    const result = await offersController.deleteInterest(
      { where: { id: req.body.id, UserId: session.userId } },
    );
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
