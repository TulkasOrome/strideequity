import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import EditContentField from '../EditContentField';

const EditContentModal = ({
  offer, open, onClose, update, 
}) => {
  const [show, setShow] = useState(open);
  const handleClose = () => {
    setShow(false);
    if (onClose) onClose();
  };
  const [content, setContent] = useState(offer.content);

  useEffect(() => {
    setShow(open);
  }, [open]);

  const saveContent = async () => {
    const res = await fetch('/api/offer/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, id: offer.id }),
    });
    update({ content });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" scrollable>
      <Modal.Header closeButton>
        <Modal.Title>Edit Content</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EditContentField offer={offer} update={((html) => setContent(html))} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => saveContent()}>Save Content</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditContentModal;
