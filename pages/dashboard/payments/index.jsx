import React from 'react';
import Container from 'react-bootstrap/Container';
 
import ServerProps from '../../../lib/serverProps';
import DashBoardLayout from '../../../components/DashBoardLayout';
import OffersController from '../../../lib/offers/offersController';
import serializable from '../../../lib/serializable';
import Payment from '../../../components/payments/Payment';
import DashboardModelNavbar from '../../../components/DashboardModelNavbar';
import IconButton from '../../../components/IconButton';

const DashboardPage = ({ state, data }) => (
  <DashBoardLayout 
    title="StrideEquity | Dashboard" 
    state={state} 
    hidefooter={1}
  >
    <Container>
      <DashboardModelNavbar data={data} model="Payments">
        <div className="d-flex">
          <IconButton icon="plus">New Payment</IconButton>
        </div>
      </DashboardModelNavbar>
      <Payment.Table payments={data.payments} admin />
    </Container>
  </DashBoardLayout>
);

export async function getServerSideProps({ query, req, res }) {
   
  const state = await ServerProps.getState(req);
  const data = {};
  if (query.s) {
    data.payments = await OffersController.searchPayments(query.s);
    data.s = query.s;
  } else {
    data.payments = await OffersController.getPayments();
  }
  return {
    props: {
      state,
      data: serializable(data),
    },
  };
}

export default DashboardPage;
