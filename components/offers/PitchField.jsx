import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const PitchField = ({ offer, onClose, update }) => {
  const [pitch, setPitch] = useState(offer.pitch);

  const savePitch = async () => {
    const res = await fetch('/api/offer/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pitch, id: offer.id }),
    });
    update({ pitch });
  };

  return (
    <div>
      <Form.Control style={{ width: '300px', display: 'inline' }} type="textarea" value={pitch} onChange={(e) => setPitch(e.target.value)} />
      { pitch !== offer.pitch ? <Button variant="outline-primary" onClick={() => savePitch()}>Save</Button> : null }
    </div>
  );
};

export default PitchField;
