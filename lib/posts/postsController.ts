import { Op } from 'sequelize';
import PostModel from './postModel';
import UserModel from '../users/userModel';
import UserCommentModel from './userComment';
import PostLikeModel from './postLike';

const include = [{ model: UserModel, attributes: ['id', 'name', 'avatar'] }];
const postsController = {
  create: async (data) => PostModel.create(data),
  findById: async (id) => PostModel.findOne(
    { where: { id }, include },
  ),
  findBySlug: async (slug) => PostModel.findOne(
    { where: { slug }, include },
  ),
  find: async (where) => PostModel.findAll({ where, include }),
  getPosts: async (where) => PostModel.findAll({ where, include, order: [['publishDate', 'DESC']] }),
  update: async (data, id) => PostModel.update(data, { where: { id } }),
  deletePost: async (id) => PostModel.destroy({ where: { id } }),
  updateCommentsCount: async (id) => {
    const comments = await postsController.countComments(id);
    postsController.update({ comments }, id);
    return comments;
  },
  createComment: async (data) => {
    const comment = await UserCommentModel.create(data);
    await postsController.updateCommentsCount(data.PostId);
    return comment;
  },
  updateComment: async (data) => UserCommentModel.update(data, { where: { id: data.id } }),
  getComments: async (data) => UserCommentModel.findAll({ ...data, include }),
  deleteComment: async (id) => {
    const comment = UserCommentModel.findOne({ where: { id } });
    await UserCommentModel.destroy({ where: { id } });
    await postsController.updateCommentsCount(comment.PostId);
    return comment;
  },
  countComments: async (PostId) => UserCommentModel.count({ where: { PostId } }),
  like: async (PostId, UserId) => {
    const liked = await PostLikeModel.findOne({ where: { PostId, UserId } });
    if (liked) {
      await PostLikeModel.destroy({ where: { PostId, UserId } });
    } else {
      await PostLikeModel.create({ PostId, UserId });
    }
    const likes = await PostLikeModel.count({ where: { PostId } });
    await postsController.update({ likes }, PostId);
    return !liked;
  },
  getLike: async (PostId, UserId) => {
    const like = await PostLikeModel.findOne({ where: { PostId, UserId } });
    return like;
  },
  countLikes: async (PostId) => UserCommentModel.count({ where: { PostId } }),
  search: async (s) => PostModel.findAll(
    {
      where: {
        [Op.or]: [
          { description: { [Op.like]: `%${s}%` } },
          { name: { [Op.like]: `%${s}%` } },
        ],
      },
    },
  ),
};

export default postsController;
