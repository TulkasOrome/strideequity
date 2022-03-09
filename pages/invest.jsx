import React from 'react';
import {
  Col, Row, Button, Container, 
} from 'react-bootstrap';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
 
import offersController from '../lib/offers/offersController';
import serializable from '../lib/serializable';
import OfferCard from '../components/offers/OfferCard';

const InvestPage = ({ state, offers }) => (
  <Layout 
    title="StrideEquity | Venture Capital investing for everyone"
    invertNav
    meta={{ 
      card: 'summary_large_image',
      description: 'Open Source Collective is partnering with GitCoin to launch FundOSS, a pilot matching campaign based on a democratic funding model.', 
    }}
    state={state}
  >
    <div className="bg3 text-center headerContent">
      <Container>
        <Row className="content">
          <Col style={{ padding: '50px 0' }}>
            <h1>Venture Capital investing for everyone</h1>
            <p>StrideEquity is a platform for start-ups, 
              scale-ups and other growing businesses in Australia.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    <Container>
      <h3 className="text-center airy">Latest Investment Opportunities</h3>
      <OfferCard.Grid offers={offers} />
    </Container>
  </Layout>
);

export async function getServerSideProps({ req, res }) {
   
  const offers = await offersController.getPublished();
  return {
    props: {
      state: await ServerProps.getState(req),
      offers: serializable(offers),
    },
  };
}

export default InvestPage;
