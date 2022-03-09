import React, { useState } from 'react';
import moment from 'moment';
import { Form, Button, Card } from 'react-bootstrap';
import pluralize from 'pluralize';
import Api from '../../utils/apiCall';
import UserAvatar from '../users/UserAvatar';
import IconButton from '../IconButton';
import Access from '../../utils/access';
import EditContentField from '../EditContentField';
import LoginModal from '../auth/LoginModal';
import User from '../users/User';
import Icons from '../icons';

const PostComment = ({ comment, onDelete, state }) => {
  const [mode, setMode] = useState();
  const [commentData, setCommentData] = useState(comment);
  const trash = async () => {
    await Api.call('post/comment', 'DELETE', { id: comment.id });
    onDelete(comment.id);
  };
  return (
    <Card style={{ marginBottom: '15px' }}>
      <Card.Body>
        <b><User user={commentData.User} /> {moment(commentData.createdAt).fromNow()}&nbsp;</b>
        <div className="editor-content airy">
          { mode === 'edit' ? (
            <CommentForm 
              comment={commentData}
              onComment={(c) => {
                setMode(false);
                setCommentData(c);
              }}
              state={state}
              cancel={() => setMode(false)}
            />
          ) : (
            <>
              <div className="comment-content" dangerouslySetInnerHTML={{ __html: commentData.comment }} />
              { Access.can('manage', state.user) || state.user.id === commentData.User.id ? (
                <>
                  <IconButton icon="trash" onClick={trash}>Delete</IconButton>
                  <IconButton onClick={() => setMode('edit')}>Edit</IconButton>
                </>
              ) : null }
            </>
          ) }
        </div>
      </Card.Body>
    </Card>
  ); 
};

const Panel = ({
  comments, post, data, state, 
}) => {
  const [commentsData, setCommentsData] = useState(comments);
  const onComment = (comment) => {
    setCommented(true);
    setCommentsData([...commentsData, comment]);
  };
  const [commented, setCommented] = useState(false);
  return (
    <div>
      <a name="comments"><Icons.Chat /> {commentsData.length} {pluralize('comment', commentsData.length)} </a>
      <hr />
      <List
        state={state}
        comments={commentsData}
        onDelete={(id) => setCommentsData(
          commentsData.filter((c) => c.id !== id),
        )}
      />

      { !state.user?.id ? <IconButton icon="chat" onClick={()=> LoginModal.show()}>Sign in to comment</IconButton> : (
        <>
        { !commented  ? (
          <Card>
            <Card.Body>
              <CommentForm
                post={post}
                state={state} 
                onComment={onComment}
              />
            </Card.Body>
          </Card>
        ) : (
          <Button onClick={() => setCommented(false)} variant="outline-info">Post a new comment</Button>
        )}
        </>
      ) }
    </div>
  );
};

const List = ({ comments, onDelete, state }) => (
  comments.map((c) => <PostComment key={c.id} onDelete={onDelete} comment={c} state={state} />)
);

const CommentForm = ({
  post, state, onComment, comment = { comment: '' }, cancel,
}) => {
  const [commentData, setCommentData] = useState(comment);
  const submitComment = async () => {
    const sub = await Api.call('post/comment', 'POST', { ...commentData, PostId: commentData.PostId || post.id });
    sub.User = state.user;
    onComment({
      ...commentData, 
      id: commentData.id || sub.id,
      User: state.user, 
      PostId: commentData.PostId || post.id,
    });
    if (!comment.id) setCommentData({ comment: '' });
  };

  return (
    <div className="comment-content">
      <b>{ commentData.id ? 'Edit Comment' : 'Post New Comment'}</b><br />
      <EditContentField 
        content={commentData.comment}
        update={(c) => setCommentData({ ...commentData, comment: c })}
      />
      <div style={{ textAlign: 'right', margin: '10px 0 0' }}>
        { commentData.id ? (
          <IconButton
            icon="cancel"
            block
            variant="outline-info"
            onClick={() => cancel()}
          >Cancel
          </IconButton>
        ) : null }
        <IconButton icon="comment" block variant="outline-info" onClick={() => submitComment()}>
          { commentData.id ? 'Save' : 'Submit'}
        </IconButton>
      </div>
    </div>
  );
};

PostComment.Form = CommentForm;
PostComment.List = List;
PostComment.Panel = Panel;

export default PostComment;
