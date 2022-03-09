import React from 'react';
import { Button, Spinner, Form } from 'react-bootstrap';
import { signIn } from "next-auth/react"
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginForm = ({ complete, modal }) => {
  const userValidationSchema = Yup.object({
    email: Yup.string()
      .required('Please provide a email')
      .email('Invalid email format'),
    password: Yup.string()
      .required('Please provide a password'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, { setFieldError }) => {
    const sign = await signIn('credentials', { redirect: false, email: values.email, password: values.password });
    console.log('signin', sign);
    if (sign.ok ) {
      complete();
    } else {
      setFieldError('password', 'Wrong email or password');
    }
  };

  return (
    <Formik
      validationSchema={userValidationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >{({
      errors, touched, isSubmitting, values, handleChange, handleSubmit,
    }) => (
      <Form noValidate onSubmit={handleSubmit} className="text-left">
        <div className={modal ? 'modal-body' : null}>
          <Form.Group controlId="email">
            <Form.Label>Your Email </Form.Label>
            <Form.Control
              required
              autoComplete="email"
              type="email"
              placeholder="john.doe@domain.com"
              value={values.email}
              onChange={handleChange}
              isValid={touched.email && !errors.email}
              isInvalid={touched.email && errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Your Password</Form.Label>
            <Form.Control
              required
              type="password"
              autoComplete="current-password"
              onChange={handleChange}
              isValid={touched.password && !errors.password}
              isInvalid={touched.password && errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className={modal ? 'modal-footer' : null}>
          <Button variant="primary" size="lg" block disabled={isSubmitting} type="submit">
            {isSubmitting ? <Spinner animation="border" size="sm" role="status" /> : null } 
          &nbsp;sign In
          </Button>
        </div>
      </Form>
    )}
    </Formik>
  );
};

export default LoginForm;
