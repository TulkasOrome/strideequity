import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import chroma from 'chroma-js';

const variant = (status) => ({ 
  draft: 'info', 
  submitted: 'primary', 
  active: 'success',
  preview: 'info',
  finished: 'warning',
  rejected: 'secondary',
}[status || 'submitted']);

const status = (status) => <Badge variant={variant(status)}>{status || 'submitted'}</Badge>;

const actions = (offer) => (
  <Button href={`/dashboard/offers/edit/${offer.id}`}>
    {{ draft: 'edit', submitted: 'Accept or reject', published: 'update' }[offer.status || 'submitted']}
  </Button>
);
const thumb = (offer) => (offer.coverImage?.thumb || '/static/cover.jpg');
const cover = (offer) => (offer.coverImage?.img || '/static/cover.jpg');
const palette = (offer) => chroma.scale([offer.color, '#08366B']).mode('lch').colors(4);
const rgba = (color, a) => `rgba(${color.r}, ${color.g}, ${color.b}, ${a})`;
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};
const hexToRgba = (hex, a) => rgba(hexToRgb(hex), a);

const headerBackground = (offer, imageUrl) => {
  const palette = offer.colors?.palette || ['#000000', '#000000', '#000000', '#000000', '#000000'];
  return `linear-gradient(180deg, ${hexToRgba(palette[0], 0.9)}, ${hexToRgba(palette[2], 0.2)} 50%, ${hexToRgba(palette[3], 0.2)} 100%), url(${imageUrl || offer.coverImage?.img || ''}) center center / cover, ${palette[2]}`; 
};

export default {
  variant,
  status,
  actions,
  thumb,
  cover,
  headerBackground,
  rgba,
  hexToRgb,
  hexToRgba,
  palette,
};
