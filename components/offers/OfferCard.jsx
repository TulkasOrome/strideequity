import React, { useState } from 'react';
import {
  Card, Button, Row, Col, Badge,
} from 'react-bootstrap';
import Link from 'next/link';
import Bg from '../../utils/imageBackgrounds';
import Offers from './Offers';
import formatAmountForDisplay from '../../utils/currency';
import Status from '../Status';

const Image = ({ offer, title }) => (
  <div 
    className="card-img invert text-center" 
    style={{ 

      color: offer.colors.theme === 'dark' ? '#fff':'#000',
      background: `url(${offer.coverImage.thumb}) center center / cover`,
    }}
  >
    <div 
    className="img-title"
    style={
      {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
      }
    }
    >
      {title ? (
        <div style={
          {
            alignSelf: 'end', 
            width:'100%', 
            background: Bg.box(offer),  
          }
        }>
        <Card.Body>
        <Title offer={offer} />&nbsp;
        {{ wholesale: <Badge variant="warning">Wholesale</Badge>, retail: <Badge variant="success">Retail</Badge> }[offer.type]}
        <br />
            <small>min: </small>
            <Badge variant="success">{formatAmountForDisplay(offer.minInvestment)}</Badge>
            &nbsp;-&nbsp;
            <small>Target: </small>
            <Badge variant="success">{formatAmountForDisplay(offer.target)}</Badge>
        </Card.Body>
        </div>
      ) : null}
    </div>
  </div>
);

const Title = ({ offer }) => <b>{offer.companyName}</b>;

const OfferCard = ({ offer }) => (
  <Card style={{ height: '100%' }}>
    <Image offer={offer} title />
    <Card.Body>
      <Card.Text className="text-center">
        {offer.pitch}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link href={`/offer/${offer.slug}`}>
        {{ 
          active: <Button size="lg" variant="primary" block href={`/offer/${offer.slug}`}>Invest Now</Button>,
          preview: <Button size="lg" variant="info" block href={`/offer/${offer.slug}`}>Express Interest</Button>,
        }[offer.status]}
      </Link>
    </Card.Footer>
  </Card>
);

const Grid = ({ offers }) => (
  <Row>
    {offers.map((offer) => (
      <Col md={4} key={offer.id} className="row-eq-height" style={{ marginBottom: '30px' }}>
        <OfferCard offer={offer} />
      </Col>
    ))}
  </Row>
);

OfferCard.Grid = Grid;
OfferCard.Image = Image;
OfferCard.Title = Title;

export default OfferCard;
