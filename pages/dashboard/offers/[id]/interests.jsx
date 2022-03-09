import React from 'react';
import { Container } from 'react-bootstrap';
import offersController from '../../../../lib/offers/offersController';
 
import ServerProps from '../../../../lib/serverProps';
import DashBoardLayout from '../../../../components/DashBoardLayout';
import serializable from '../../../../lib/serializable';
import OfferDashboardHeader from '../../../../components/offers/OfferDashboardHeader';
import Interest from '../../../../components/interests/Interest';
//

const EditOfferPage = ({ state, offer, interests }) => {
  ///
  const { user } = state;
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      <OfferDashboardHeader offer={offer} state={state} />
      <Interest.List small interests={interests} state={state} />
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
   
  const offer = await offersController.findById(query.id);
  const interests = await offersController.getInterests({ where: { OfferId: offer.id } });
  return {
    props: {
      state: await ServerProps.getState(req),
      offer: serializable(offer),
      interests: serializable(interests),
    },
  };
}

export default EditOfferPage;
