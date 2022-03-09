import React, { useState } from 'react';
import {
  Button,
  Col, Container, Form, Navbar, Row, 
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import moment from 'moment';
import pluralize from 'pluralize';
import imageResizer, { dataURIToFile } from '../../utils/imageResizer';
import Colors from '../../utils/colorPaletteExtracter';
import Access from '../../utils/access';
import Bg from '../../utils/imageBackgrounds';
import Editable from '../Editable';
import EditContentField from '../EditContentField';
import IconButton from '../IconButton';
import Layout from '../layout';
import UploadAndCrop from '../UploadAndCrop';
import UserAvatar from '../users/UserAvatar';
import Global from '../../utils/globalEvents';
import Api from '../../utils/apiCall';
import PostComment from './PostComment';
import Status from '../Status';
import Icons from '../icons';
import PostLikes from './PostLike';
import ColorField from '../ColorField';
import SlugField from '../SlugField';

const statusList = ['draft', 'published', 'archived'];

const PostPage = ({ state, post, data }) => {
  const [mode, setMode] = useState(post.id ? false : 'edit');
  const [postData, setPostData] = useState(post);
  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  let backupData = { ...post };
  const { user } = state;
  const canEdit = user.id && (Access.can('manage', user) || post.UserId === user.id);
  const save = async () => {
    console.log('save', postData);
    const result = await Api.call('post', 'POST', { ...postData });
    setMode(false);
    Global.dispatch('editmodeHide', false);
    if (!backupData.id) router.push(`/post/${result.id}`, null, {shallow: false});
    backupData = { ...postData };
  };
  const cancel = () => {
    setPostData(backupData);
    Global.dispatch('editmodeHide', false);
    setMode(false);
  };
  const edit = () => {
    Global.dispatch('editmodeHide', true);
    setMode('edit');
  };
  const saveImage = async (imgData, imgElement) => {
    Global.setLoading(true);
    const file = dataURIToFile(imgData);
    const imageFile = await imageResizer(file, { width: 1600, height: 900, filename: 'post.jpg' });
    const image = (await uploadToS3(imageFile)).url;
    const thumbFile = await imageResizer(imageFile, { width: 640, height: 360, filename: 'post-thumb.jpg' });
    const thumb = (await uploadToS3(thumbFile)).url;
    const colors = Colors.extract(imgElement);
    const update = { 
      coverImage: { image, thumb },
      colors,
    };
    updateFields(update)
    Global.setLoading(false);
  };
  const updateFields = (data) => {
    console.log('fields update', data);
    setPostData({ ...postData, ...data});
  }
  const theme = () => (postData.colors?.theme === 'dark' ? 'dark' : 'light');
  
  return (
    <Layout 
      title={`StrideEquity | ${post.name}`} 
      state={state} 
      invertNav={theme() === 'dark'}
    >

      { canEdit ? (
        <Navbar className="save-bar" fixed="bottom" variant="dark">
          <Container className="text-right">
            { mode === 'edit' ? (
              <>
                <IconButton icon="cancel" onClick={cancel}>Cancel</IconButton> &nbsp;
                <div>
                  <Status.Select
                    statusList={statusList}
                    selected={postData.status}
                    onChange={(status) => updateFields({status})}
                  />&nbsp;
                  <IconButton variant="light" icon="check" onClick={save}>Save</IconButton>
                </div>
              </>
            ) : (
              <>
                <Navbar.Text>
                  { postData.createdAt == postData.updatedAt ? (
                    <>created {moment(postData.createdAt).fromNow()}&nbsp;</>
                  ) :
                    <>updated {moment(postData.updatedAt).fromNow()}&nbsp;</>
                  }
                <Status status={postData.status} /></Navbar.Text> 
                <div className="justify-content-end"><IconButton variant="light" onClick={edit}>Edit</IconButton></div>
              </>
            )}
          </Container>
        </Navbar>
      ) : null}
      <div
        style={{
          height: '22vw', maxHeight: '550px', display: 'flex', background: Bg.generate(postData), 
        }}
        className={`image-header-${theme()}`}
      >

        <div style={{ alignSelf: 'flex-end', width: '100%' }}>

          <Container>
          <div style={{background: Bg.box(postData), padding: '20px'}} >
            <h1 style={{ margin: '10px auto' }}>
              <Editable 
                options={{maxChars:100}}
                edit={mode === 'edit'} 
                value={postData.name} 
                update={( name ) => updateFields({ name })}
              />
            </h1>
            <p>Posted {postData.publishDate ? moment(postData.publishDate).format('MMM Do YY') : null }
            &nbsp;by <UserAvatar user={postData.User} /> {postData.User?.name || 'author'} 
            </p> 
            </div>
          </Container>
          
        </div>
      </div>

      {mode === 'edit' ? (
            <Container>
              <UploadAndCrop
                variant="light"
                aspectRatio={16 / 9}
                update={saveImage}
                label="upload cover"
              />
             { postData.coverImage ? (
                <IconButton variant="dark" 
                  onClick={() => updateFields({ coverImage: false, colors: false })}
                  icon="cancel"
                >Remove Image
                </IconButton>
              ) : null }
             { postData.colors ? postData.colors.palette.map(
                (color, index) => <ColorField key={index} value={color} placement="bottom" onChange={
                  c => {
                    const palette = [...postData.colors.palette]
                    palette.splice(index, 1, c);
                    updateFields({colors: { ...postData.colors, palette }});
                  }
                }/>
              ) : null} 
                <Form.Check 
                  style={{display:'inline'}}
                  checked={postData.colors?.theme === 'dark'}
                  label="dark theme"
                  id="theme"
                  onChange={(e) => {
                    const theme = e.target.checked ? 'dark' : 'light';
                    updateFields({colors: { ...postData.colors, theme }})
                  }}
                />
              <SlugField path="post/" slug={postData.slug} update={(slug) => updateFields({slug})} />
            </Container>
          ) : null }

      <Container style={{ paddingTop: '20px' }}>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            { postData.id ? (
              <>
                <PostLikes post={post} like={data.like} user={state.user} />
                <Button variant="link" href="#comments">
                  <Icons.Chat /> {postData.comments} {pluralize('comment', postData.comments)}
                </Button>
              </>
            ) : null }

            <div className="airy text-center lead">
              <Editable 
                options={{maxChars:200}}
                edit={mode === 'edit'} 
                value={postData.description} 
                update={( description ) => updateFields({ description })}
              />
            </div>
          </Col>
          <Col md={{ span: 6, offset: 3 }}>
            {mode === 'edit' ? (
              <div  className="post-content"><EditContentField
                content={postData.content}  
                update={( content ) => updateFields({ content })}
              /></div>
            ) : null}
            {mode !== 'edit' ? (
              <div className="post-content" dangerouslySetInnerHTML={{ __html: postData.content }} />
            ) : null}
            <div className="airy">
              { postData.id ? (
                <PostComment.Panel 
                  comments={data.comments}
                  post={postData}
                  state={state}
                />
              ) : null }
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default PostPage;
