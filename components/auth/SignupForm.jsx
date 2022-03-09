import React from 'react';
import {
  Button, Spinner, Form, Modal, Row, Col, 
} from 'react-bootstrap';
import { Formik } from 'formik';
import { signIn } from "next-auth/react";
import * as Yup from 'yup';
import Api from '../../utils/apiCall';


const SignupForm = ({ complete, modal }) => {
  const userValidationSchema = Yup.object({
    name: Yup.string()
      .required('Please provide a name')
      .min(2, 'Mininum 2 characters')
      .max(150, 'Maximum 150 characters'),
    email: Yup.string()
      .required('Please provide a email')
      .email('Invalid email format')
      .test('Unique Email','Email already in use', 
        email => Api.get(`user`, {email}),
      ),
    password: Yup.string()
      .required('Please provide a password of minimum 8 characters')
      .min(5, 'Minimum 5 characters'),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password')], "Passwords don't match"),
    terms: Yup.bool().required().oneOf([true], 'Please accept our terms and conditions'),
  });

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = async (values, { setErrors }) => {
    const body = {
      email: values.email,
      name: values.name,
      password: values.password,
    };
    const res = await Api.post('user', body);
    if (res.success) {
      const sign = await signIn('credentials', { redirect: false, email: values.email, password: values.password })
      if( sign.ok ) complete();
    } else {
      const serverError = await res.json();
      setErrors({ email: serverError.message });
    }
  };

  return (
    <Formik
      validationSchema={userValidationSchema}
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
            <div className={modal ? 'modal-body' : null}>
              <Row>
                <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Full Name </Form.Label>
                    <Form.Control
                      type="text"
                      value={values.name}
                      placeholder="John Doe"
                      onChange={handleChange}
                      isValid={touched.name && !errors.name}
                      isInvalid={touched.name && errors.name}
                    />
                    <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                  </Form.Group>      
                </Col>
                <Col>
                  <Form.Group controlId="email">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="john.doe@domain.com"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="password">
                    <Form.Label>Your Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                      required
                      type="password"
                      onChange={handleChange}
                      isValid={touched.confirmPassword && !errors.confirmPassword}
                      isInvalid={touched.confirmPassword && errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group  controlId="terms">
                <Form.Check
                  required
                  value
                  name="terms"
                  label={<>I Agree to StrideEquity&apos;s <a href="/terms" target="_blank">Terms and Conditions</a></>}
                  onChange={handleChange}
                  isInvalid={!!errors.terms}
                  feedback={errors.terms}
                />
              </Form.Group>
              <Form.Group  controlId="subscribe">
                <Form.Check
                  required
                  value
                  label={<>Get early access to our latest investment opportunities.</>}
                  onChange={handleChange}
                  isInvalid={!!errors.subscribe}
                  feedback={errors.subscribe}
                />
              </Form.Group>
            </div>
            <div className={modal ? 'modal-footer' : null}>
              <Button size="lg" variant="primary" block disabled={isSubmitting} type="submit">
                {isSubmitting ? <Spinner animation="border" size="sm" role="status" /> : null } 
              &nbsp;Sign up
              </Button>
            </div>
          </Form>
        )
}
    </Formik>
  );
};

export default SignupForm;
