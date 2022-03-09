import React, { useEffect, useState } from 'react';
import {
  Button, Form, Modal, Row, Col,
} from 'react-bootstrap';

const EditPropertiesModal = ({
  offer, open, onClose, update, 
}) => {
  const [show, setShow] = useState(open);
  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };
  const [values, setValues] = useState({
    sharePrice: offer.sharePrice,
    minInvestment: offer.minInvestment,
    target: offer.target,
  });

  useEffect(() => {
    setShow(open);
  }, [open]);

  const change = (name, val) => {
    setValues({ ...values, ...{ [name]: val } });
  };

  const saveProperties = async () => {
    const res = await fetch('/api/offer/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, ...{ id: offer.id } }),
    });
    update(values);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Share Price</Form.Label>
              <Form.Control
                required
                name="sharePrice"
                type="number"
                value={values.sharePrice}
                onChange={(e) => change('sharePrice', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Minimum Investment</Form.Label>
              <Form.Control
                required
                name="minInvestment"
                type="number"
                onChange={(e) => change('minInvestment', e.target.value)}
                value={values.minInvestment}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Raise target</Form.Label>
              <Form.Control
                required
                name="target"
                type="number"
                onChange={(e) => change('target', e.target.value)}
                value={values.target}
              />
            </Form.Group>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => saveProperties()}>Save Content</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPropertiesModal;
