import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Card, Col, Row } from 'react-bootstrap';
import Bg from '../../utils/imageBackgrounds';
import ContentPage from './ContentPage';
import IconButton from '../IconButton';
import Api from '../../utils/apiCall';
import Status from '../Status';

const Page = ({ page }) => {
  const router = useRouter();
  const deletePage = async () => {
    await Api.call('page', 'DELETE', { id: page.id });
    router.reload();
  };
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={5}>
            <div style={{ 
              paddingBottom: '56.25%', 
              width: '100%',
              background: Bg.generate(page, true), 
            }}
            />
          </Col>
          <Col>
            <h3><PageLink page={page} /> <Status status={page.status} /></h3>
            <p>{page.description}</p>
            <IconButton href={`/page/${page.id}`}>Edit</IconButton>
            <IconButton icon="trash" onClick={deletePage}>Delete</IconButton>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  ); 
};

const PageLink = ({ page }) => (
  <Link 
    href={page.status === 'published' ? `/${page.slug}` : `/page/${page.id}`}
  >{ page.name }
  </Link>
);

const List = ({ pages }) => pages.map((p) => <Page key={p.id} page={p} />);

Page.Page = ContentPage;
Page.List = List;

export default Page;
