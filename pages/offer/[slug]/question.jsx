import React from 'react';
import {
  Col, Row, Button, Container, Card, 
} from 'react-bootstrap';
import OffersController from '../../../lib/offers/offersController';
import serializable from '../../../lib/serializable';
import ServerProps from '../../../lib/serverProps';
import Error from '../../../components/Error';
import Layout from '../../../components/layout';
import OfferQuestion from '../../../components/offers/OfferQuestion';
import Icons from '../../../components/icons';

const OfferQuestionPage = ({ state, offer, data }) => {
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
            <Col lg={{ span: 6, offset: 3 }} md={{ span: 8, offset: 2 }} style={{ paddingTop: '150px' }}>
              
              <OfferQuestion.Form offer={offer} state={state} data={data} />
              { data.questions.length ? (
                <div>
                  <h3><Icons.Question /> Your question history</h3>
                  <OfferQuestion.List questions={data.questions} />
                </div>
              ) : null }
              
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const state = await ServerProps.getState(req);
  const offer = await OffersController.findBySlug(query.slug);
  const data = {};
  if (state.user?.id) {
    data.questions = await OffersController.getQuestions(
      { where: { UserId: state.user.id, OfferId: offer.id } },
    );
    console.log('data.questions', data.questions)
  }
  return {
    props: {
      state,
      offer: serializable(offer),
      data: serializable(data),
    },
  };
}

export default OfferQuestionPage;
