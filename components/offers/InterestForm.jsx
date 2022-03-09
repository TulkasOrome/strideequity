import React, { useState } from 'react';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import Api from '../../utils/apiCall';
import Icons from '../icons';
import Interest from '../interests/Interest';

const InterestForm = ({ offer, data, state }) => {
  const [interest, setInterest] = useState(data.interest || { range: Interest.ranges[0].value });

  const expressInterest = async () => {
    const int = await Api.call('offer/interest', 'POST', { ...interest, OfferId: offer.id });
    setInterest({
      ...interest, OfferId: offer.id, Offer: offer, id: int.id, 
    });
  };

  return !interest?.id ? (
    <Form style={{ maxWidth: '450px', margin: '0 auto' }}>
      <h3 className="airy">How much are you considereing to invest?</h3>
      <Form.Control 
        size="lg"
        as="select"
        onChange={(e) => setInterest({ ...interest, range: e.target.value })}
        value={interest.range}
      >
        {Interest.ranges.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
      </Form.Control>
      <p className="airy">This offer will be saved to your <a href="/dashboard">dashboard</a>.&nbsp;
        You will be notified by email when this offer becomes active and you can invest
      </p>
      <Form.Group>
        <Form.Check
          label="I confirm my interest in this offer."
          id="confirm"
          onChange={(e) => console.log(e)}
        />
      </Form.Group>
      <Button variant="outline-primary" block onClick={() => expressInterest()}>Register my interest in {offer.companyName}&apos;s offer</Button>
      <p className="airy">
        Your name, email and interest range will be visible to {offer.companyName} &nbsp;
        and by registering your interest in this offer you allow them to send you further &nbsp;
        information about this offer.
      </p>  
    </Form>
  ) : (
    <div className="text-center">
      <h3>You confirmed your interest for {offer.companyName}</h3>
      <Interest interest={interest} state={state} onDelete={() => null} />
      <p>We will notify you regarding this offer</p>
      <p>You can alway find the offers you registered your&nbsp;
        interest for in your <a href="/dashboard">dashboard</a>
      </p>
      <Row>
        <Col><Button size="lg" variant="outline-info" block href={`/offer/${offer.slug}`}><small>Back to</small> {offer.companyName} offer</Button></Col>
        <Col><Button size="lg" variant="outline-success" block href="/dashboard"><Icons.Dash /> Dashboard</Button></Col>
      </Row>
    </div>
  );
};

export default InterestForm;
