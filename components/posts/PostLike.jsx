import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import pluralize from 'pluralize';
import Icons from '../icons';
import Api from '../../utils/apiCall';
import LoginModal from '../auth/LoginModal';

const PostLikes = ({ post, like, user }) => {
  const [likeData, setLikeData] = useState({ likes: post.likes, like });
  const submit = async () => {
    const result = await Api.post('post/like', { PostId: post.id });
    const data = { 
      likes: likeData.likes + (result ? 1 : -1),
      like: result,
    };
    setLikeData(data); 
  };


  useEffect(async () => {
    if (likeData.like === undefined && user?.id) {
      const like = await Api.get('post/like', { PostId: post.id });
      setLikeData({ ...likeData, like }); 
    }
  });
  const style = likeData.like ? { color: '#ED3724' } : {};
  return (
    <Button variant="link" onClick={user?.id ? submit : () => LoginModal.show()}>
      <span style={style}><Icons.Heart /></span> {likeData.likes} {pluralize('like', likeData.likes) }
    </Button>
  );
};

export default PostLikes;
