import React from 'react';
import { Button } from 'react-bootstrap';
import Icons from './icons';

const icoTag = (key, size = 12) => {
  const icos = Object.keys(Icons).filter((k) => k.toLocaleLowerCase() === key);
  if (icos.length) {
    const Ico = Icons[icos[0]];
    return <Ico size={size} />;
  }

  const icons = {
    edit: <Icons.Pencil size={size} />,
    change: <Icons.Random size={size} />,
    trash: <Icons.Trash size={size} />,
    upload: <Icons.Upload size={size} />,
    crop: <Icons.Crop size={size} />,
    cancel: <Icons.Cancel size={size} />,
    check: <Icons.Check size={size} />,
  };
  return (icons[key]);
};

const sizePx = (size) => ({ lg: 20, md: 16, sm: 14 }[size]);

const IconButton = ({
  children, onClick, href, variant = 'outline-info', icon = 'edit', size = 'md', disabled, className, 
}) => (
  <Button
    style={{ whiteSpace: 'nowrap' }}
    size={size}
    onClick={onClick}
    href={href}
    variant={variant}
    disabled={disabled}
    className={className}
  >
    {icoTag(icon, sizePx(size))}&nbsp;{children}
  </Button>
);

export default IconButton;
