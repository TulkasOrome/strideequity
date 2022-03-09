import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import PostsController from '../../../lib/posts/postsController';
import Auth from '../../../lib/auth';

const handler = nextConnect();

const error = (e, res) => res.status(500).json({ msg: e.message });

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (req.body.PostId && user?.id) {
    const like = await PostsController.like(req.body.PostId, user.id)
      .catch((e) => error(e, res));
    return res.status(200).json(like);
  }
  if (!user) res.status(500).json({ statusCode: 200, message: 'wrong data' });
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

handler.get(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (req.query.PostId && user?.id) {
    const like = await PostsController.getLike(req.query.PostId, user.id)
      .catch((e) => error(e, res));
    console.log(like)
    return res.status(200).json(!!like);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
