import React, { useState } from 'react';
import {
  Row, Col, Card, Form, Button,
} from 'react-bootstrap';
import IconButton from '../IconButton';
import OfferCard from '../offers/OfferCard';
import UserAvatar from '../users/UserAvatar';
import formatAmountForDisplay from '../../utils/currency';

const getRangeLabel = (val) => ranges.reduce(
  (a, r) => (Number(val) === Number(r.value) ? r.label : a), ranges[0].label,
);

const List = ({ interests, small }) => {
  const [list, setList] = useState(interests);
  const remove = (id) => setList(list.filter((interest) => interest.id !== id));
  return (
    <div>
      {list.map((int) => (!small  
        ? <Interest key={int.id} interest={int} onDelete={(id) => remove(id)} />
        : <InterestSmall interest={int} />))}
    </div>
  ); 
};

const InterestSmall = ({ interest }) => (
  <Row>
    <Col>
      <UserAvatar user={interest.User} /> {interest.User.name} {interest.User.email}
    </Col>
    <Col>
      {getRangeLabel(interest.range)}
    </Col>
  </Row>
);

const ranges = [
  { label: 'from $3,000 to $6,000', value: 3000 },
  { label: 'from $6,000 to $10,000', value: 6000 },
  { label: 'from $10,000 to $20,000', value: 10000 },
  { label: 'from $20,000 to $50,000', value: 20000 },
  { label: 'from $50,000 to $100,000', value: 50000 },
  { label: 'from $100,000 to $200,000', value: 100000 },
  { label: 'more then $200,000', value: 200000 },
];

const Interest = ({ interest, onDelete }) => {
  const [range, setRange] = useState(interest?.range);
  const [mode, setMode] = useState();
  const [intData, setIntData] = useState(interest);
  const save = async () => {
    await fetch('/api/offer/interest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ OfferId: interest.Offer.id, range }),
    });
    setIntData({ ...intData, ...{ range } });
    setMode(false);
  };

  const remove = async () => {
    await fetch('/api/offer/interest', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: interest.id }),
    });
    onDelete(interest.id);
  };

  return (
    <Card key={interest.id} style={{ marginBottom: '15px' }} className="text-left">
      <Card.Body>
        <Row>
          <Col sm={5}>
            <OfferCard.Image offer={interest.Offer} title />
          </Col>
          <Col>
            {interest.Offer.pitch}
            <hr />
            I am considering to invest :<br />
            { mode === 'edit' ? (
              <><Form.Control 
                style={{display:'inline', width:'200px'}}
                as="select"
                onChange={(e) => setRange(e.target.value)}
                value={range}
              >
                {Interest.ranges.map((r) => (
                  <option 
                    key={r.value}
                    value={r.value}
                  >{r.label}
                  </option>
                ))}
              </Form.Control>
              { range !== intData.range  ? (<Button onClick={() => save()} variant="outline-secondary">Update</Button>) : null }
              </>
            ) : (<>
              <b>{getRangeLabel(range)}</b>
              <br />
              { interest.Offer.status === 'preview' ? (
                <>
                  <IconButton onClick={() => setMode('edit')} variant="outline-secondary">Change</IconButton>
                </>
              ) : (
                <IconButton icon="check" href={'/offer/'+ interest.Offer.slug }>Complete investment</IconButton>
              )}
            </>)}
            <br />
            
            
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

Interest.List = List;
Interest.getRangeLabel = getRangeLabel;
Interest.ranges = ranges;
export default Interest;
