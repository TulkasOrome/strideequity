import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
 
import ServerProps from '../../lib/serverProps';
import Error from '../../components/Error';
import DashBoardLayout from '../../components/DashBoardLayout';

const DashboardPage = ({ state }) => {
  console.log('page state', state);
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
      hidefooter={1}
    >
      <Container style={{ paddingTop: '40px' }}>
        <Button>Users Model Sync</Button>
        <Button>Offers Model Sync</Button>
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
