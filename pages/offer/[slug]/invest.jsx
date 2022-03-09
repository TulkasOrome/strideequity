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
import InvestForm from '../../../components/offers/InvestForm';

const OfferInvestPage = ({ state, offer, data }) => {
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
        <Container>
          <Row>
            <Col md={{ span: 8, offset: 2 }} style={{ padding: '150px 0 30px' }}>
              <InvestForm offer={offer} state={state} data={data} />
            </Col>
          </Row>
        </Container>
    </Layout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const state = await ServerProps.getState(req);
  const offer = await OffersController.findBySlug(query.slug);
  const data = {};
  if (state.user?.id) {
    data.accounts = await UsersController.getBankAccounts(state.user.id);
    data.payments = await UsersController.getOfferPayments(state.user.id, offer.id);
  }
  return {
    props: {
      state,
      offer: serializable(offer),
      data: serializable(data),
    },
  };
}

export default OfferInvestPage;
