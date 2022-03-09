import React from 'react';
import {
  Col, Row, Button, Container, Card, 
} from 'react-bootstrap';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
 
import SubmitOfferForm from '../components/offers/SubmitOfferForm';

const Page = ({ state }) => (
  <Layout 
    title="StrideEquity | Easily raise funds"
    meta={{ 
      card: 'summary_large_image',
      description: 'Easily raise funds while focusing on the growth of your company by simplifying the complex management of investments and investors.', 
    }}
    state={state}
  >
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} style={{ padding: '80px 0 30px' }}>
            <h1 className="text-center">Contact StrideEquity</h1>
            <p className="text-center">Easily raise funds while focusing on the growth of 
              your company by simplifying the complex management of 
              investments and investors.
            </p>
            <Card>
              <Card.Body>
                <SubmitOfferForm />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);

export async function getServerSideProps({ req, res }) {
   
  return {
    props: {
      state: await ServerProps.getState(req),
    },
  };
}

export default Page;
