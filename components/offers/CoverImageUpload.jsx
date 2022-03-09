import React, { useState, useRef } from 'react';
import { useS3Upload } from 'next-s3-upload';
import {
  Image, Button, Row, Col, 
} from 'react-bootstrap';
import Cropper from 'react-cropper';

import chroma from 'chroma-js';
import Offers from './Offers';
import UploadAndCrop from '../UploadAndCrop';
import IconButton from '../IconButton';
import ColorField from '../ColorField';

const rgbToHex = (r, g, b) => `#${[r, g, b].map((x) => {
  const hex = x.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}).join('')}`;

const dataURIToFile = (dataURI, filename) => {
  const splitDataURI = dataURI.split(',');
  const byteString = splitDataURI[0].indexOf('base64') >= 0
    ? atob(splitDataURI[1])
    : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) ia[i] = byteString.charCodeAt(i);
  return new File([ia], filename, { type: mimeString });
};

const CoverImageUpload = ({ offer, update }) => {
  const [mode, setMode] = useState(false);
  const cropperRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(Offers.cover(offer));
  const [offerData, setOfferData] = useState({ ...offer });
  const [palette, setPalette] = useState([]);
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const [color, setColor] = useState(offer.colors?.color || '#fff');
  const [colors, setColors] = useState(offer.colors || { 
    palette: [], 
    color: offer.color, 
    imgColor: null,
  });
 
  const crop = (imgData, element) => {
    const colorThief = new ColorThief();
    const palette = colorThief.getPalette(element, 5)
      .map((c) => chroma(c[0], c[1], c[2]).hex())
      .sort((a, b) => chroma(a).luminance() - chroma(b).luminance());
    palette[2] = chroma(palette[2]).saturate(2).hex();
    const col = { 
      ...colors, 
      ...{ 
        imgColor: palette[3], 
        palette, 
        color: palette[2],
      }, 
    };
    setColor(palette[2]);
    setColors(col);
    setOfferData({ ...offerData, ...{ colors: col } });
    setMode('confirm');
    setImageUrl(imgData);
  };

  const save = async () => {
    const image = dataURIToFile(imageUrl, `offer${offer.id}.jpg`);
    const { url } = await uploadToS3(image);
    const images = { img: url, thumb: url };
    setMode('uploading');
    const res = await fetch('/api/offer/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coverImage: images, colors, id: offer.id }),
    }); 
    update({ coverImage: images });
    setMode(false);
  };

  const handleColorChange = async (color) => {
    const col = { ...colors, ...{ color } };
    const ress = await fetch('/api/offer/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ colors: col, id: offer.id }),
    }); 
    update({ colors: col });
    setColors(col);
  };

  return (
    <div>
      <Row>
        <Col>
          <div style={{ paddingBottom: '56.25%', background: Offers.headerBackground(offerData, imageUrl) }} />
        </Col>
        <Col>
          {colors.palette.map((p) => (
            <p style={{ background: p }} key={p}>
              {p}
            </p>
          ))}
        </Col>
      </Row>

      {mode === 'crop' ? (
        <>

          <Cropper
            src={imageUrl}
            style={{ height: 300, width: '100%' }}
            zoomTo={0.5}
            aspectRatio={16 / 9}
            initialAspectRatio={16 / 9}
            guides={false}
            ref={cropperRef}
          />
          <IconButton icon="crop" onClick={crop}>Crop</IconButton>
          <IconButton icon="cancel" onClick={() => setImageUrl(false)}>Cancel</IconButton>
        </>
      ) : null }

      {mode === 'confirm' ? (
        <>
          <IconButton icon="check" onClick={save}>Save Cover Image and Palette</IconButton>
          <IconButton icon="cancel" onClick={() => setImageUrl(false)}>Cancel</IconButton>
        </>
      ) : null }
      {mode === 'uploading' ? (
        <>
          Uploading
        </>
      ) : null }
      {!mode ? (
        <>
          <UploadAndCrop label="Upload Cover Image" aspectRatio={16 / 9} update={crop} />
          <ColorField value={color} onChange={handleColorChange} />
        </>
      ) : null }
      
    </div>
  );
};

export default CoverImageUpload;
