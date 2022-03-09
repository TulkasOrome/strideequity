import React from 'react';
import {
  Col, Row, Button, Container, Card, 
} from 'react-bootstrap';
import Layout from '../components/layout';
import ServerProps from '../lib/serverProps';
import ChangePasswordForm from '../components/users/ChangePasswordForm';
import serializable from '../lib/serializable';
import UsersController from '../lib/users/usersController';

const Page = ({ state, valid, passkey }) => (
  <Layout 
    title="StrideEquity | Reset your password"
    meta={{ 
      card: 'summary_large_image',
      description: 'Password reset.', 
    }}
    hidefooter
    state={state}
  >
    <div>
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }} style={{ padding: '150px 0 30px' }}>
            <h1 className="text-center">Reset your password</h1>
            {valid ? <ChangePasswordForm passkey={passkey} /> : <p  className="text-center">Sorry this key is not valid</p>}
          </Col>
        </Row>
      </Container>
    </div>
  </Layout>
);

export async function getServerSideProps({ query, req, res }) {
  const state = await ServerProps.getState(req);
  const user = await UsersController.findBy('resetPasswordKey', query.key );
  console.log('key', query.key)
  return {
    props: {
      state,
      valid: !!user,
      passkey: query.key,
    },
  };
}

export default Page;
