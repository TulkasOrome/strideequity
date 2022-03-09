import React from 'react';
import { Container } from 'react-bootstrap';
 
import ServerProps from '../../lib/serverProps';
import DashBoardLayout from '../../components/DashBoardLayout';
import PostsController from '../../lib/posts/postsController';
import serializable from '../../lib/serializable';
import Post from '../../components/posts/Post';
import DashboardModelNavbar from '../../components/DashboardModelNavbar';
import IconButton from '../../components/IconButton';

const PostsDashboardPage = ({ state, data }) => (
  <DashBoardLayout 
    title="StrideEquity | Dashboard" 
    state={state}
  >
    <Container>
      <DashboardModelNavbar model="articles" data={data}>
        <IconButton href="/post/new" icon="plus">New Article</IconButton>
      </DashboardModelNavbar>
      <Post.List posts={data.posts} compact />
    </Container>
  </DashBoardLayout>
);

export async function getServerSideProps({ query, req, res }) {
   
  const data = {};
  if (query.s) {
    data.posts = await PostsController.search(query.s);
    data.s = query.s;
  } else {
    data.posts = await PostsController.getPosts();
  }
  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable(data),
    },
  };
}

export default PostsDashboardPage;
