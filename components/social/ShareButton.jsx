import React from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Icons from '../icons';

const ShareButton = ({
  url = null, platform, size, variant, mini = false, siteUrl,
}) => {
  const shareUrl = `${siteUrl}${url || useRouter().asPath}`;
  const platforms = {
    twitter: {
      text: 'Twitter',
      Icon: Icons.Twitter,
      url: (url) => (`https://twitter.com/share?text=Look at this offer from @StrideEquity!&url=${url}&hashtags=StrideEquity`),
    },
    facebook: {
      text: 'Facebook',
      Icon: Icons.Facebook,
      url: (url) => (`https://www.facebook.com/sharer/sharer.php?u=${url}&hashtag=StrideEquity`),
    },
    email: {
      text: 'Email',
      Icon: Icons.Email,
      url: (url) => (`mailto:?subject=${encodeURIComponent('FundOSS democtratic funding for open source projects')}&body=I just backed these OSS projects on FundOSS.org! ${encodeURIComponent(url)}`),
    },
    linkedin: {
      text: 'linkedin',
      Icon: Icons.Linkedin,
      url: (url) => (`https://www.facebook.com/sharer/sharer.php?u=${url}&hashtag=StrideEquity`),
    },
  };
  const Sharer = platforms[platform || 'twitter'];

  return (
    <Button target="_blank" href={Sharer.url(shareUrl)} variant={variant || 'link'} size={size || 'md'}>
      <Sharer.Icon size={18} />
      { !mini ? <span>&nbsp;{Sharer.text}</span> : null}
    </Button>
  );
};

export default ShareButton;
