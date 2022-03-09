import nextConnect from 'next-connect';
import { getSession } from "next-auth/react"
import { NextApiResponse } from 'next';
import offersController from '../../../lib/offers/offersController';

const handler = nextConnect();


const error = (e, res) => res.status(500).json({ msg: e.message });

handler.post(async (req: any, res: NextApiResponse) => {
  const session = await getSession({ req })
  if (req.body) {
    if (!req.body.id) {
      const result = await offersController.createQuestion(
        { ...req.body, ...{ UserId: session.userId } },
      ).catch((e) => error(e, res));
      return res.status(200).json(result);
    }
    const result = await offersController.updateQuestion(
      { ...req.body, ...{ answeredBy: session.userId } },
    ).catch((e) => error(e, res));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
