import React from 'react';
import {Button, Container, Row, Col, Alert} from 'react-bootstrap';
 
import ServerProps from '../../lib/serverProps';
import DashBoardLayout from '../../components/DashBoardLayout';
import OffersController from '../../lib/offers/offersController';
import serializable from '../../lib/serializable';
import OffersTable from '../../components/offers/OffersTable';
import UsersController from '../../lib/users/usersController';
import Payment from '../../components/payments/Payment';
import Interest from '../../components/interests/Interest';
import Offer from '../../components/offers/Offer';
import Access from '../../utils/access';
import User from '../../components/users/User';
import Icons from '../../components/icons';
import Status from '../../components/Status';
import WholesaleVerify from '../../components/users/WholesaleVerify';
import OfferQuestion from '../../components/offers/OfferQuestion';

const DashboardPage = ({ state, data }) => (
  <DashBoardLayout 
    title="StrideEquity | Dashboard" 
    state={state} 
    hidefooter={1}
  >
    <Container>
    <h2>Hi <User user={state.user} /> <User.Badges user={state.user} /></h2>
      {
        Access.can('manage', state.user) ? (
          <div>
            <Icons.Admin size={33} />
            { data.payments?.length ? (
            <div>
              <h4>Payments to review</h4>
              <Payment.Table payments={data.payments} state={state} admin />
            </div>
          ) : null }
            { data.offersToReview?.length ? (
              <div>
                <h4>New offer submissions to review  </h4>
                <Offer.Table offers={data.offersToReview} state={state} admin />
              </div>
            ) : null }
            { data.wholesaleVerifications?.length ? (
              <div>
                <h4>New wholesaleVerifications to review  </h4>
                <WholesaleVerify.List verifications={data.wholesaleVerifications} />
              </div>
            ) : null }
            { data.questions?.length ? (
              <div>
                <h4>Offer Questions</h4>
                <OfferQuestion.List questions={data.questions} />
              </div>
            ) : null }
          </div>
        ) : null }
        <div>
          { data.myPayments?.length ? (
            <div>
              <h4>My Latest investments</h4>
              <Payment.Table payments={data.myPayments} state={state} />
            </div>
          ) : null }
          { data.myOffers?.length ? (
            <div>
              <h4>My submitted offers</h4>
              <Offer.Table offers={data.myOffers} state={state} />
            </div>
          ) : null }
          { data.interests?.length ? (
            <div>
              <h4>My Expressions of interest</h4>
              <Interest.List interests={data.interests} state={state} />
            </div>
          ) : null }

        </div>
    </Container>
  </DashBoardLayout>
);

export async function getServerSideProps({ req, res }) {
   
  const state = await ServerProps.getState(req);
  const data = {};
  if (Access.can('manage', state.user)) {
    data.offersToReview = await OffersController.find({ status: 'submitted' });
    data.wholesaleVerifications = await UsersController.getWholesaleVerifications({ status: 'pending' });
    data.payments = await OffersController.getPayments({where: {status: 'pending'}})
    data.questions = await OffersController.getQuestions({where: {answer: null}})
  } 
  if (state.user?.id) {
    data.myOffers = await OffersController.find({ UserId: state.user.id });
    data.interests = await UsersController.getInterests(state.user.id);
    data.myPayments = await OffersController.getPayments({ 
      where: { UserId: state.user.id },
    });
    
  }
  return {
    props: {
      state,
      data: serializable(data),
    },
  };
}

export default DashboardPage;
