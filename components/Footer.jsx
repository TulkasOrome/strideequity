/* eslint-disable max-len */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Logo from './Logo';
import ShareButton from './social/ShareButton';
import Icons from './icons';
import IconButton from './IconButton';

const Footer = ({ minimal, state, style }) => (
  <footer style={style}>
    {minimal ? (
      <Container>
        <Row>
          <Col lg={{ span: 8, offset: 2 }} className="small text-center">
            <p>StrideCorp Equity Partners Pty Ltd (ABN 49 607 216 928 AFSL 482668) </p>
            <p>Crowd-sourced funding is risky. Companies using the Stride Equity platform are new or rapidly growing businesses. Investment in these types of businesses is speculative and is risky. You may lose your entire investment, and you should be in a position to bear this risk without undue hardship. Even if the company is successful, the value of your investment and any return on the investment could be reduced if the company issues more shares. Your investment is unlikely to be liquid which means you are unlikely to be able to sell your shares quickly or at all. Even though you have remedies for misleading statements in the offer document or misconduct by the company, you may have difficulty recovering your money.</p>
            <p>StrideCorp Equity Partners Pty Ltd (Stride Equity) does not provide any financial, investment, legal or tax advice or recommendations to potential investors wishing to use the Stride Equity platform. Stride Equity does not recommend or endorse any company which makes an offer through the Stride Equity platform. You must read all information given carefully. You should make your own assessments of any investment opportunity on the Stride Equity platform, and should seek independent advice before committing to any investment.</p>
          </Col>
        </Row>
        &copy; StrideEquity 2021
      </Container>
    ) : (
      <Container className="text-center text-lg-left">
        
        <Row className="airy">
          <Col lg={{ span: 3 }}>
            <Nav className="flex-column">
              <Link href="/invest"><Nav.Link href="/invest">Invest</Nav.Link></Link>
              <Link href="/raise"><Nav.Link href="/raise">Raise</Nav.Link></Link>
              <Link href="/contact"><Nav.Link href="/contact">Contact</Nav.Link></Link>
              <Link href="/team"><Nav.Link href="/team">Our Team</Nav.Link></Link>
            </Nav>
          </Col>
          <Col lg={3}> 
            <Nav className="flex-column">
              <Link href="/crowdfunding"><Nav.Link href="/crowdfunding">Equity Crowdfunding</Nav.Link></Link>
              <Link href="/before"><Nav.Link href="/before">Before you invest</Nav.Link></Link>
              <Link href="/why"><Nav.Link href="/why">Why StrideEquity?</Nav.Link></Link>
              <Link href="/fees"><Nav.Link href="/fees">Fees and costs</Nav.Link></Link>
            </Nav>
          </Col>
          <Col md={3} lg={3}>
            <Nav className="flex-column">
              <Link href="/guide"><Nav.Link href="/guide">Financial Services Guide</Nav.Link></Link>
              <Link href="/terms"><Nav.Link href="/terms">Terms &amp; Conditions</Nav.Link></Link>
              <Link href="/privacy"><Nav.Link href="/privacy">Privacy</Nav.Link></Link>
            </Nav>
          </Col>
          <Col md={3} lg={3}>
            <Logo className="logo" width={150} height={80} color="#000" />
            <br />
            Find us on <IconButton variant="link" href="https://twitter.com/strideequity" icon="twitter"></IconButton>
            <IconButton variant="link" href="https://twitter.com/strideequity" icon="linkedin"></IconButton>
          </Col>
        </Row>
        <Row className="airy text-center">
          <Col md={{ span: 8, offset: 2 }} className="small">
            <p>StrideCorp Equity Partners Pty Ltd (ABN 49 607 216 928 AFSL 482668) </p>
            <p>Crowd-sourced funding is risky.Companies using the Stride Equity platform are new or rapidly growing businesses. Investment in these types of businesses is speculative and is risky. You may lose your entire investment, and you should be in a position to bear this risk without undue hardship. Even if the company is successful, the value of your investment and any return on the investment could be reduced if the company issues more shares. Your investment is unlikely to be liquid which means you are unlikely to be able to sell your shares quickly or at all. Even though you have remedies for misleading statements in the offer document or misconduct by the company, you may have difficulty recovering your money.</p>
            <p>StrideCorp Equity Partners Pty Ltd (Stride Equity) does not provide any financial, investment, legal or tax advice or recommendations to potential investors wishing to use the Stride Equity platform. Stride Equity does not recommend or endorse any company which makes an offer through the Stride Equity platform. You must read all information given carefully. You should make your own assessments of any investment opportunity on the Stride Equity platform, and should seek independent advice before committing to any investment.</p>
          </Col>
        </Row>
      </Container>
    )}
  </footer>
);

export default Footer;
