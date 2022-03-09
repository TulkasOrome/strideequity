import { APIRoute } from 'next-s3-upload';
import { nanoid } from 'nanoid';

export default APIRoute.configure({
  key(req, filename) {
    return `f/${nanoid(4)}/${filename.replace(/\s/g, '-')}`;
  },
});
