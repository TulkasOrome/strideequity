import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Container, Navbar } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import AuthLinks from './auth/AuthLinks';
import Logo from './Logo';
import Footer from './Footer';
import Icons from './icons';
import Gtag from '../lib/gtag';
import LoginModal from './auth/LoginModal';

const Header = ({
  meta, 
  title = 'StrideEquity | Venture Capital investing for everyone', 
  state = { user: {} }, 
  invertNav = false,
  style,
  noAuth,
}) => {
  const router = useRouter();
  const { user } = state;
  if (state?.gtag) Gtag.init(state.gtag);

  useEffect(() => {
    setTimeout(() => Gtag.pageview(), 1000);
    setScrolled(document.documentElement.scrollTop > 10);
    window.addEventListener('scroll', (e) => {
      setScrolled(document.documentElement.scrollTop > 10);
    });
  }, []);
  
  const [scrolled, setScrolled] = useState(false);

  return (
    <div id="header" style={style}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta name="twitter:card" content={meta?.card || 'summary'} />
        <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png" />
        <link rel="manifest" href="/static/site.webmanifest" />
        <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <meta property="og:image" content={meta?.img || `${state.siteUrl}/static/twitter-default.png`} /> 
        <meta property="twitter:image" content={meta?.img || `${state.siteUrl}/static/twitter-default.png`} /> 
        {meta?.url ? <meta property="og:url" /> : null }
        {meta?.description ? <meta property="og:description" content={meta?.description} /> : null }
        {meta?.description ? <meta property="twitter:description" content={meta?.description} /> : null }
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${state.gtag}`} />
      </Head>
      <header className={scrolled ? 'scrolled' : ''}>
        <Navbar className={invertNav ? 'inverted' : 'regular'} expand="lg" fixed="top">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" >
              <Icons.Menu size={28} />
            </Navbar.Toggle>
            <Link href="/"><Navbar.Brand href="/"><Logo className="logo" color={scrolled || !invertNav ? '#000' : '#fff'} /></Navbar.Brand></Link>
            <Navbar.Collapse id="primary-nav">
              <Nav activeKey={router.pathname} className="mr-auto">
                <Link href="/invest">
                  <Nav.Link href="/invest">
                    Invest
                  </Nav.Link>
                </Link>
                <Link href="/raise">
                  <Nav.Link href="/raise">
                    Raise
                  </Nav.Link>
                </Link>
                <Link href="/about">
                  <Nav.Link href="/about">
                    About
                  </Nav.Link>
                </Link>
                <Link href="/news">
                  <Nav.Link href="/news">
                    News
                  </Nav.Link>
                </Link>
                <Link href="/contact">
                  <Nav.Link href="/contact">
                    Contact
                  </Nav.Link>
                </Link>
              </Nav>
            </Navbar.Collapse>
            { !noAuth ? (
              <Nav id="authlinks">
                <AuthLinks user={user} inverted={invertNav && !scrolled} />
              </Nav>
            ) : null }
          </Container>
        </Navbar>
      </header>
    </div>
  ); 
};

export default Header;
