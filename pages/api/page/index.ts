import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import PagesController from '../../../lib/pages/pagesController';


const handler = nextConnect();

const error = (e, res) => res.status(500).json(e);

handler.post(async (req: any, res: NextApiResponse) => {
  if (req.body) {
    const page = { ...req.body };
    if (page.id) {
      const result = await PagesController.update(page, page.id)
        .catch((e) => error(e, res));
      return res.status(200).json(result);
    }
    const result = await PagesController.create(page)
      .catch((e) => error(e, res));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

handler.delete(async (req: any, res: NextApiResponse) => {
  if (req.body) {
    const page = { ...req.body };
    if (page.id) {
      const result = await PagesController.delete(page.id)
        .catch((e) => error(e, res));
      return res.status(200).json(result);
    }
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
