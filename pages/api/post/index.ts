import nextConnect from 'next-connect';
import { NextApiResponse } from 'next';
import PostsController from '../../../lib/posts/postsController';
import Auth from '../../../lib/auth';

const handler = nextConnect();

const error = (e, res) => res.status(500).json({ msg: e });

handler.post(async (req: any, res: NextApiResponse) => {
  const user = await Auth.getUser(req);
  if (req.body) {
    const post = { ...req.body, ...{ UserId: user.id } };
    if (post.id) {
      const previous = await PostsController.findById(post.id);
      if (post.status === 'published' && previous.status === 'draft') {
        post.publishDate = new Date();
      }
      if (!previous.status && !post.status) {
        post.status = 'draft';
      }
      if (!previous.UserId) {
        post.UserId = user.id;
      }
      const result = await PostsController.update(post, post.id)
        .catch((e) => error(e, res));
      return res.status(200).json(post);
    }
    const result = await PostsController.create({
      ...post,
      ...{
        UserId: user.id,
      },
    })
      .catch((e) => error(e, res));
    return res.status(200).json(result);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

handler.delete(async (req: any, res: NextApiResponse) => {
  if (req.body.id) {
    await PostsController.deletePost(req.body.id);
  }
  return res.status(500).json({ statusCode: 500, message: 'wrong data' });
});

export default handler;
