import React from 'react';
import OAuthLoginButton from './OAuthLoginButton';

const LoginButtons = ({ redirect, size }) => (
  <div>
    <OAuthLoginButton size={size} provider="google" text="Sign in with Google" block redirect={redirect} outline />
    <OAuthLoginButton size={size} provider="linkedin" text="Sign in with LinkedIn" block redirect={redirect} outline />
  </div>
);

export default LoginButtons;
