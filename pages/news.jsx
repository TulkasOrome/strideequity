import React from 'react';
import {
  Col, Row, Button, Container, 
} from 'react-bootstrap';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
 
import PostsController from '../lib/posts/postsController';
import serializable from '../lib/serializable';
import PostCard from '../components/posts/PostCard';
import Subscribe from '../components/Subscribe';
import Post from '../components/posts/Post';

const NewsPage = ({ state, posts }) => (
  <Layout 
    title="StrideEquity | Venture Capital investing for everyone"
    meta={{ 
      card: 'summary_large_image',
      description: 'Open Source Collective is partnering with GitCoin to launch FundOSS, a pilot matching campaign based on a democratic funding model.', 
    }}
    state={state}
  >
    <div style={{ paddingTop: '150px' }}>
      <Container>
        <Subscribe user={state.user} />
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Post.List posts={posts} state={state} />
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);

export async function getServerSideProps({ req, res }) {
   
  const posts = await PostsController.getPosts({status: 'published'});
  return {
    props: {
      state: await ServerProps.getState(req),
      posts: serializable(posts),
    },
  };
}

export default NewsPage;
