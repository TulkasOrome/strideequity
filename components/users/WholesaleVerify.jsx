
import { useRouter } from 'next/router';
import React from 'react';
import {Button, Container, Row, Col, Alert} from 'react-bootstrap';
import Api from '../../utils/apiCall';
import IconButton from '../IconButton';
import Icons from '../icons';
import Status from '../Status';
import User from './User';

const List = ({ verifications }) => verifications.map((verification)=> <WholesaleVerify key={verification.id} verification={verification} />)

const WholesaleVerify = ({verification}) => {
  const router = useRouter()
  const verify = async (flag) => {
    await Api.call('user/wholesale', 'POST', { id: verification.id, verify: flag});
    router.reload();
  }
  return (
  <Alert variant="danger" key={verification.id}>
    <Row>
      <Col>
      <User user={verification.User} admin /><Status status={verification.status} />
        {verification.documentation.split('\n').map(
        (f) => (
          <div key={f}>
            <a target="_blank" href={f} rel="noreferrer">
              <Icons.File size={16} /> {f.split('/').pop()}
            </a>
          </div>
        ),
        ) }
      </Col>
      <Col>
        <IconButton icon="check" onClick={() => verify(true)}>Verify</IconButton>&nbsp;
        <IconButton icon="cancel" variant="outline-danger" onClick={() => verify(false)}>Reject</IconButton>
      </Col>
    </Row>


  </Alert>
)}

WholesaleVerify.List = List;

export default WholesaleVerify;
