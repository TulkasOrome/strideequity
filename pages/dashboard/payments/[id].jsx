import React from 'react';
import { Container } from 'react-bootstrap';
 
import ServerProps from '../../../lib/serverProps';
import DashBoardLayout from '../../../components/DashBoardLayout';
import OffersController from '../../../lib/offers/offersController';
import serializable from '../../../lib/serializable';
import UsersController from '../../../lib/users/usersController';
import BankAccount from '../../../components/users/BankAccount';
import Payment from '../../../components/payments/Payment';
import Access from '../../../utils/access';

const DashboardPage = ({ state, data }) => {
  const len = data;
  console.log(data);
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard Payments" 
      state={state} 
    >
      <Container style={{ paddingTop: '40px' }}>
        <h2>Payment {data.payment.id}</h2> 
        <Payment payment={data.payment} admin={Access.can('manage', state.user)} />
        <BankAccount account={data.account} />
        
      </Container>
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
   
  const payment = await OffersController.getPayment({where: {id: query.id}});
  const account = await UsersController.getBankAccount(payment.BankAccountId);
  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable({ payment, account }),
    },
  };
}

export default DashboardPage;
