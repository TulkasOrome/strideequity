import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import usersController from '../lib/users/usersController';
 
import ServerProps from '../lib/serverProps';
import Layout from '../components/layout';
import serializable from '../lib/serializable';
import EditUserForm from '../components/users/EditUserForm';
import AvatarField from '../components/users/AvatarField';
//

const AccountPage = ({ state, userData }) => {
  const { user } = state;
  return (
    <Layout 
      title="StrideEquity | Account" 
      state={state} 
    >
      <Container style={{ paddingTop: '300px' }}>
        <h1>{user.name}</h1>
        <Row>
          <Col md="8">
            <EditUserForm user={userData} state={state} />
          </Col>
          <Col md="4">
            <AvatarField user={userData} state={state} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ req, res }) {
  const state = await ServerProps.getState(req);
  const userData = await usersController.getUserData(state.user.id);
  return {
    props: {
      state,
      userData: serializable(userData),
    },
  };
}

export default AccountPage;
