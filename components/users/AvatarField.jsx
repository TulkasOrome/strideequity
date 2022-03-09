import React, { useState } from 'react';
import { useS3Upload } from 'next-s3-upload';
import IconButton from '../IconButton';
import imageResizer, { dataURIToFile } from '../../utils/imageResizer';
import UserAvatar from './UserAvatar';
import UploadAndCrop from '../UploadAndCrop';
import { useRouter } from 'next/router';
import Api from '../../utils/apiCall';

const AvatarField = ({ user }) => {
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [userData, setUserData] = useState({ name: user.name, avatar: user.avatar });
  const { uploadToS3 } = useS3Upload();
  const router = useRouter()

  const saveAvatar = async (url) => {
    const update = await Api.call('user/update', 'POST', { avatar: url, id: user.id });
    router.reload();
  };

  const onCrop = async (imgData) => {
    const file = dataURIToFile(imgData);
    const image = await imageResizer(file, { width: 300, height: 300, filename: `${user.name}.jpg` });
    const { url } = await uploadToS3(image);
    setImageUrl(url);
    saveAvatar(url);
  };

  return (
    <div className="text-center">
      <UserAvatar user={userData} image={imageUrl} size={150} />
      <br /><br />
      {imageUrl && imageUrl !== 'none' ? (
        <>
          <IconButton
            icon="trash"
            onClick={() => {
              setImageUrl('none');
              setUserData({ ...userData, ...{ avatar: 'none' } }); 
              saveAvatar('none');
            }}
          >delete Avatar
          </IconButton>&nbsp;
        </>
      ) : null}
      <UploadAndCrop label="upload avatar" aspectRatio={1} update={(imageData) => onCrop(imageData)} />
    </div>
  );
};

export default AvatarField;
