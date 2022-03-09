import React from 'react';
import { Container } from 'react-bootstrap';
import DashboardModelNavbar from '../../../components/DashboardModelNavbar';
import IconButton from '../../../components/IconButton';
import ServerProps from '../../../lib/serverProps';
import DashBoardLayout from '../../../components/DashBoardLayout';
import OffersController from '../../../lib/offers/offersController';
import serializable from '../../../lib/serializable';
import Offer from '../../../components/offers/Offer';

const OffersDashboardPage = ({ state, data }) => {
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      <Container style={{ paddingTop: '40px' }}>
        <DashboardModelNavbar model="Offers" data={data}>
          <IconButton href="/offer/new" icon="plus">new offer</IconButton>
        </DashboardModelNavbar>

        <Offer.Table offers={data.offers} state={state} admin />
      </Container>
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
  const data = {};
  if (query.s) {
    data.offers = await OffersController.search(query.s);
    data.s = query.s;
  } else {
    data.offers = await OffersController.getOffers();
  }

  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable(data),
    },
  };
}

export default OffersDashboardPage;
