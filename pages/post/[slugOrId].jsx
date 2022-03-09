import React from 'react';
import PostsController from '../../lib/posts/postsController';
import serializable from '../../lib/serializable';
import ServerProps from '../../lib/serverProps';
 
import Post from '../../components/posts/Post';
import Error from '../../components/Error';
import Access from '../../utils/access';

const PostPage = ({ state, post, data }) => {
  if ((!post.id && !post.new) || (!Access.can('manage', state.user) && post.new)) {
    return <Error statusCode={404} state={state} />;
  }
  return <Post.Page state={state} post={post} data={data} />;
};

export async function getServerSideProps({ query, req, res }) {
   
  const data = { comments: [], likes: 0 };
  const state = await ServerProps.getState(req)
  const post = query.slugOrId !== 'new'
    ? await ( 
      parseInt(query.slugOrId) == query.slugOrId
        ? PostsController.findById(query.slugOrId)
        : PostsController.findBySlug(query.slugOrId)
    )
    : { status: 'draft', new: true, name: '', description: '', content: '' };

  if (post?.id) {
    data.comments = await PostsController.getComments({ where: { PostId: post.id } });
  }
  if (state.user.id && post?.id) {
    data.like = await PostsController.getLike(post.id, state.user.id);
  }
  
  return {
    props: {
      state,
      post: serializable(post),
      data: serializable(data),
    },
  };
}

export default PostPage;
