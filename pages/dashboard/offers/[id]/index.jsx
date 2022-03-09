import React from 'react';
import { Container } from 'react-bootstrap';
import offersController from '../../../../lib/offers/offersController';
 
import ServerProps from '../../../../lib/serverProps';
import DashBoardLayout from '../../../../components/DashBoardLayout';
import serializable from '../../../../lib/serializable';
import formatAmountForDisplay from '../../../../utils/currency';
import OfferDashboardHeader from '../../../../components/offers/OfferDashboardHeader';
import ReviewForm from '../../../../components/offers/ReviewForm';
import Access from '../../../../utils/access';
//

const EditOfferPage = ({ state, offer, stats }) => {
  ///
  const { user } = state;
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      <OfferDashboardHeader offer={offer} user={user} stats={stats} />
      { stats ? (
        <p>Interest : {formatAmountForDisplay(stats.interest)} Payments : {formatAmountForDisplay(stats.payment)}</p>
      ) : null }
      { Access.can('manage', state.user) && offer.status === 'submitted' ? <ReviewForm offer={offer} user={user} /> : null }
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
   
  const offer = await offersController.findById(query.id);
  const stats = await offersController.getStats(query.id);
  console.log(stats);
  return {
    props: {
      state: await ServerProps.getState(req),
      offer: serializable(offer),
      stats,
    },
  };
}

export default EditOfferPage;
