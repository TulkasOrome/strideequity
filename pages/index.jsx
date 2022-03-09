import React from 'react';
import {
  Col, Row, Button, Container, 
} from 'react-bootstrap';
import Link from 'next/link';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
import offersController from '../lib/offers/offersController';
import pagesController from '../lib/pages/pagesController';
import serializable from '../lib/serializable';
import OfferCard from '../components/offers/OfferCard';
import Subscribe from '../components/Subscribe';
import HomeBlocks from '../components/HomeBlocks';

const IndexPage = ({ state, data }) => (
  <Layout 
    title="StrideEquity | Venture Capital investing for everyone"
    invertNav
    meta={{ 
      card: 'summary_large_image',
      description: 'Open Source Collective is partnering with GitCoin to launch FundOSS, a pilot matching campaign based on a democratic funding model.', 
    }}
    state={state}
  >
    <div className="bg1 text-center headerContent">
      <Container>
        <Row className="content">

          <Col style={{ padding: '50px 0' }} className="d-none d-md-block">
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h2>Venture Capital Investing
                for Everyone in Australia
              </h2>
              <p>Private market investment opportunities,
                highly vetted by our experienced team.
              </p>
              <Link href="/invest">
                <Button href="/invest" size="lg">View all oportunities</Button>
              </Link>
            </div>
          </Col>
          <Col style={{ padding: '50px 0' }}>
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h2>Raising funds has never been this easy</h2>
              <p>StrideEquity is a platform for start-ups, 
                scale-ups and other growing businesses in Australia.
              </p>
              <Link href="/raise">
                <Button href="/raise" size="lg">Check your eligibility</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    <Container>
      <HomeBlocks data={data} />
      <Subscribe user={state.user} />
      <h3 className="text-center airy">Latest Investment Opportunities</h3>
      <OfferCard.Grid offers={data.offers} />
    </Container>
  </Layout>
);

export async function getServerSideProps({ query, req, res }) {
  const data = {
    offers: await offersController.getFeatured(),
    pages: await pagesController.getFeatured(),
  }

  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable(data),
    },
  };
}

export default IndexPage;
