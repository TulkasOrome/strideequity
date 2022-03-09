import React from 'react';
import { Container } from 'react-bootstrap';
import offersController from '../../../../lib/offers/offersController';
 
import ServerProps from '../../../../lib/serverProps';
import DashBoardLayout from '../../../../components/DashBoardLayout';
import serializable from '../../../../lib/serializable';
import OfferDashboardHeader from '../../../../components/offers/OfferDashboardHeader';
import Interest from '../../../../components/interests/Interest';
import Payment from '../../../../components/payments/Payment';
//

const EditOfferPage = ({ state, offer, payments }) => {
  ///
  const { user } = state;
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      
      <OfferDashboardHeader offer={offer} state={state} />
      <Payment.Table payments={payments} offer={offer} state={state} />
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
   
  const offer = await offersController.findById(query.id);
  const payments = await offersController.getPayments({ where: { OfferId: offer.id } });
  return {
    props: {
      state: await ServerProps.getState(req),
      offer: serializable(offer),
      payments: serializable(payments),
    },
  };
}

export default EditOfferPage;
