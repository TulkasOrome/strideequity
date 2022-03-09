import React from 'react';
import {
  Card, Col, Row, Alert, 
} from 'react-bootstrap';
import { getSession } from "next-auth/react";
import usersController from '../../../lib/users/usersController';
 
import ServerProps from '../../../lib/serverProps';
import DashBoardLayout from '../../../components/DashBoardLayout';
import serializable from '../../../lib/serializable';
import EditUserForm from '../../../components/users/EditUserForm';
import AvatarField from '../../../components/users/AvatarField';
import BankAccountForm from '../../../components/users/BankAccountForm';
import BankAccount from '../../../components/users/BankAccount';
import ChangePasswordForm from '../../../components/users/ChangePasswordForm';
import Icons from '../../../components/icons';
import offersController from '../../../lib/offers/offersController';

const UsersDashboardPage = ({ state, userData, data }) => {
  const { user } = state;
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      <h1>{userData.name}</h1>
      <Row>
        <Col md="8">

          <Card style={{ marginBottom: '15px' }}>
            <Card.Body>
              <h3>Personal Info </h3>
              <EditUserForm user={userData} state={state} />
            </Card.Body>
          </Card>
          
        </Col>
        <Col md="4">
          <AvatarField user={userData} /><br />
          { userData.verifiedWholesale ? (
            <Alert variant="success">
              <Icons.Award size={18} /> Verified Wholesale          
              {data.wholesale ? data.wholesale.documentation.split('\n').map(
                (f) => (
                  <div key={f}>
                    <a target="_blank" href={f} rel="noreferrer">
                      <Icons.File size={16} /> {f.split('/').pop()}
                    </a>
                  </div>
                ),
              ) : null }
            </Alert>
          ) : null }
          { userData.verifiedId ? <Alert variant="success"><Icons.Id size={18} /> Verified Identity</Alert> : null }
          { data.authAccounts.map((a)=>({
              google: <Alert variant="primary"><Icons.Google size={18} /> Google Account connected</Alert>,
              linkedin: <Alert variant="info"><Icons.Linkedin size={18} /> LinkedIn Account connected</Alert>,
              credentials: <Alert variant="secondary"><Icons.Id size={18} /> Credentials Account connected</Alert>,
            }[a.provider])
          )}
        </Col>
      </Row>
      <Row>
        <Col md="8">
          <Card style={{ marginBottom: '15px' }}>
            <Card.Body>
              { userData.hasPassword ? <h3>Enter Password</h3> : <h3>Change Password</h3> }
              <ChangePasswordForm user={userData} state={state} />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h3>Bank Accounts</h3>
              <BankAccount.Panel accounts={data.bankAccounts} state={state} />
            </Card.Body>
          </Card>
          
        </Col>
      </Row>
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ req, res }) {
  const state = await ServerProps.getState(req);
  const userData = await usersController.getUserData(state.user.id);
  const data = { 
    wholesale: await usersController.getWholesaleVerification(state.user.id),
    payments: await offersController.getPayments({ where: { UserId: state.user.id } }),
    bankAccounts: await usersController.getBankAccounts(state.user.id),
    authAccounts: await usersController.getUserAuthAccounts(state.user.id),
  };
  return {
    props: {
      state,
      userData: serializable(userData),
      data: serializable(data),
    },
  };
}

export default UsersDashboardPage;
