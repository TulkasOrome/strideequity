import React, { useEffect, useState } from 'react';
import {
  Button, Form, Modal, Row, Col,
} from 'react-bootstrap';
import IconButton from '../IconButton';
import InterestForm from './InterestForm';
import InvestForm from './InvestForm';
import QuestionForm from './QuestionForm';

const OfferActionsModal = ({
  offer, open, onClose, action, data, state, 
}) => {
  const [show, setShow] = useState(action);
  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    setShow(action);
  }, [action]);

  const pay = async () => {
    const res = await fetch('/api/offer/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ OfferId: offer.id, amount: 5000 }),
    });
  };

  return (
    <Modal show={show !== false} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body className="text-center">
        { show === 'document' ? (
          <div>
            <h2>Download the offer document</h2>
            <IconButton icon="download">
              {offer.companyName} offer document pdf
            </IconButton>
          </div>
        ) : null }
        { show === 'interest' ? (
          <InterestForm offer={offer} interest={data.interest} />
        ) : null }
        { show === 'invest' ? (
          <InvestForm offer={offer} state={state} />
        ) : null }
        { show === 'question' ? (
          <QuestionForm offer={offer} />
        ) : null }
      </Modal.Body>
    </Modal>
  );
};

export default OfferActionsModal;
