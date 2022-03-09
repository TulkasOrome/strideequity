import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Alert, Col, Row } from 'react-bootstrap';
import BankAccountForm from './BankAccountForm';
import IconButton from '../IconButton';
import Api from '../../utils/apiCall';

const BankAccount = ({
  account, selected, state, onAction, admin, select,
}) => (
  <Alert
    variant={selected ? 'success' : 'secondary'} 
  >
    <Row>
      <Col>
        <b>{account.bank}</b><br />
        Account Holder: {account.accountHolder}
      </Col>
      <Col>
        Number: {account.number}<br />
        BSB: {account.sortCode}<br />
      </Col>
    </Row>
    <div className="text-right">
      { select ? (
        <IconButton
          icon="check"
          variant={selected ? 'outline-success' : 'outline-secondary'}
          onClick={() => (onAction ? onAction(account, 'select') : null)}
        >Select
        </IconButton>
      ) : null}
 &nbsp;
      { admin ? (
        <>
          <Button
            onClick={() => (onAction ? onAction(account, 'edit') : null)}
          >Edit
          </Button> 
          <IconButton 
            onClick={() => (onAction ? onAction(account, 'delete') : null)}
            icon="trash"
          >Delete
          </IconButton>
        </>
      ) : null}

    </div>
  </Alert>
);
const Panel = ({
  accounts, onSelect, state, select, 
}) => {
  const [accountsData, setAccountsData] = useState(accounts || []);
  const [selected, setSelected] = useState();
  const [mode, setMode] = useState();
  const onAction = async (account, action) => {
    if (action === 'select') {
      setSelected(account);
      setMode(false);
      if (onSelect) onSelect(account);
    }
    if (action === 'delete') {
      await Api.call('user/bank', 'DELETE', account.id);
      setAccountsData(accountsData.filter((a) => a.id !== account.id));
      setMode(false);
    }
    if (action === 'edit') {
      setSelected(account);
      setMode('edit');
    }
  };
  const onSubmit = (result) => {
    setMode(false);
    setAccountsData(
      [...accountsData.filter((a) => a.id !== result.id), result],
    );
  };
  return (
    <>
      <BankAccount.List
        select={select}
        accounts={accountsData}
        onAction={onAction}
        selected={selected}
        state={state}
      />
      { mode === 'edit' ? (
        <BankAccountForm
          account={selected}
          onSubmit={onSubmit}
          state={state}
        />
      ) : (
        <IconButton 
          icon="plus"
          onClick={() => {
            setMode('edit');
            setSelected({});
          }}
        >Add a new account
        </IconButton>
      )}

    </>
  ); 
};

BankAccount.List = ({
  accounts, selected, onAction, select, 
}) => (
  accounts.map((a) => (
    <BankAccount
      select={select}
      key={a.id} 
      onAction={onAction}
      account={a}
      selected={selected?.id === a.id}
    />
  ))
);
BankAccount.Form = BankAccountForm;
BankAccount.Panel = Panel;

export default BankAccount;
