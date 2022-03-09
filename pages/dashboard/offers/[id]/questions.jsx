import React from 'react';
import { Container } from 'react-bootstrap';
import offersController from '../../../../lib/offers/offersController';
 
import ServerProps from '../../../../lib/serverProps';
import DashBoardLayout from '../../../../components/DashBoardLayout';
import serializable from '../../../../lib/serializable';
import OfferDashboardHeader from '../../../../components/offers/OfferDashboardHeader';
import OfferQuestion from '../../../../components/offers/OfferQuestion';
//

const EditOfferPage = ({ state, offer, questions }) => {
  ///
  const { user } = state;
  return (
    <DashBoardLayout 
      title="StrideEquity | Dashboard" 
      state={state} 
    >
      <OfferDashboardHeader offer={offer} state={state} />
      <OfferQuestion.List questions={questions} canAnswer />
    </DashBoardLayout>
  );
};

export async function getServerSideProps({ query, req, res }) {
   
  const offer = await offersController.findById(query.id);
  const questions = await offersController.getQuestions({ where: { OfferId: offer.id } });
  return {
    props: {
      state: await ServerProps.getState(req),
      offer: serializable(offer),
      questions: serializable(questions),
    },
  };
}

export default EditOfferPage;
