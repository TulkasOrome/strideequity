import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container, Row, Col, Card, Alert,
} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import Error from './Error';
import Gtag from '../lib/gtag';
import LoginModal from './auth/LoginModal';
import Header from './Header';
import Icons from './icons';
import Access from '../utils/access';

const DashBoardLayout = ({
  children, state, title = 'StrideEquity | dashboard', meta = {}, admin = false,
}) => {
  useEffect(() => {
    setTimeout(() => Gtag.pageview(), 1000);
  }, []);
  if (!state.user.id) {
    return <Error statusCode={401} />;
  }
  if (admin && (state.user?.role !== 'admin')) {
    return <Error statusCode={403} />;
  }

  if (state?.gtag) Gtag.init(state.gtag);
  const router = useRouter();
  return (
    <div id="main">
      <Header state={state} meta={meta} title={title} />
      <Container style={{ paddingTop: '150px', paddingBottom: '150px' }}>
        <Row>
          <Col xl={2} lg={3} md={4}>
            <Nav activeKey={router.pathname} className="flex-column dashboard-nav">
              <Link href="/dashboard">
                <Nav.Link href="/dashboard">
                  <Icons.Dash size={18} /> Dashboard
                </Nav.Link>
              </Link>
              <Link href="/dashboard/account">
                <Nav.Link href="/dashboard/account">
                  <Icons.User size={18} /> My Account
                </Nav.Link>
              </Link>

            </Nav>
            {Access.can('manage', state.user ) ? (
              <Alert variant="secondary">
                <Icons.Admin />
              <Nav activeKey={router.pathname} className="flex-column">
                <Link href="/dashboard/users">
                  <Nav.Link href="/dashboard/users">
                    Members
                  </Nav.Link>
                </Link>
                <Link href="/dashboard/offers">
                  <Nav.Link href="/dashboard/offers">
                    Offers
                  </Nav.Link>
                </Link>
                <Link href="/dashboard/payments">
                  <Nav.Link href="/dashboard/payments">
                    Payments
                  </Nav.Link>
                </Link>
                <Link href="/dashboard/pages">
                  <Nav.Link href="/dashboard/pages">
                    Pages
                  </Nav.Link>
                </Link>
                <Link href="/dashboard/posts">
                  <Nav.Link href="/dashboard/posts">
                    Articles
                  </Nav.Link>
                </Link>
              </Nav>
              </Alert>
            ) : null}
          </Col>
          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  ); 
};

export default DashBoardLayout;
