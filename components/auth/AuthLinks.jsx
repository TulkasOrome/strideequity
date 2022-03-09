import React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';
import Link from 'next/link';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import OAuthLoginButton from './OAuthLoginButton';
import LoginModal from './LoginModal';
import Icons from '../icons';
import UserAvatar from '../users/UserAvatar';
import User from '../users/User';


const AuthLinks = ({ user, inverted = false }) => {

  return (

    <>
      { !user.id ? (
        <Nav className="auth-links">
          <Nav.Link onClick={() => LoginModal.show()}>Login</Nav.Link>
          <Nav.Link onClick={() => LoginModal.register()}>Register</Nav.Link>
        </Nav >
      ) 
        : (
          <DropdownButton 
            variant="link"
            menuAlign="right"
            title={(
              <span className="authDropdownLabel">
                <UserAvatar user={user} /> &nbsp;
                <span>{user?.name || user?.username}</span>
              </span>
        )}
          >
            <Link href="/dashboard/account" passHref>
              <Dropdown.Item href="/dashboard/account">
                Account 
                <User.Badges user={user} />
              </Dropdown.Item>
            </Link>
            <Link href="/dashboard" passHref>
              <Dropdown.Item href="/dashboard">
                Dashboard
              </Dropdown.Item>
            </Link>
            <Dropdown.Item onClick={()=>signOut()}>
              <Icons.SignOut size={14} /> Sign out
            </Dropdown.Item>
          </DropdownButton>
        )}
    </>
  )
};

export default AuthLinks;
