import React from 'react';
import {
  Alert, Col, Container, Row, 
} from 'react-bootstrap';
import usersController from '../../../../lib/users/usersController';
 
import ServerProps from '../../../../lib/serverProps';
import DashBoardLayout from '../../../../components/DashBoardLayout';
import serializable from '../../../../lib/serializable';
import EditUserForm from '../../../../components/users/EditUserForm';
import AvatarField from '../../../../components/users/AvatarField';
import User from '../../../../components/users/User';
import Icons from '../../../../components/icons';
import offersController from '../../../../lib/offers/offersController';
import Payment from '../../../../components/payments/Payment';
//

const EditUserPage = ({ state, userData, data }) => {
  ///
  console.log('userData', userData);
  const { user } = state;
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      <h1>{userData.name} <User.Badges user={userData} /></h1>
      <Row>
        <Col md="8">
          <EditUserForm user={userData} state={state} />
        </Col>
        <Col md="4">
          <AvatarField user={userData} state={state} />
        </Col>
      </Row>
      { data.wholesale ? (
        <Alert variant={userData.verifiedWholesale ? 'success' : 'primary'}>
          <p>Wholesale Verification submitted</p>
          {data.wholesale.documentation.split('\n').map(
            (f) => (
              <div key={f}>
                <a target="_blank" href={f} rel="noreferrer">
                  <Icons.File size={16} /> {f.split('/').pop()}
                </a>
              </div>
            ),
          ) }
        </Alert>
      ) : null}
      { data.payments?.length ? (
        <div>
          <h4>My Payments</h4>
          <Payment.Table payments={data.payments} state={state} admin />
        </div>
      ) : null }
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
   
  const userData = await usersController.getUserData(query.id);
  const data = { 
    wholesale: await usersController.getWholesaleVerification(query.id),
    payments: await offersController.getPayments({ where: { UserId: query.id } }),
  };
  return {
    props: {
      state: await ServerProps.getState(req),
      userData: serializable(userData),
      data: serializable(data),
    },
  };
}

export default EditUserPage;
