import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import PostsController from '../../../lib/posts/postsController';
import Auth from '../../../lib/auth';

const handler = nextConnect();

const error = (e, res) => res.status(500).json({ msg: e.message });

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (req.body.comment) {
    if (req.body.id) {
      const result = await PostsController.updateComment(req.body)
        .catch((e) => error(e, res));
      return res.status(200).json(result);
    }
    const result = await PostsController.createComment({
      ...req.body, ...{ UserId: user.id },
    })
      .catch((e) => error(e, res));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

handler.delete(async (req: any, res: NextApiResponse) => {
  if (req.body.id) {
    const result = await PostsController.deleteComment(req.body.id)
      .catch((e) => error(e, res));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
