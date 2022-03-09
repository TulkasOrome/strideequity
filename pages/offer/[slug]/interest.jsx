import React from 'react';
import {
  Col, Row, Button, Container, Card, 
} from 'react-bootstrap';
import OffersController from '../../../lib/offers/offersController';
import serializable from '../../../lib/serializable';
import ServerProps from '../../../lib/serverProps';
import UsersController from '../../../lib/users/usersController';
import Error from '../../../components/Error';
import Layout from '../../../components/layout';
import InterestForm from '../../../components/offers/InterestForm';

const OfferInterestPage = ({ state, offer, data }) => {
  if (!state.user.id) {
    return <Error statusCode={401} />;
  }
  return (
    <Layout 
      title="StrideEquity | Easily raise funds"
      meta={{ 
        card: 'summary_large_image',
        description: 'Easily raise funds while focusing on the growth of your company by simplifying the complex management of investments and investors.', 
      }}
      state={state}
      hidefooter
    >
      <div>
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }} style={{ padding: '150px 0 30px' }}>
              <InterestForm offer={offer} state={state} data={data} />
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const offer = await OffersController.findBySlug(query.slug);
  const state = await ServerProps.getState(req);
  const data = {};
  if (state.user?.id) {
    data.interest = await UsersController.getOfferInterest(state.user.id, offer.id);
  }
  return {
    props: {
      state,
      offer: serializable(offer),
      data: serializable(data),
    },
  };
}

export default OfferInterestPage;
