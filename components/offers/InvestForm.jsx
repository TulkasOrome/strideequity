import React, { useState } from 'react';
import { 
  Form, Button, Badge, Alert, Card, Row, Col,
} from 'react-bootstrap';
import Link from 'next/link';
import Api from '../../utils/apiCall';
import formatAmountForDisplay from '../../utils/currency';
import Icons from '../icons';
import BankAccount from '../users/BankAccount';
import BankAccountForm from '../users/BankAccountForm';

const InvestForm = ({ offer, state, data }) => {
  const [mode, setMode] = useState('form');
  const [payment, setPayment] = useState(); 
  const min = Math.round(offer.minInvestment / offer.sharePrice);
  const totalPayments = data.payments.reduce((t,p) => p.status !== 'canceled' ? t + p.amount : t, 0);
  const [shares, setShares] = useState(min);
  const [accounts, setAccounts] = useState(data.accounts);
  const [account, setAccount] = useState();
  const [verified, setVerified] = useState(state.user.verifiedId);
  const max = state.user.verifiedWholesale ? offer.target : 10000 - totalPayments ;

  const selectAccount = async () => {
    setMode('bank');
  };

  const confirmPayment = async () => {
    const pay = await Api.post('offer/payment', { OfferId: offer.id, shares, BankAccountId: account.id });
    if (pay.id) {
      setPayment(pay);
      setMode('transfer');
    };
  };

  const verifyIdentity = async () => {
    const verif = await Api.post('user/verify', { id: state.user.id, verifiedId: true });
    setVerified(true);
  }

  if (max <= offer.minInvestment) return (
    <div style={{maxWidth:'450px', margin:'10px auto'}}>
    <Alert variant="primary">
      Your maximum investment amount for this offer has been reached. 
    </Alert>
    <p>By becoming a verified wholesale investor you can remove this limit.</p>
    <Link href="/wholesale" passHref>
      <Button block size="lg" variant="success">
      <Icons.Award /> Become wholesale investor
      </Button>
    </Link>
    </div>
  );
  if (!verified) return (
    <div style={{maxWidth:'450px', margin:'10px auto'}}>
    <Alert variant="primary">
      You need to verify your identity to continue. 
    </Alert>
    <p>StrideEquity uses Identity Verification in order to comply with KYC (Know Your Customer) regulations. KYC is a way of identifying and confirming that a customer is who they say they are. It’s a multi-step process that helps to prevent the creation and use of fraudulent accounts.</p> 
      <Button onClick={() => verifyIdentity()} block size="lg" variant="success">
      <Icons.Award /> Verify my identity
      </Button>
    </div>
  );
  if (mode === 'form') {
    return (
      <Form className="text-center" style={{maxWidth:'350px', margin:'0 auto'}}>
        <h2>Invest in {offer.companyName}</h2>
        <p className="lead">Select a number of shares</p>
        <Form.Control
          min={min}
          max={max}
          step={Math.round(1000 / offer.sharePrice)}
          type="number"
          onChange={(e) => setShares(e.target.value)}
          value={shares}
          style={{ display: 'inline', width: '200px' }}
        />&nbsp;&nbsp;X&nbsp;{formatAmountForDisplay(offer.sharePrice)} <Badge variant="info">share price</Badge><br />
        { !state.user.verifiedWholesale ? (
          <Alert>You can invest a maximum of {formatAmountForDisplay(max)}</Alert>
        ) : null}
        <Alert className="airy" variant="success">Total {shares} shares = {formatAmountForDisplay(shares * offer.sharePrice)}</Alert>
        <Button variant="outline-primary" block size="lg" onClick={() => selectAccount()}>Continue</Button>
        
        <p className="airy">Payments are only confirmed after successfull transfer of funds&nbsp;
          to our bank account&nbsp;
        </p>  
      </Form>
    );  
  }

  if (mode === 'bank') {
    return (
      <div>
        { accounts.length ? (
          <div>
            <h3>Select your bank account</h3>
            <BankAccount.Panel 
              select
              state={state} 
              accounts={accounts}
              onSelect={(acc) => setAccount(acc)}
            />
            { account ? (
              <Button className="airy" variant="outline-primary" block size="lg" onClick={() => confirmPayment()}>
                Finalize and see transfer instructions
              </Button>
            ) : null}

          </div>
        ) : (
          <div>
            <h3>Save a new bank account</h3>
            <BankAccount.Form
              accounts={accounts} 
              state={state}
              onSubmit={(account) => setAccounts([...accounts, account])}
            />
          </div>
        )}
      </div>
    );  
  }

  if (mode === 'transfer') {
    return (
      <div>
        <Card>
          <Card.Body>
            <h2>Bank transfer Instructions</h2>
            <Alert variant="warning">
              To complete your invetment please transfer&nbsp;
              {formatAmountForDisplay(shares * offer.sharePrice)}&nbsp;
              to the account below within 7 days.
            </Alert>

            name: STRIDEEQUITY<br />
            bank: STR Bank<br />
            bsb: 22-22-22<br />
            bank-reference number: ABC123<br />
            reference: <Badge variant="dark">{payment.key}</Badge>
          </Card.Body>
        </Card>
        <p className="airy">Payments are only confirmed after successfull transfer of funds&nbsp;
          to our bank account&nbsp;
        </p>  
        <Row>
        <Col><Button size="lg" variant="outline-info" block href={`/offer/${offer.slug}`}><small>Back to</small> {offer.companyName} offer</Button></Col>
        <Col><Button size="lg" variant="outline-success" block href="/dashboard"><Icons.Dash /> Dashboard</Button></Col>
      </Row>
      </div>
    );  
  }

  return null;
};

export default InvestForm;
