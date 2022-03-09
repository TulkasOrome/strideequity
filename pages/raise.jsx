import React from 'react';
import {
  Col, Row, Button, Container, 
} from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
 
import offersController from '../lib/offers/offersController';
import serializable from '../lib/serializable';
import LoginModal from '../components/auth/LoginModal';
import Icons from '../components/icons';

const IndexPage = ({ state, featured }) => {
  const router = useRouter();
  return (
    <Layout 
      title="StrideEquity | Venture Capital investing for everyone"
      invertNav
      meta={{ 
        card: 'summary_large_image',
        description: 'Open Source Collective is partnering with GitCoin to launch FundOSS, a pilot matching campaign based on a democratic funding model.', 
      }}
      state={state}
    >
      <div className="bg2 text-center headerContent">
        <Container>
          <Row className="content">
            <Col style={{ padding: '50px 0' }} md={{ span: 6, offset: 3 }}>
                <h1>Fundraising with StrideEquity
                </h1>
                <p>Easily raise funds while focusing on the growth of 
                  your company by simplifying the complex management of 
                  investments and investors.
                </p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="airy lead">
          <Col md={{ span: 6, offset: 3 }} >
            <h2 className="text-center">Who can apply?</h2>
            <p><Icons.Check /> Be able to prove first commercial results</p>
            <p><Icons.Check /> Be established in Australia</p>
            <p><Icons.Check /> Seek a minimum of $350,000 in equity</p>
            <p><Icons.Check /> Have an articulated business plan with financial projections</p>
            <Button
              onClick={() => (state.user.id ? router.push('/submit') : LoginModal.show('/submit'))}
              size="lg"
              block
              variant="outline-primary"
            >Start your application
            </Button>
          </Col>
        </Row>
      </Container>
    </Layout>
  ); 
};

export async function getServerSideProps({ req, res }) {
   
  const featured = await offersController.getFeatured();
  return {
    props: {
      state: await ServerProps.getState(req),
      featured: serializable(featured),
    },
  };
}

export default IndexPage;
