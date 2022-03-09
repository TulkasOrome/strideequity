import React, { useState } from 'react';
import pluralize from 'pluralize';
import {
  Card, Button, Row, Col, Image,
} from 'react-bootstrap';
import Link from 'next/link';
import moment from 'moment';
import Bg from '../../utils/imageBackgrounds';
import UserAvatar from '../users/UserAvatar';
import Icons from '../icons';
import PostLikes from './PostLike';
import Status from '../Status';
import IconButton from '../IconButton';
import Api from '../../utils/apiCall';
import { useRouter } from 'next/router';

const truncate = (str, num) => {
  if (str.length > num) {
    return `${str.slice(0, num)}...`;
  } 
  return str;
};

const PostCard = ({ post , state}) => {
  const { colors } = post;
  return (
    <Card style={{ marginBottom: '15px' }}>
      <Card.Body>
        <Row>
          <Col md={5}>
          { post.coverImage?.thumb ? <Image src={post.coverImage.thumb} fluid /> : null }
          </Col>
          <Col>
            <h4 style={{ margin: 0 }}><Link href={`/post/${post.slug}`}><a>{post.name}</a></Link></h4>
            <p>
              <b>{post.publishDate ? moment(post.publishDate).format('MMM Do YY') : null }
            &nbsp;by <UserAvatar user={post.User} /> {post.User?.name || 'author'} 
              </b>
            </p> 
            
            {truncate(post.description, 200)}
            <Row>
              <Col>
                <PostLikes post={post} user={state?.user} />&nbsp;
                <Link href={`/post/${post.slug}#comments`}>
                  <a><Icons.Chat /> {post.comments} {pluralize('comment', post.comments)}</a>
                </Link>
              </Col>
              <Col>
                <p className="text-right">
                  <Button variant="link" href={`/post/${post.slug}`}>
                    Read More
                  </Button>
                </p>
              </Col>
            </Row>

          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Compact = ({ post , state}) => {
  const router = useRouter()
  const deletePost = async (id) => {
    await Api.call('post', 'DELETE', { id });
    router.reload();
  };
  return(
  <Card style={{ marginBottom: '15px' }}>
    <Card.Body>
      <Row>
        <Col sm={3}>
          { post.coverImage?.thumb ? <Image src={post.coverImage.thumb} fluid /> : null }
        </Col>
        <Col>
          <h4 style={{ margin: 0 }}><Link href={`/post/${post.slug}`}><a>{post.name} <Status status={post.status} /></a></Link></h4> 
          <p>
            <b>{post.publishDate ? moment(post.publishDate).format('MMM Do YY') : null }
            &nbsp;by <UserAvatar user={post.User} /> {post.User?.name || 'author'} 
            </b>
          </p> 
          { post.status === 'published' ? (
            <Row>
              <Col>
                <PostLikes post={post} user={state?.user} />&nbsp;
                <Link href={`/post/${post.slug}#comments`}>
                  <a><Icons.Chat /> {post.comments} {pluralize('comment', post.comments)}</a>
                </Link>
              </Col>
              <Col>
                <IconButton icon="eye" href={`/post/${post.slug}`}>View</IconButton>
              </Col>
            </Row>
          ) : (
            <>
              <IconButton href={`/post/${post.slug}`}>Edit</IconButton>
              <IconButton icon="trash" onClick={() => deletePost(post.id)}>Delete</IconButton>
            </>
          )}
        
        </Col>
      </Row>
    </Card.Body>
  </Card>
)
};

PostCard.Compact = Compact;
export default PostCard;
