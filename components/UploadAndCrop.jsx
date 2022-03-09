import React, { useRef, useState } from 'react';
import {
  Modal, Image,
} from 'react-bootstrap';
import { useS3Upload } from 'next-s3-upload';
import Cropper from 'react-cropper';
import IconButton from './IconButton';

const UploadAndCrop = ({
  update, label = 'upload Image', image, aspectRatio = null, variant, size = 'md',
}) => {
  const [imageUrl, setImageUrl] = useState(image);
  const [cropped, setCropped] = useState(null);
  const [status, setStatus] = useState('init');
  const cropperRef = useRef(null);
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  const handleClose = () => {
    setStatus('init');
  };

  const handleFileChange = async (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
      setStatus('crop');
    };
    reader.readAsDataURL(file);
  };

  const crop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    const cropedDataUrl = cropper.getCroppedCanvas().toDataURL();
    const data = cropper.getData();
    const original = cropper.getImageData();
    console.log('data, original', data, original)
    if( original.width !== data.width || original.height !== data.height ) setCropped( cropedDataUrl);
    setStatus('confirm');
  };

  const confirm = () => {
    update(cropped, cropperRef?.current);
    setStatus('init');
  };

  return (
    <>
      <IconButton size={size} variant={variant} onClick={openFileDialog} icon="upload">{label}</IconButton>
      <FileInput onChange={handleFileChange} />
      <Modal show={status === 'crop'} onHide={handleClose} size="lg" scrollable backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Crop your image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Cropper
            viewMode={1}
            src={imageUrl}
            style={{ height: 300, width: '100%' }}
            aspectRatio={aspectRatio}
            autoCropArea={1}
            guides={false}
            ref={cropperRef}
          />
        </Modal.Body>
        <Modal.Footer>
          <IconButton icon="crop" onClick={() => crop()}>Confirm Crop</IconButton>
        </Modal.Footer>
      </Modal>
      <Modal show={status === 'confirm'} onHide={handleClose} size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Crop your image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={cropped} fluid />
        </Modal.Body>
        <Modal.Footer>
          <IconButton icon="check" onClick={() => confirm()}>Save Image</IconButton>
          <IconButton icon="cancel" onClick={() => setStatus('init')}>Cancel</IconButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UploadAndCrop;
