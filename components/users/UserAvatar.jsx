import React, { useState } from 'react';
import { Image, Button } from 'react-bootstrap';
import Avatar from 'boring-avatars';

const UserAvatar = ({ user, size = 20, image }) => ((image && image !== 'none') || (user?.avatar && user?.avatar !== 'none') ? (
  <Image width={size} height={size} src={image || user?.avatar} roundedCircle />
) : (
  <Avatar
    size={size}
    name={user?.name}
    variant="ring"
    colors={['#ED3724', '#1C85E8', '#E76127', '#3A00AD']}
  />
)
);

export default UserAvatar;
