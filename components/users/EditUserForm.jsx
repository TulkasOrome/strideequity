import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Router, { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Api from '../../utils/apiCall';
import { Alert } from 'react-bootstrap';
import Icons from '../icons';
import Access from '../../utils/access';

const EditUserForm = ({ state, user }) => {
  const router = useRouter();
  const userValidationSchema = Yup.object({
    name: Yup.string()
      .required('Please provide a name')
      .min(2, 'Mininum 2 characters')
      .max(50, 'Maximum 50 characters'),
    email: Yup.string()
      .required('Please provide a email')
      .email('Invalid email format'),
  });

  const initialValues = { ...user };
  const canAdministrate = Access.can('manage', state.user);

  const isTouched = (touched) => Object.keys(touched).reduce((a, t) => a || t, false);

  const handleSubmit = async (values, { setErrors }) => {
    const res = await Api.call('user/update', 'POST', values);
    router.reload();
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
            handleBlur,
            values,
            handleChange,
            handleSubmit,
          },
        ) => (
          <Form noValidate onSubmit={handleSubmit} className="text-left airy">

            <Form.Group controlId="name">
              <Form.Label>Full Name </Form.Label>
              <Form.Control
                type="text"
                value={values.name}
                placeholder="John Doe"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.name && !errors.name}
                isInvalid={touched.name && errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email </Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="john.doe@domain.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="bio">
              <Form.Label>My Bio</Form.Label>
              <Form.Control
                as="textarea"
                value={values.bio}
                placeholder="Tell us about yourself"
                onChange={handleChange}
                onBlur={handleBlur}
                isValid={touched.bio && !errors.bio}
                isInvalid={touched.bio && errors.bio}
              />
              <Form.Control.Feedback type="invalid">{errors.bio}</Form.Control.Feedback>
            </Form.Group>
            {canAdministrate ? (
              <Alert variant="secondary">
              <Icons.Admin size={18} />
              <Form.Group controlId="role">
                <Form.Label>Role </Form.Label>
                <Form.Control
                  as="select"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.name && !errors.role}
                  isInvalid={touched.name && errors.role}
                >{Object.keys(Access.roles).map(r => <option>{r}</option>)}
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
              </Form.Group>
                <Form.Group controlId="verifiedId">
                  <Form.Check
                    checked={values.verifiedId}
                    label="Verified KYC ID"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.verifiedId}
                    feedback={errors.verifiedId}
                  />
                </Form.Group>
                <Form.Group controlId="verifiedWholesale">
                  <Form.Check
                    checked={values.verifiedWholesale}
                    label="Verified wholesale investor"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.verifiedWholesale}
                    feedback={errors.verifiedWholesale}
                  />
                </Form.Group>
               </Alert>
            ) : null }
            {isTouched(touched) ? (
              <p className="text-right">
                <Button variant="primary" size="lg" disabled={isSubmitting} type="submit">
                  Save Info
                </Button>
              </p>
            ) : null }
          </Form>
        )
}
    </Formik>
  );
};

export default EditUserForm;
