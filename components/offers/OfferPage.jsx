import React, { useState, useEffect } from 'react';
import {
  Button,
  Col, Container, Form, Navbar, Row, Badge, Nav, Alert, Card,
} from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useS3Upload } from 'next-s3-upload';
import slugify from 'slugify';
import Link from 'next/link';
import Global from '../../utils/globalEvents';
import imageResizer, { dataURIToFile } from '../../utils/imageResizer';
import ColorField from '../ColorField';
import formatAmountForDisplay from '../../utils/currency';
import Colors from '../../utils/colorPaletteExtracter';
import Bg from '../../utils/imageBackgrounds';
import Api from '../../utils/apiCall';
import AnchorLinker from '../../utils/anchorLinker';
import Editable from '../Editable';
import EditContentField from '../EditContentField';
import IconButton from '../IconButton';
import Layout from '../layout';
import UploadAndCrop from '../UploadAndCrop';
import LoginModal from '../auth/LoginModal';
import Interest from '../interests/Interest';
import Status from '../Status';
import Offers from './Offers';
import ShareButton from '../social/ShareButton';
import Icons from '../icons';

const statusList = ['submitted', 'draft', 'preview', 'active', 'finished', 'rejected'];

const OfferPage = ({ state, offer, data }) => {
  const [mode, setMode] = useState(false);
  const [offerData, setOfferData] = useState(offer);
  const [action, setAction] = useState(false);
  const [touched, setTouched] = useState(offer);
  const [interest, setInterest] = useState(data.interest);
  const [payments, setPayments] = useState(data.payments);
  const [updates, setUpdates] = useState({id: offer.id});
  const [linked, setLinked] = useState({ links: [], content: offer.content });
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const router = useRouter();
  const totalPayments = data.payments ? data.payments.reduce(
    (a,p) => p.status !== 'canceled' ? a + p.amount : a, 0
  ) : 0 ;
  let backupData = { ...offer };


  useEffect(() => {
    const act = router.asPath.split('#')[1];
    setLinked(AnchorLinker(offerData.content));
    if (act === 'edit') {
      setMode('edit');
    } else if (act) setAction(act);
  }, []);

  const { user } = state;
  const canEdit = user.id && (user.role === 'admin' || offer.UserId === user.id);
  const theme = () => (offerData.colors?.theme === 'dark' ? 'dark' : 'light');

  const edit = () => {
    Global.dispatch('editmodeHide', true);
    setMode('edit');
  };

  const save = async () => {
    console.log('updtates', updates);
    const result = await Api.call('offer', 'POST', updates);
    setLinked(AnchorLinker(offerData.content));
    setMode(false);
    if (!backupData.id) router.push(`/offer/${result.id}`);
    backupData = { ...offerData };
    setTouched(false);
    Global.dispatch('editmodeHide', false);
  };

  const cancel = () => {
    setOfferData(backupData);
    setMode(false);
    setTouched(false);
    Global.dispatch('editmodeHide', false);
  };

  const updateFields = (data) => {
    setUpdates({ ...updates, ...data });
    setOfferData({ ...offerData, ...data});
    setTouched(true);
  }

  const saveImage = async (imgData, imgElement) => {
    Global.setLoading(true);
    const file = dataURIToFile(imgData);
    const imageFile = await imageResizer(file, { width: 1600, height: 900, filename: 'offer.jpg' });
    const image = (await uploadToS3(imageFile)).url;
    const thumbFile = await imageResizer(imageFile, { width: 640, height: 360, filename: 'offer-thumb.jpg' });
    const thumb = (await uploadToS3(thumbFile)).url;
    const colors = Colors.extract(imgElement);
    const update = { 
      coverImage: { image, thumb },
      colors,
    };
    updateFields(update);
    setTouched(true);
    Global.setLoading(false);
  };

  const offerAction = (action) => (user.id 
    ? router.push(`/offer/${offer.slug}/${action}`) 
    : LoginModal.show(`/offer/${offer.slug}/${action}`)
  );

  const handleDocumentChange = async (file) => {
    const { url } = await uploadToS3(file);
    updateFields({ offerDocument: url });
    console.log('handleDocumentChange', url);
    setTouched(true);
  };

  const disabledStyle = mode === 'edit' ? { opacity: 0.1, pointerEvents: 'none' } : {};

  const ThemeFields = ({}) => {
    let cols = [3,4];
    if(offerData.colors.theme == 'dark'){
      cols = [0,1];
    }
    return (
      <span>
        <ColorField key="c1" value={offerData.colors.palette[cols[0]]} placement="bottom" onChange={
          c => {
            const palette = [...offerData.colors.palette]
            palette.splice(cols[0], 1, c);
            updateFields({ colors: { ...offerData.colors, palette } })
          }
        }/>
         <ColorField key="c2" value={offerData.colors.palette[cols[1]]} placement="bottom" onChange={
          c => {
            const palette = [...offerData.colors.palette]
            palette.splice(cols[1], 1, c);
            updateFields({ colors: { ...offerData.colors, palette } })
          }
        }/>
        <ColorField key="bg" value={offerData.colors.palette[2]} placement="bottom" onChange={
          c => {
            const palette = [...offerData.colors.palette]
            palette.splice(2, 1, c);
            updateFields({ colors: { ...offerData.colors, palette } })
          }
        }/>
        <Form.Check
          style={{display: 'inline'}}
          checked={offerData.colors?.theme === 'dark'}
          label="dark theme"
          id="theme"
          onChange={(e) => {
            const theme = e.target.checked ? 'dark' : 'light';
            updateFields({ colors: { ...offerData.colors, theme } })
          }}
        />
      </span>
    )
  }
  
  return (
    <Layout 
      meta={{
        description: offer.description,
      }}
      title={`StrideEquity - ${offer.companyName}`} 
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
                    selected={offerData.status}
                    onChange={(status) => updateFields({ status })} 
                  />&nbsp;
                  <IconButton icon="check" onClick={save}>Save</IconButton>
                </div>
              </>
            ) : (
              <>
                <Navbar.Text>You can edit this offer</Navbar.Text>
                <div className="justify-content-end">
                  <IconButton onClick={edit}>Edit</IconButton>&nbsp;
                  <IconButton icon="dash" href={`/dashboard/offers/${offerData.id}`}>Manage</IconButton>
                </div>
              </>
            )}
          </Container>
        </Navbar>
      ) : null}
      <div 
        style={{
          background: Bg.generate(offerData), 
        }}
        className={`image-header image-header-${theme()}`}
      >

        <div style={{ alignSelf: 'flex-end', width: '100%' }} >
          <div style={{ background: Bg.box(offerData), padding: '1px 0 20px' }}>
          {mode === 'edit' ? (
        <Navbar variant="dark"  style={
            {
              margin:'-50px 0 0 -20px', 
              background:theme() === 'light' ? '#fff' : '#000',
            }
          }>
          <Container>
            <div>
            <UploadAndCrop
              variant="dark"
              aspectRatio={16 / 9}
              update={saveImage}
              label="upload cover"
            />

            { offerData.coverImage ? (
              <IconButton variant="dark" 
                onClick={() => updateFields(
                  { coverImage: false, colors: false },
                )}
                icon="cancel"
              >Remove Image
              </IconButton>
            ) : null }
              <ThemeFields />
            </div>
          </Container>
        </Navbar>
        ) : null }
        <div style={{margin:'15px'}}>
            <Container>
              <Row>
                <Col lg={3} className="text-right">
                  Price per share&nbsp;
                  <Editable
                    type="number"
                    edit={mode === 'edit'} 
                    options={{min:1, max:20000, step:1}}
                    value={offerData.sharePrice} 
                    render={(val) => <Badge variant="light">{formatAmountForDisplay(val)}</Badge>}
                    update={(sharePrice) => updateFields({sharePrice})}
                  /><br />
                  Min investment&nbsp;
                  <Editable
                    type="number"
                    options={{min:4000, max:20000, step:1000}}
                    edit={mode === 'edit'} 
                    value={offerData.minInvestment} 
                    render={(val) => <Badge variant="light">{formatAmountForDisplay(val)}</Badge>}
                    update={(minInvestment) => updateFields({minInvestment})}
                  /><br />
                  Raise target&nbsp;
                  <Editable
                    type="number"
                    options={{min:300000, max:5000000, step:10000}}
                    edit={mode === 'edit'} 
                    value={offerData.target} 
                    render={(val) => <Badge variant="light">{formatAmountForDisplay(val)}</Badge>}
                    update={(target) => updateFields({target})}
                  /><br />
                </Col>
                <Col className="text-lg-left text-center">
                  {{ wholesale: <Badge variant="warning">Wholesale</Badge>, retail: <Badge variant="success">Retail</Badge> }[offerData.type]}
                  <h1 style={{ margin: '0 0' }}>
                    <Editable 
                      options={{maxChars:50}}
                      edit={mode === 'edit'} 
                      value={offerData.companyName} 
                      update={(companyName) => updateFields({companyName})}
                    />
                  </h1>
                  <Editable 
                    options={{maxChars:200}}
                    edit={mode === 'edit'} 
                    value={offerData.pitch} 
                    update={(pitch) => updateFields({pitch})}
                  />
                </Col>
                <Col lg={3} className="text-center">
              {offerData.status === 'active' ? (
                <div>
                  {state.user.id && offerData.type === 'wholesale' && !state.user.verifiedWholesale ? (
                    <Alert variant="primary">
                      <Icons.Award />
                      To Invest in this offer you have to be a verified wholesale investor. 
                      <Link href="/wholesale" passHref>
                        <Button block variant="primary">
                          Become wholesale investor
                        </Button>
                      </Link>
                    </Alert>
                  ) : (
                    <div>
                      { totalPayments ? (<small>Previous payments <Badge variant="info"> {formatAmountForDisplay(totalPayments)}</Badge></small>) : null }
                      <Button
                        variant={theme() == 'dark' ? 'light' : 'dark'}
                        onClick={() => offerAction('invest')}
                        block
                      >Invest in {offerData.companyName} 
                      </Button>
                      <p className="small">Always consider the risk warning and your eligibility to invest.</p>
                    </div>
                  )}
                  
                </div>
              ) : null}
              {offerData.status === 'preview' ? (
                <>
                  { interest?.range ? (
                    <p>
                      You have registered interest in this offer.
                      <Badge variant="success">{Interest.getRangeLabel(interest.range)}</Badge>&nbsp;
                      <IconButton
                        variant="link"
                        size="sm"
                        onClick={() => offerAction('interest')}
                        
                      >
                      </IconButton>
                    </p>
                  ) : (
                    <div>
                      <Button
                        variant={theme() == 'dark' ? 'light' : 'dark'}
                        onClick={() => offerAction('interest')}
                        block
                      >Expression of Interest
                      </Button>
                      <p className="small">Register your interest for this offer and get notified of any changes.</p>
                    </div>
                  )}

                </>
              ) : null }
                  <div>Share 
                  <ShareButton platform="twitter" mini  />
                  <ShareButton platform="facebook" mini />
                  <ShareButton platform="linkedin" mini />
                  <ShareButton platform="email" mini />
                  </div>
                </Col>
              </Row>
            </Container>
            </div>
          </div>
        </div>
      </div>


      <Container style={{ paddingTop: '70px' }}>
        <Row>
          <Col md={3} className="d-none d-md-block" style={disabledStyle}>
            <Nav className="offer-nav flex-column">
              {linked.links.map((p, index) => <Nav.Link href={`#${slugify(p)}`} key={`#p${index}`}>{p}</Nav.Link>)}
            </Nav>
          </Col>

          <Col md={{ span: 6 }}  className="offer-content" >
            {mode === 'edit' ? (
              <EditContentField
                content={offerData.content}  
                update={(content) => updateFields({content})}
              />
            ) : null}

            {mode !== 'edit' ? (
              <div className="offer-content" dangerouslySetInnerHTML={{ __html: linked.content }} />
            ) : null}
          </Col>
          <Col md={3} sm={{order:1}} className="text-center">
            { mode === 'edit' ? (
              <div className="airy">
                <IconButton onClick={openFileDialog} icon="upload">Upload offer document</IconButton>
                <FileInput onChange={handleDocumentChange} />
                <hr />
                <Form.Group>
                  <Form.Check
                    checked={offerData.type === 'wholesale'}
                    label="restrict to wholesale"
                    id="wholesale"
                    onChange={(e) => {
                      updateFields({ type: e.target.checked ? 'wholesale' : 'retail' });
                    }}
                  />
                </Form.Group>
              </div>
            ) : null}
            <div style={disabledStyle}>
              
              <div>
                <Button variant={'dark'} onClick={() => offerAction('question')} block>Ask a question about this offer</Button>
                <p>The {offerData.companyName} team is available to answer all your&nbsp;
                  questions through our communication facility
                </p>
              </div>
            
              { offerData.offerDocument && state.user.id ? (
                <Button variant={'dark'} href={offerData.offerDocument} block>Download offer document</Button>
              ) : null }

            </div>

          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default OfferPage;
