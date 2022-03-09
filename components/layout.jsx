import React, { useEffect, useState } from 'react';
import BlockUi from 'react-block-ui';
import Global from '../utils/globalEvents';
import Footer from './Footer';
import Gtag from '../lib/gtag';
import LoginModal from './auth/LoginModal';
import Header from './Header';
import Toasts from './Toasts';

const Layout = ({
  children, 
  meta, 
  title = 'StrideEquity | Venture Capital investing for everyone', 
  hidefooter, 
  state = { user: {} }, 
  invertNav = false,
}) => {
  if (state?.gtag) Gtag.init(state.gtag);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(Global.blockedLoading);
  const onEditMode = (e) => {
    setEditMode(e.detail);
    e.stopPropagation();
  };

  useEffect(() => {
    setTimeout(() => Gtag.pageview(), 1000);
    Global.on('loading', (e) => setLoading(e.detail));
    Global.on('editmodeHide', onEditMode);
    return () => Global.remove('editmodeHide', onEditMode);
  }, []);
 
  const disabledStyle = editMode ? { opacity: 0.1, pointerEvents: 'none' } : {};

  return (
    <div id="main">
      <BlockUi tag="div" blocking={loading}>
        <Header
          style={disabledStyle} 
          state={state}
          meta={meta} 
          title={title}
          invertNav={invertNav}
        />
        {children}
        <Footer style={disabledStyle} minimal={hidefooter} state={state} />
      </BlockUi>
      <Toasts />
      <LoginModal />
    </div>
  ); 
};

export default Layout;
