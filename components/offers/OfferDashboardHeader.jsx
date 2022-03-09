import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Nav, Button, Row, Col, 
} from 'react-bootstrap';
import chroma from 'chroma-js';
import Bg from '../../utils/imageBackgrounds';
import Offers from './Offers';

import Icons from '../icons';
import Status from '../Status';

const OfferDashboardHeader = ({ offer, stats }) => {
  const router = useRouter();
  return (
    <div style={{ marginBottom: '20px' }}>
      <h1>{offer.companyName} <Status status={offer.status} /> &nbsp; 
        { ['submitted', 'rejected'].indexOf(offer.status) === -1 ? (
          <Button size="lg" variant="outline-info" href={`/offer/${offer.slug}`}><Icons.Eye size={16} />View</Button>
        ) : null }
      </h1>
      <Nav variant="tabs" activeKey={router.asPath}>
        <Nav.Item>
          <Nav.Link href={`/dashboard/offers/${offer.id}`}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/dashboard/offers/${offer.id}/questions`}>
            Questions
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/dashboard/offers/${offer.id}/interests`}>
            Expression of interest
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href={`/dashboard/offers/${offer.id}/payments`}>
            Payments
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>

  ); 
};

export default OfferDashboardHeader;
