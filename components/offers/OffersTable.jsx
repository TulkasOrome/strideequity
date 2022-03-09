import React, { useState } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import moment from 'moment';
import Offers from './Offers';
import IconButton from '../IconButton';
import UserAvatar from '../users/UserAvatar';
import Access from '../../utils/access';
import Status from '../Status';
import User from '../users/User';

const statusActions = (offer, user) => {
  if (offer.status === 'submitted' && Access.can('manage', user)) {
    return (
      <IconButton variant="primary" href={`/dashboard/offers/${offer.id}`}>
        Review
      </IconButton>
    ); 
  }
  if (offer.status !== 'submitted') {
    return (
      <>
        <IconButton href={`/dashboard/offers/${offer.id}`}>Edit</IconButton>&nbsp;
        <IconButton icon="eye" href={`/offer/${offer.id}`}>View</IconButton>
      </>
    );
  }
  return null;
};
 
const OffersTable = ({ offers, state, admin }) => (
  <Table className="card-table">
    <tbody>
      {offers?.map((offer) => (
        <tr key={offer.id}>
          <td><Status status={offer.status} /> {offer.companyName}</td>
          <td>{offer.raiseRange}</td>
          { admin ? <td><User user={offer.User} admin={admin} /></td> : null }
          <td>{moment(offer.createdAt).fromNow()}</td>
          <td>{statusActions(offer, state.user)}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default OffersTable;
