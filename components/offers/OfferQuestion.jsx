import React, { useState } from 'react';
import moment from 'moment';
import {
  Form, Button, Card, Alert, Row, Col,
} from 'react-bootstrap';
import Api from '../../utils/apiCall';
import UserAvatar from '../users/UserAvatar';
import Icons from '../icons';

const OfferQuestion = ({ question, canAnswer = false, state }) => {
  const [qData, setQData] = useState(question);
  const [answered, setAnswered] = useState(!!question.answer);
  const submitAnswer = async () => {
    await Api.call('offer/question', 'POST', { ...qData });
    setQData({ ...qData, updatedAt: new Date() });
    setAnswered(true);
  };

  return (
    <Card style={{ marginBottom: '15px', maxWidth: '550px' }}>
      <Card.Body>
        created {moment(qData.createdAt).fromNow()}&nbsp;
        by <UserAvatar user={qData.User} /> {qData.User.name} on 
        <a href={'/dashboard/offers/' + qData.OfferId + '/questions'}>{qData.Offer.companyName}</a>
        <p className="lead">{qData.question}</p>
        { canAnswer && !answered ? (
          <Form>
            <Form.Label>Answer:</Form.Label>
            <Form.Control
              as="textarea"
              value={qData.answer}
              onChange={(e) => setQData({ ...qData, answer: e.target.value })}
            />
            <p className="text-right">
              <Button variant="outline-info" onClick={() => submitAnswer()}>Submit Answer</Button>
            </p>
          </Form>
        ) : null }
        { answered ? (
          <Alert variant="success">
            <b><Icons.Check size={16} />Answered {moment(qData.updatedAt).fromNow()}: </b> 
            <p>{qData.answer}</p>
          </Alert>
        ) : null }
      </Card.Body>
    </Card>
  ); 
};

const list = ({ questions, canAnswer }) => {
  const [qs, setQs] = useState(questions);
  return (qs.map((q) => <OfferQuestion canAnswer={canAnswer} key={q.id} question={q} />));
};

const QuestionForm = ({ offer, state }) => {
  const [question, setQuestion] = useState();
  const [submitted, setSubmitted] = useState();
  const submitQuestion = async () => {
    const sub = await Api.call('offer/question', 'POST', { question, OfferId: offer.id });
    sub.User = state.user;
    setSubmitted(sub);
  };

  return !submitted?.id ? (
    <Form>
      <h2>{offer.companyName} Communication facility</h2>
      <Card>
        <Card.Body>
          <h3><Icons.Chat /> Ask a question to the {offer.companyName} team?</h3>
          <small>* required 20 chars min</small>
          <Form.Control
            style={{height: '250px'}}
            as="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          
          <div className="text-right airy">
            <Button disabled={question?.length < 20} variant="outline-info" onClick={() => submitQuestion()}>Send</Button>
          </div>
        </Card.Body>
      </Card>
      
      <p className="airy">The team will be notified by email. Expect a answer in the coming days&nbsp;</p> 

    </Form>
  ) : (
    <div>
      <h3>Thank you. Your question has been submitted to {offer.companyName} team</h3>
      <OfferQuestion question={submitted} />
      <p className="airy">You will be notified by email when a team member has replied. Expect a answer in the coming days&nbsp;</p> 
      <Row>
        <Col><Button size="lg" variant="outline-info" block href={`/offer/${offer.slug}`}><small>Back to</small> {offer.companyName} offer</Button></Col>
        <Col><Button size="lg" variant="outline-success" block href="/dashboard"><Icons.Dash /> Dashboard</Button></Col>
      </Row>
    </div>
  );
};

OfferQuestion.Form = QuestionForm;
OfferQuestion.List = list;
export default OfferQuestion;
