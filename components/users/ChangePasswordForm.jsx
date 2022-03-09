import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Api from '../../utils/apiCall';

const ChangePasswordForm = ({ state, user, passkey, complete }) => {
  console.log('key', passkey)
  const userValidationSchema = Yup.object({
    password: Yup.string().required('enter a password')
      .min(5, 'Minimum 5 characters'),
    confirmPassword: Yup.string().required('confirm your password')
      .oneOf([Yup.ref('password')], "Passwords don't match"),
  });

  const initialValues = { ...user };
  const handleSubmit = async (values, { setErrors }) => {
    const res = await Api.post('user/changepassword', { ...values, key: passkey } );
    console.log('changepasswordresult', res)
    if(res.ok && complete) complete();
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
            handleChange,
            handleSubmit,
            handleBlur,
          },
        ) => (
          <Form noValidate onSubmit={handleSubmit} className="text-left airy">
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Repeat Password</Form.Label>
              <Form.Control
                required
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.confirmPassword && !errors.confirmPassword}
                isInvalid={touched.confirmPassword && errors.confirmPassword}
              />
              <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
            </Form.Group>
              <p className="text-right">
                <Button variant="primary" size="lg" disabled={isSubmitting} type="submit">
                  Change Password
                </Button>
              </p>
          </Form>
        )
}
    </Formik>
  );
};

export default ChangePasswordForm;
