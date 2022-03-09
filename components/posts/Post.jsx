import React from 'react';
import Link from 'next/link';
import {
  Col,
  Row,
  Table,
} from 'react-bootstrap';
import IconButton from '../IconButton';
import Status from '../Status';
import PostCard from './PostCard';
import PostPage from './PostPage';
import Bg from '../../utils/imageBackgrounds';

const Post = ({ post }) => <PostCard.Compact post={post} />;

const List = ({ posts, compact, state }) => posts.map((post) => (!compact 
  ? <PostCard key={post.id} post={post} state={state} /> 
  : <Post key={post.id} post={post} state={state} />));

const PostTable = ({ posts }) => (
  <Table className="card-table">
    <thead>
      <tr>
        <th>name</th>
        <th>slug</th>
        <th>action</th>
      </tr>
    </thead>
    <tbody>
      {posts.map((post) => (
        <tr key={post.id}>
          <td>{post.name}</td>
          <td>{post.slug}</td>
          <td><IconButton icon="edit" href={`/post/${post.slug}`}>Edit</IconButton></td>
        </tr>
      ))}
    </tbody>
  </Table>
);

Post.List = List;
Post.Page = PostPage;
Post.Table = PostTable;

export default Post;
