import React from 'react';
import OffersController from '../../../lib/offers/offersController';
import serializable from '../../../lib/serializable';
import ServerProps from '../../../lib/serverProps';
import Offer from '../../../components/offers/Offer';
import UsersController from '../../../lib/users/usersController';
import Error from '../../../components/Error';
import Access from '../../../utils/access';

const OfferPage = ({ state, offer, data }) => (
  ((!offer.id && !offer.new) || (!Access.can('manage', state.user) && offer.new)) 
  ? <Error statusCode={404} state={state} />
  : <Offer.Page 
    state={state}
    data={data}
    offer={offer}
  />
);

export async function getServerSideProps({ query, req, res }) {
  const offer = query.slug !== 'new'
  ? await ( 
    parseInt(query.slug) == query.slug
      ? OffersController.findById(query.slug)
      : OffersController.findBySlug(query.slug)
  )
  : { status: 'draft', new: true };
  const state = await ServerProps.getState(req);
  const data = {};
  if (state.user?.id && offer?.id) {
    data.interest = await UsersController.getOfferInterest(state.user.id, offer.id);
    data.payments = await UsersController.getOfferPayments(state.user.id, offer.id);
  }
  return {
    props: {
      state,
      offer: serializable(offer),
      data: serializable(data),
    },
  };
}

export default OfferPage;
