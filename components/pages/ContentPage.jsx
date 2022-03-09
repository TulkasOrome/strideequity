import React, { useState } from 'react';
import {
  Col, Container, Form, FormControl, InputGroup, Navbar, Row, 
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import ColorField from '../ColorField';
import imageResizer, { dataURIToFile } from '../../utils/imageResizer';
import Colors from '../../utils/colorPaletteExtracter';
import Access from '../../utils/access';
import Bg from '../../utils/imageBackgrounds';
import Editable from '../Editable';
import EditContentField from '../EditContentField';
import IconButton from '../IconButton';
import Layout from '../layout';
import UploadAndCrop from '../UploadAndCrop';
import Global from '../../utils/globalEvents';
import Api from '../../utils/apiCall';
import Status from '../Status';
import SlugField from '../SlugField';
import chroma from 'chroma-js';

const statusList = ['draft', 'published', 'archived'];

const ContentPage = ({ state, page = { name: 'New Page', description: 'Your description' }, data }) => {
  const [mode, setMode] = useState(page.id ? false : 'edit');
  const [pageData, setPageData] = useState(page);
  const { uploadToS3 } = useS3Upload();
  const router = useRouter();
  let backupData = { ...page };
  const { user } = state;

  const canEdit = user.id && (Access.can('manage', user) || page.UserId === user.id);
  

  const background = () => {
    const { coverImage, colors } = pageData;
    if (!coverImage) return colors?.theme === 'dark' ? '#000' : '#fff';
    const imageUrl = coverImage.image;
    const p = colors.palette;
    if (colors.theme === 'light') {
      const c1 = chroma(p[4]).alpha(0.6);
      const c2 = chroma(p[3]).alpha(0.5);
      return `linear-gradient(180deg, ${c1} 10%, ${c2} 80%), url(${imageUrl}) center center / cover, ${colors.imgColor}`;
    }
    const c1 = chroma(p[0]).alpha(0.6);
    const c2 = chroma(p[1]).alpha(0.5);
    return `linear-gradient(180deg, ${c1} 10%, ${c2} 80%), url(${imageUrl}) center center / cover, ${colors.imgColor}`;
  }

  const save = async () => {
    const result = await Api.call('page', 'POST', pageData);
    setMode(false);
    Global.dispatch('editmodeHide', false);
    if (!backupData.id) router.push(`/page/${result.id}`);
    backupData = { ...pageData };
  };
  const cancel = () => {
    setPageData(backupData);
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
    console.log(imgData)
    const imageFile = await imageResizer(file, { width: 1600, height: 900, filename: 'page.jpg' });
    const image = (await uploadToS3(imageFile)).url;
    const thumbFile = await imageResizer(imageFile, { width: 640, height: 360, filename: 'page-thumb.jpg' });
    const thumb = (await uploadToS3(thumbFile)).url;
    const colors = Colors.extract(imgElement);
    const update = { 
      coverImage: { image, thumb },
      colors,
    };
    setPageData({ ...pageData, ...update });
    Global.setLoading(false);
  };

  const updateFields = (data) => {
    console.log('fields update', data);
    setPageData({ ...pageData, ...data});
  }

  const theme = () => (pageData.colors?.theme === 'dark' ? 'dark' : 'light');
  
  const headerStyle = pageData.coverImage ? {
    height: '56.25vw',
    maxHeight: '550px',
    display: 'flex',
    background: background(), 
  } : {
    height: '56.25vw', maxHeight: '350px', display: 'flex', paddingTop: '150px', 
  };
  return (
    <Layout 
      title={`StrideEquity | ${page.name}`} 
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
                    selected={pageData.status}
                    onChange={(status) => updateFields({ status })}
                  />&nbsp;
                  <IconButton variant="light" icon="check" onClick={save}>Save</IconButton>
                </div>
              </>
            ) : (
              <>
                <Navbar.Text>You can edit this page</Navbar.Text>
                <div className="justify-content-end"><IconButton variant="light" onClick={edit}>Edit</IconButton></div>
              </>
            )}
          </Container>
        </Navbar>
      ) : null}
      <div
        style={headerStyle}
        className={`image-header image-header-${theme()}`}
      >

        <div style={{ alignSelf: 'center', width: '100%' }}>
          {mode === 'edit' ? (
            <div style={{ margin: '20px auto' }}>
              <UploadAndCrop
                size="lg" 
                variant="dark"
                aspectRatio={16 / 9}
                update={saveImage}
                label="upload cover"
              />&nbsp;
              { pageData.coverImage ? (
                <IconButton variant="dark" size="lg"
                  onClick={() => updateFields({ coverImage: false, colors: false })}
                  icon="cancel"
                >Remove Image
                </IconButton>
              ) : null }<br />
             { pageData.colors ? pageData.colors.palette.map(
                (color, index) => <ColorField key={index} value={color} placement="bottom" onChange={
                  c => {
                    const palette = [...pageData.colors.palette]
                    palette.splice(index, 1, c);
                    updateFields({ colors: { ...pageData.colors, palette } })
                  }
                }/>
              ) : null}
                </div>
              ) : null }
          <Container>
            <h1 style={{ maxWidth: '550px', margin: '10px auto' }} className="text-center">
              <Editable 
                options={{maxChars:100}}
                edit={mode === 'edit'} 
                value={pageData.name} 
                update={(name) => updateFields({ name })}
              />
            </h1>
            {mode === 'edit' ? (
              <SlugField slug={pageData.slug} update={(slug) => updateFields({slug})} />
            ) : null }
            <Row>
              <Col md={{ span: 8, offset: 2 }}>
                <div className="airy text-center lead">
                  <Editable 
                    options={{maxChars:300}}
                    edit={mode === 'edit'} 
                    value={pageData.description} 
                    update={(description) => updateFields({ description })}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Container style={{ paddingTop: '50px' }} className="page-content">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            {mode === 'edit' ? (
              <EditContentField
                options="p b h2 h3 li img left center right"
                content={pageData.content}  
                update={(content) => setPageData({ ...pageData, ...{ content } })}
              />
            ) : null}
            {mode !== 'edit' ? (
              <div className="editor-content" dangerouslySetInnerHTML={{ __html: pageData.content }} />
            ) : null}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ContentPage;
