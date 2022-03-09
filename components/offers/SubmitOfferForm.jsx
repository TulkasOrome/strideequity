/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useS3Upload } from 'next-s3-upload';
import Dropzone from 'react-dropzone';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icons from '../icons';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const SubmitOfferForm = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [offer, setOffer] = useState(false);
  const [files, setFiles] = useState([]);
  const { uploadToS3 } = useS3Upload();
  const uploadedFiles = [];

  const offerValidationSchema = Yup.object({
    companyName: Yup.string()
      .required('Please provide a company name'),
    phone: Yup.string()
      .required('Please provide a phone number'),
    raiseRange: Yup.string()
      .required('Please provide an estimate of what you want to raise'),
    companyStage: Yup.string()
      .required('Please select the stage of your company'),
    pitch: Yup.string()
      .required('Please enter a elevator pitch'),
    terms: Yup.boolean().oneOf([true] ,'Please accept our terms and conditions'),
  });

  const initialValues = {
    companyName: '',
    phone: '',
    raiseRange: '',
    companyStage: '',
    pitch: '',
    links: '',
    terms: false,
  };

  const handleSubmit = async (values, { setErrors, setStatus }) => {
    const res = await fetch('/api/offer/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, ...{ informationFiles: files } }),
    });
    if (res.status === 200) {
      const offerObject = await res.json();
      setConfirmed(true);
      setOffer(offerObject);
    } else {
      const serverErrors = await res.json();
      serverErrors.errors.reduce(
        (errors, error) => ({ ...errors, [error.field]: error.message }), {},
      );
      setErrors({ pitch: 'Server error' });
    }
  };

  const selectFiles = async (fls) => {
    const promises = fls.map((file) => uploadToS3(file));
    const urls = (await Promise.all(promises)).map((f) => f.url);
    setFiles([...files, ...urls]);
  };

  const form = (
    <Formik
      validationSchema={offerValidationSchema}
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
          <Form noValidate onSubmit={handleSubmit} className="text-left airy">
            <Form.Group controlId="companyName">
              <Form.Label>Company Name </Form.Label>
              <Form.Control
                type="text"
                value={values.companyName}
                placeholder="ACME inc"
                onChange={handleChange}
                isValid={touched.companyName && !errors.companyName}
                isInvalid={touched.companyName && errors.companyName}
              />
              <Form.Control.Feedback type="invalid">{errors.companyName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Label>Phone </Form.Label>
              <Form.Control
                type="text"
                placeholder="+61 2 1234 5678"
                value={values.phone}
                onChange={handleChange}
                isValid={touched.phone && !errors.phone}
                isInvalid={touched.phone && errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="raiseRange">
              <Form.Label>How much do you want to raise?</Form.Label>
              <Form.Control 
                as="select"
                required
                onChange={handleChange}
                isValid={touched.raiseRange && !errors.raiseRange}
                isInvalid={touched.raiseRange && errors.raiseRange}
              >
                <option>Select a range</option>
                <option>$200,000 to $500,000</option>
                <option>$500,000 to $700,000</option>
                <option>$700,000 to $1,000,000</option>
                <option>$1,000,000 to $2,000,000</option>
                <option>more then $2,000,000</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.raiseRange}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="companyStage">
              <Form.Label>Company stage</Form.Label>
              <Form.Control 
                as="select"
                required
                onChange={handleChange}
                isValid={touched.companyStage && !errors.companyStage}
                isInvalid={touched.companyStage && errors.companyStage}
              >
                <option>Select a stage</option>
                <option>startup</option>
                <option>scaleup</option>
                <option>mature company</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">{errors.companyStage}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="pitch">
              <Form.Label>Elevator pitch</Form.Label>
              <Form.Control
                required
                as="textarea"
                onChange={handleChange}
                isValid={touched.pitch && !errors.pitch}
                isInvalid={touched.pitch && errors.pitch}
              />
              <Form.Control.Feedback type="invalid">{errors.pitch}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Documentation, pitch deck, marketing material</Form.Label>
              <Dropzone onDrop={selectFiles}>
                {({ getRootProps, getInputProps }) => (
                  <section style={baseStyle}>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Drag &amp; drop some files here, or click to select files</p>
                    </div>
                  </section>
                )}
              </Dropzone>
              {files.map((f) => (
                <div key={f}>
                  <a target="_blank" href={f} rel="noreferrer">
                    <Icons.File size={16} /> {f.split('/').pop()}
                  </a>
                </div>
              ))}
            </Form.Group>
            <Form.Group controlId="informationLinks">
              <Form.Label>Links to online content</Form.Label>
              <Form.Control
                required
                as="textarea"
                onChange={handleChange}
                isValid={touched.links && !errors.links}
                isInvalid={touched.links && errors.links}
              />
              <Form.Control.Feedback type="invalid">{errors.links}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="terms">
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
            <Button variant="outline-primary" size="lg" block disabled={isSubmitting} type="submit">Submit your Application</Button>
          </Form>
        )
      }
    </Formik>
  );

  const thanks = (
    <div className="lead">
      <p>Thank you your offer has been submitted. </p>
      Our team will review your offer and contact you if needed
    </div>
  );

  return !confirmed ? form : thanks;
};

export default SubmitOfferForm;
