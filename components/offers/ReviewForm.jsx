import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  Button, Form, Card, Row, Col,
} from 'react-bootstrap';
import Api from '../../utils/apiCall';
import IconButton from '../IconButton';
import Icons from '../icons';
import User from '../users/User';
import UserAvatar from '../users/UserAvatar';

const statusList = ['submitted', 'draft', 'preview', 'active', 'finished', 'rejected'];

const ReviewForm = ({ offer, update }) => {
  const [status, setStatus] = useState(offer.status);
  const [name, setName] = useState(offer.companyName);
  const router = useRouter();

  const saveStatus = async (status) => {
    await Api.call('offer', 'POST', { ...{ status }, ...{ id: offer.id } });
    router.reload();
  };

  const statusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <Card>
      <Card.Body>
        <h2>{offer.companyName}</h2>
        <p className="lead"><User user={offer.User} /> {offer.User.email}</p>
        <p className="lead">{offer.pitch}</p>
        <p>Raise : {offer.raiseRange}</p>
        <p>Phone :{offer.phone}</p>
        
        <p>Information Links :<br />{offer.informationLinks}</p>
        <p>Files :
          {offer.informationFiles?.map((f) => (
            <div key={f}>
              <a target="_blank" href={f} rel="noreferrer">
                <Icons.File size={16} /> {f.split('/').pop()}
              </a>
            </div>
          ))}
        </p>
        <IconButton icon="check" size="lg" onClick={() => saveStatus('draft')}>Accept this submission</IconButton>&nbsp;
        <IconButton icon="cancel" size="lg" variant="outline-danger" onClick={() => saveStatus('rejected')}>Reject this submission</IconButton>
      </Card.Body>
    </Card>
  ); 
};

export default ReviewForm;
