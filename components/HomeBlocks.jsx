import React from 'react';
import {
  Button, Col, Row, 
} from 'react-bootstrap';


const truncate = (str, num) => {
  if (str.length > num) {
    return `${str.slice(0, num)}...`;
  } 
  return str;
};


const HomeBlocks = ({data}) => (
  <div>
    <Row className="airy">
    { data.pages.map((p) => (
      <Col key={p.id} xs={4}>
        <h4>{p.name}</h4>
        <p>{truncate(p.description, 200)}</p>
        <p className="text-right">
        <Button href={'/'+ p.slug } variant="link">Read More</Button>
        </p>
      </Col>
    ))}
    </Row>
  </div>
);

export default HomeBlocks;
