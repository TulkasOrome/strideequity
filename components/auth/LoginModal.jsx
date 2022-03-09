import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Router from 'next/router';
import LoginButtons from './LoginButtons';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';

const LoginModal = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [screen, setScreen] = useState('login');
  const [redirect, setRedirect] = useState('/');

  LoginModal.hide = () => setShow(false);
  LoginModal.show = (redirectUrl) => {
    setScreen('login');
    setRedirect(redirectUrl || router.asPath);
    setShow(true);
  };
  LoginModal.register = (redirectUrl) => {
    setScreen('register');
    setRedirect(redirectUrl || router.asPath);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const complete = (user) => {
    console.log('oncomplete', user);
    if (redirect) {
      Router.push(redirect, undefined, { shalow: false });
    } else {
      Router.reload();
    }
    setShow(false);
  };
  return (
    <Modal id="login" show={show} onHide={handleClose} size="md" className="text-center">
      <Modal.Header closeButton />
      <Modal.Body>
        <div style={{ maxWidth: '350px', margin: '0 auto', paddingBottom: '30px' }}>
          <LoginButtons redirect={redirect} size="lg" />
        
          {screen === 'register' ? (
            <div>
              <p className="lead airy">If you are already registered,<br />please 
                <a href="#" onClick={(e) => setScreen('login') }> sign in</a>
              </p>
              <SignupForm complete={complete} />
            </div>
          ) : null }
          {screen === 'login' ? (
            <div>
              <p className="lead airy">If you don't have an account yet,<br />please 
                <a href="#" onClick={(e) => setScreen('register') }> sign up</a>
              </p>
              <LoginForm complete={complete} />
              <Button onClick={(e) => setScreen('resetPassword') } variant="link" block>I want to reset my password</Button>
            </div>
          ) : null}
          {screen === 'resetPassword' ? (
            <div>
              <p className="lead airy">Reset your password
              </p>
              <ResetPasswordForm complete={complete} />
            </div>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
