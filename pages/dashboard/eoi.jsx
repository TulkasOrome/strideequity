import React from 'react';
import { Container, Table, Button } from 'react-bootstrap';
 
import ServerProps from '../../lib/serverProps';
import Error from '../../components/Error';
import DashBoardLayout from '../../components/DashBoardLayout';

const DashboardPage = ({ state }) => {
  const { user } = state;
  console.log('page state', state);
  console.log('state2', state);
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
      hidefooter={1}
    >
      <Container>
        <h1>Portfolio</h1>
        <Table className="card-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Full Name</th>
              <th>email</th>
              <th>role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><Button href={`/dashboard/users/edit/${user.id}`}>Edit</Button></td>
            </tr>
          </tbody>
        </Table>
 
      </Container>
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ req, res }) {
   
  const state = await ServerProps.getState(req);
  return {
    props: {
      state,
    },
  };
}

export default DashboardPage;
