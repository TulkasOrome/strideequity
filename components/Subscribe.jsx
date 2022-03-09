import React, { useState } from 'react';
import {
  Button, Form, Col, Row, 
} from 'react-bootstrap';

const Subscribe = ({ user }) => {
  const [email, setEmail] = useState(user.email);

  return (
    <div className="text-center invert">
      <Row className="content airy">
        <Col md={{ span: 8, offset: 2 }}>
          <p className="lead airy">Join our growing community for the latest investment opportunities, &nbsp;
            news and discussions about making business in Australia
          </p>
          <Form>
            <Row className="airy">
              <Col xs={8}>
                <Form.Control type="email" />
              </Col>
              <Col xs={4}>
                <Button block>Join</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Subscribe;
