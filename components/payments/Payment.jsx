import React, { useState } from 'react';
import { Table, Badge, Button } from 'react-bootstrap';
import Link from 'next/link';
import moment from 'moment';
import router, { useRouter } from 'next/router';
import User from '../users/User';
import formatAmountForDisplay from '../../utils/currency';
import Status from '../Status';
import IconButton from '../IconButton';
import Api from '../../utils/apiCall';

const PaymentsTable = ({ payments, admin }) => (
  <Table className="card-table">
    <tbody>
      {payments.map((p) => (
        <tr key={p.id}>
          <td>
            { admin ? (
              <Status.Select
                variant="link"
                selected={p.status}
                size="sm"
                onChange={
                async (status) => {
                  await Api.call('offer/payment', 'POST', { id: p.id, status });
                  router.reload();
                }
              }
                statusList={['confirmed', 'canceled']}
              />
            ) : <Status status={p.status} />}
            
          </td>
          <td>
            <Link href={`/dashboard/payments/${p.id}`}>
              <Button size="sm" variant="dark">
                id:{p.id} ref:{p.key}
              </Button>
            </Link>
          </td>
          <td>{p.Offer.companyName}</td>
          <td>{formatAmountForDisplay(p.amount)}</td>
          { admin ? (
            <td>
              <User user={p.User} admin={admin} />
            </td>
          ) : null }
          <td>{moment(p.createdAt).fromNow()}</td>

        </tr>
      ))}
    </tbody>
  </Table>
);

const Payment = ({ payment, admin }) => {
  const router = useRouter();
  const confirm = (flag) => {
    const result = Api.call('offer/payment', 'POST', { id: payment.id, status: flag ? 'confirmed' : 'canceled' });
    router.reload();
  }; 
  return (
    <div>
      <h3>id:{payment.id} <Status status={payment.status} /> <Badge variant="dark">{payment.key}</Badge></h3>
      <p>from <User user={payment.User} admin={admin} /> to {payment.Offer.companyName}</p>
      <p>created: {moment(payment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>update: {moment(payment.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
      <p>amount: {formatAmountForDisplay(payment.amount)}</p>
      <p># shares: {payment.shares}</p>
      {payment.status === 'pending' && admin ? (
        <div>
          <IconButton icon="check" onClick={() => confirm(true)}>Confirm payment</IconButton>&nbsp;
          <IconButton icon="cancel" onClick={() => confirm(false)}>Cancel payment</IconButton>
        </div>
      ) : null }
    </div>
  ); 
};

Payment.List = ({ accounts }) => (
  accounts.map((a) => <Payment key={a.id} account={a} />)
);

Payment.Table = PaymentsTable;

export default Payment;
