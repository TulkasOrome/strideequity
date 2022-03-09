import React from 'react';
import {
  Col, Row, Button, Container, Card, 
} from 'react-bootstrap';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
 
import WholesaleVerificationForm from '../components/users/WholesaleVerificationForm';
import LoginModal from '../components/auth/LoginModal';
import serializable from '../lib/serializable';
import UsersController from '../lib/users/usersController';

const Page = ({ state, data }) => (
  <Layout 
    title="StrideEquity | Easily raise funds"
    meta={{ 
      card: 'summary_large_image',
      description: 'Easily raise funds while focusing on the growth of your company by simplifying the complex management of investments and investors.', 
    }}
    hidefooter
    state={state}
  >
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} style={{ padding: '150px 0 30px' }}>
            <h1 className="text-center">Wholesale investor verification</h1>
            <p>To be classified as a wholesale investor, you must meet&nbsp;
              one of two criteria. These are either:
            </p>
              
            <ul>
              <li>You must hold net assets worth more than $2.5 million; or</li>
              <li>Your gross household annual income must be at least $250,000&nbsp;
                (this can include income from a business if you’re a small business owner)
              </li>
            </ul>

            <p>To prove that you meet at least one of these criteria, investors are&nbsp;
              required to obtain a certificate from a qualified accountant stating so.
            </p>

            <p>There is also a third avenue that investors can take to participate&nbsp;
              in a syndicate that is only offered to wholesale investors.
            </p>

            <p>That is to invest more than $500,000 in the syndicate. Anything above&nbsp;
              this amount is classified as a wholesale investment and allows the investor&nbsp;
              to take part in a syndicate offered only to wholesale investors.
            </p>

            <p>If you meet any one of these three criteria, then you’ll be able to access&nbsp;
              more investments that potentially have greater returns or can provide&nbsp;
              more diversity to your portfolio.
            </p>
            { state.user.id ? (
              <Card>
                <Card.Body>
                  <WholesaleVerificationForm state={state} data={data} />
                </Card.Body>
              </Card>
            ) : (
              <div>
                <p>Sign in to verify your wholesale investor status</p>
                <Button variant="outline-primary" size="lg" onClick={() => LoginModal.show()}>Sign in to verify</Button>

              </div>
            )}

          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);

export async function getServerSideProps({ req, res }) {
  const state = await ServerProps.getState(req);
  const data = {};
  if (state.user.id) {
    data.verif = await UsersController.getWholesaleVerification(state.user.id);
  }
  return {
    props: {
      state,
      data: serializable(data),
    },
  };
}

export default Page;
