import React from 'react';
import OfferCard from './OfferCard';
import OfferPage from './OfferPage';
import OffersTable from './OffersTable';

const Offer = ({ offer }) => <OfferCard offer={offer} />;

Offer.Page = OfferPage;
Offer.Grid = OfferCard.Grid;
Offer.Table = OffersTable;

export default Offer;
