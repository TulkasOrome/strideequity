import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useS3Upload } from 'next-s3-upload';
import Dropzone from 'react-dropzone';
import Router from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Alert } from 'react-bootstrap';
import Api from '../../utils/apiCall';
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

const WholesaleVerificationForm = ({ onSubmit, state, data }) => {
  const [files, setFiles] = useState([]);
  const [verif, setVerif] = useState(data.verif);
  const { uploadToS3 } = useS3Upload();
  const handleSubmit = async () => {
    const result = await Api.call('user/wholesale', 'POST', { documentation: files.join('\n') });
    setVerif(result);
    if (onSubmit) onSubmit(result);
  };
  const selectFiles = async (fls) => {
    const promises = fls.map((file) => uploadToS3(file));
    const urls = (await Promise.all(promises)).map((f) => f.url);
    setFiles([...files, ...urls]);
  };
  return !verif ? (
    <div className="text-left airy">
      <Form.Group>
        <Form.Label>Upload a certificate from a qualified accountant&nbsp;
          to confirm your wholesale investor status
        </Form.Label>
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
      <Form.Group className="text-right">
        <Button onClick={handleSubmit} disabled={files.length < 1} variant="primary" type="submit">
          Verify my wholesale investor status
        </Button>
      </Form.Group>
    </div>
  ) : (
    
    <Alert variant={state.user.verifiedWholesale ? 'success' : 'primary'}>
      { state.user.verifiedWholesale 
        ? <p><Icons.Check /> Wholesale Verification approved </p> 
        : <p><Icons.Award /> Wholesale Verification submitted </p>
      }
      {verif.documentation.split('\n').map(
        (f) => (
          <div key={f}>
            <a target="_blank" href={f} rel="noreferrer">
              <Icons.File size={16} /> {f.split('/').pop()}
            </a>
          </div>
        ),
      ) }
    </Alert>
  );
};

export default WholesaleVerificationForm;
