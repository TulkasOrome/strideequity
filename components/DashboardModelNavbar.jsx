import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  Form, Navbar,
} from 'react-bootstrap';
import IconButton from './IconButton';

const DashboardModelNavbar = ({ model, children, data }) => {
  const [s, setS] = useState(data?.s);
  const router = useRouter();
  const submitSearch = (e) => {
    e.stopPropagation();
    router.push(`?s=${s}`);
  };
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>{model}</Navbar.Brand>
      <div className="d-flex">
        <Form.Control 
          value={s}
          onChange={(e) => setS(e.target.value)} 
          onKeyPress={(e) => (e.charCode === 13 ? submitSearch(e) : null)} 
        /> 
        <IconButton onClick={submitSearch} icon="search">Search</IconButton>
      </div>&nbsp;
      {children}
    </Navbar>
  ); 
};

export default DashboardModelNavbar;
