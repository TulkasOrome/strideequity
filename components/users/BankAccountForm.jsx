import React, { useEffect } from 'react';
import {
  Row, Col, Form, Button, 
} from 'react-bootstrap';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Api from '../../utils/apiCall';

const BankAccountForm = ({ state, account, onSubmit }) => {
  const bankValidationSchema = Yup.object({
    number: Yup.string()
      .required('Please provide a name')
      .min(2, 'Mininum 2 characters')
      .max(20, 'Maximum 20 characters'),
    accountHolder: Yup.string()
      .required('Please provide a name')
      .min(2, 'Mininum 2 characters')
      .max(60, 'Maximum 60 characters'),
    bank: Yup.string()
      .required('Please provide a name')
      .min(2, 'Mininum 2 characters')
      .max(20, 'Maximum 50 characters'),
    sortCode: Yup.string()
      .required('Please provide a name')
      .min(2, 'Mininum 6 characters')
      .max(20, 'Maximum 9 characters'),
  });

  const initialValues = { ...account };
  const canAdministrate = state.user.role === 'admin';
  console.log('initialValues', initialValues);

  const handleSubmit = async (values, { setErrors }) => {
    const result = await Api.call('user/bank', 'POST', values);
    if (onSubmit) onSubmit(result.id ? result : values);
  };

  return (
    <Formik
      validationSchema={bankValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {
        (
          {
            errors,
            touched,
            isSubmitting,
            values,
            handleChange,
            handleSubmit,
          },
        ) => (
          <Form noValidate onSubmit={handleSubmit} className="text-left">
            <Row>
              <Col>
                <Form.Group controlId="accountHolder">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control
                    required
                    value={values.accountHolder}
                    type="text"
                    onChange={handleChange}
                    isValid={touched.accountHolder && !errors.accountHolder}
                    isInvalid={touched.accountHolder && errors.accountHolder}
                  />
                  <Form.Control.Feedback type="invalid">{errors.accountHolder}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="number">
                  <Form.Label>Account Number </Form.Label>
                  <Form.Control
                    type="text"
                    value={values.number}
                    placeholder="123 4567 890"
                    onChange={handleChange}
                    isValid={touched.number && !errors.number}
                    isInvalid={touched.number && errors.number}
                  />
                  <Form.Control.Feedback type="invalid">{errors.number}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="sortCode">
                  <Form.Label>BSB </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="123 123 123"
                    value={values.sortCode}
                    onChange={handleChange}
                    isValid={touched.sortCode && !errors.sortCode}
                    isInvalid={touched.sortCode && errors.sortCode}
                  />
                  <Form.Control.Feedback type="invalid">{errors.sortCode}</Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="bank">
                  <Form.Label>Bank</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    value={values.bank}
                    onChange={handleChange}
                    isValid={touched.bank && !errors.bank}
                    isInvalid={touched.bank && errors.bank}
                  />
                  <Form.Control.Feedback type="invalid">{errors.bank}</Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="outline-primary" size="lg" block disabled={isSubmitting} type="submit">
              { values.id ? 'Save Account' : 'Add new Account' }
            </Button>
          </Form>
        )
}
    </Formik>
  );
};

export default BankAccountForm;
