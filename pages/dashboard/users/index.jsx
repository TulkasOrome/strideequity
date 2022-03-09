import React from 'react';
import {
  Table, Container, Button, Card, Form, Row, Col,
} from 'react-bootstrap';
 
import ServerProps from '../../../lib/serverProps';
import DashBoardLayout from '../../../components/DashBoardLayout';
import UsersController from '../../../lib/users/usersController';
import serializable from '../../../lib/serializable';
import UserAvatar from '../../../components/users/UserAvatar';
import IconButton from '../../../components/IconButton';
import User from '../../../components/users/User';
import DashboardModelNavbar from '../../../components/DashboardModelNavbar';

const UsersDashboardPage = ({ state, data }) => (
  <DashBoardLayout 
    title="StrideEquity | Dashboard" 
    state={state}
  >
    <Container>
      <DashboardModelNavbar model="Members" />
      <User.Table users={data.users} />
    </Container>
  </DashBoardLayout>
);

export async function getServerSideProps({ query, req, res }) {
   
  const data = {};
  if (query.s) {
    data.users = await UsersController.search(query.s);
    data.s = query.s;
  } else {
    data.users = await UsersController.getUsers();
  }
  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable(data),
    },
  };
}

export default UsersDashboardPage;
