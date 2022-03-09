import Resizer from 'react-image-file-resizer';

export const dataURIToFile = (dataURI, filename) => {
  const splitDataURI = dataURI.split(',');
  const byteString = splitDataURI[0].indexOf('base64') >= 0
    ? atob(splitDataURI[1])
    : decodeURI(splitDataURI[1]);
  const mimeString = splitDataURI[0].split(':')[1].split(';')[0];
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) ia[i] = byteString.charCodeAt(i);
  return new File([ia], filename, { type: mimeString });
};

const imageResizer = (
  file,
  options = { width: 300, height: 300, filename: null },
) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    options.width,
    options.height,
    'JPEG',
    90,
    0,
    (uri) => {
      resolve(options.filename ? dataURIToFile(uri, options.filename || file.name) : uri);
    },
    'base64',
  );
});

export default imageResizer;
