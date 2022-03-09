import React, { useEffect, useState } from 'react';

import {
  useEditor, EditorContent, BubbleMenu, FloatingMenu,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Button } from 'react-bootstrap';
import { useS3Upload } from 'next-s3-upload';
import { Image } from '@tiptap/extension-image';
import imageResizer, { dataURIToFile } from '../utils/imageResizer';
import UploadAndCrop from './UploadAndCrop';

const textIcons = {
  list: 
  <svg height="14" width="14" fill="currentcolor" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 17h-7a2 2 0 0 0 0 4h7a2 2 0 0 0 0-4zM19 10h-7a2 2 0 0 0 0 4h7a2 2 0 0 0 0-4zM19 3h-7a2 2 0 0 0 0 4h7a2 2 0 0 0 0-4z" />
    <circle cx="5" cy="19" r="2.5" />
    <circle cx="5" cy="12" r="2.5" />
    <circle cx="5" cy="5" r="2.5" />
  </svg>,
  bold:
  <svg height="12" width="12" fill="currentcolor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M3 19V1h8a5 5 0 0 1 3.88 8.16A5.5 5.5 0 0 1 11.5 19H3zm7.5-8H7v5h3.5a2.5 2.5 0 1 0 0-5zM7 4v4h3a2 2 0 1 0 0-4H7z" /></svg>,
  heading:
  <svg height="12" width="12" fill="currentcolor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z" />
  </svg>,
  h2:
  <span>
    <svg height="12" width="12" fill="currentcolor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z" />
    </svg>
    2
  </span>,
  h3:
  <span>
    <svg height="12" width="12" fill="currentcolor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path d="M448 96v320h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H320a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V288H160v128h32a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16h32V96H32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-32v128h192V96h-32a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16z" />
    </svg>
    3
  </span>,
  paragraph:
  <svg height="12" width="12" fill="currentcolor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1534 189v73q0 29-18.5 61t-42.5 32q-50 0-54 1-26 6-32 31-3 11-3 64v1152q0 25-18 43t-43 18h-108q-25 0-43-18t-18-43v-1218h-143v1218q0 25-17.5 43t-43.5 18h-108q-26 0-43.5-18t-17.5-43v-496q-147-12-245-59-126-58-192-179-64-117-64-259 0-166 88-286 88-118 209-159 111-37 417-37h479q25 0 43 18t18 43z" /></svg>,
  image:
  <svg height="12" width="12" fill="currentcolor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="8.5" cy="8.501" r="2.5" /><path d="M16,10c-2,0-3,3-4.5,3s-1.499-1-3.5-1c-2,0-3.001,4-3.001,4H19C19,16,18,10,16,10z" /><path d="M20,3H4C2.897,3,2,3.897,2,5v12c0,1.103,0.897,2,2,2h16c1.103,0,2-0.897,2-2V5C22,3.897,21.103,3,20,3z M20,17H4V5h16V17z" /></g></svg>,
  left:
  <svg fill="none" height="12" width="12" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><line x1="17" x2="3" y1="10" y2="10" /><line x1="21" x2="3" y1="6" y2="6" /><line x1="21" x2="3" y1="14" y2="14" /><line x1="17" x2="3" y1="18" y2="18" /></svg>,
  right:
  <svg fill="none" height="12" width="12" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><line x1="21" x2="7" y1="10" y2="10" /><line x1="21" x2="3" y1="6" y2="6" /><line x1="21" x2="3" y1="14" y2="14" /><line x1="21" x2="7" y1="18" y2="18" /></svg>,
  center:
  <svg fill="none" height="12" width="12" stroke="currentcolor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><line x1="18" x2="6" y1="10" y2="10" /><line x1="21" x2="3" y1="6" y2="6" /><line x1="21" x2="3" y1="14" y2="14" /><line x1="18" x2="6" y1="18" y2="18" /></svg>,

};

const getItems = (editor, options = 'p b h2 h3 li img') => {
  const buttons = {
    left: {
      label: 'left', 
      icon: textIcons.left,
      action: () => editor.chain().focus().setTextAlign('left').run(),
      active: () => editor.isActive('paragraph'),
    },
    center:{
      label: 'center', 
      icon: textIcons.center,
      action: () => editor.chain().focus().setTextAlign('center').run(),
      active: () => editor.isActive('paragraph'),
    },
    right:{
      label: 'right', 
      icon: textIcons.right,
      action: () => editor.chain().focus().setTextAlign('right').run(),
      active: () => editor.isActive('paragraph'),
    },
    p:{
      label: 'paragraph', 
      icon: textIcons.paragraph,
      action: () => editor.chain().focus().setParagraph().run(),
      active: () => editor.isActive('paragraph'),
    },
    b:{
      label: 'Bold', 
      icon: textIcons.bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: () => editor.isActive('bold'),
    },
    h3:{
      label: 'Heading3', 
      icon: textIcons.h3,
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      active: () => editor.isActive('heading', { level: 3 }),
    },
    h2:{ 
      label: 'Heading2', 
      icon: textIcons.h2,
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      active: () => editor.isActive('heading', { level: 2 }),
    },
    li:{
      label: 'List', 
      icon: textIcons.list,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: () => editor.isActive('bulletList'),
    },
  }

  return options.split(' ').filter(o => buttons[o] ).map(o => buttons[o] );

};

const selectImage = () => false;

const PopUpBar = ({ editor, options }) => {
  if (!editor) {
    return null;
  }

  const items = getItems(editor, options);
  return (
    <BubbleMenu editor={editor}>
      {items.map((item) => (
        <Button 
          variant="link"
          size="sm"
          key={item.label}
          onClick={item.action}
          active={item.active()}
        >{item.icon}
        </Button>
      ))}
      
    </BubbleMenu>
  );
};

const FloatingBar = ({ editor, options }) => {
  const { uploadToS3 } = useS3Upload();
  if (!editor) {
    return null;
  }
  const items = getItems(editor, options);
  const addImage = async (dataUrl, ed) => {
    const file = dataURIToFile(dataUrl, 'insert.jpg');
    const image = await imageResizer(file, { width: 1800, height: 1200, filename: 'insert.jpg' });
    const { url } = await uploadToS3(image);
    ed.chain().focus().setImage({ src: url, style: { width: '100%' } }).run();
  };

  return (
    <FloatingMenu editor={editor}>
      <UploadAndCrop label="" variant="link" size="sm" update={(data) => addImage(data, editor)} />
      {items.map((item) => (
        <Button 
          variant="link"
          size="sm"
          key={item.label}
          onClick={item.action}
          active={item.active()}
        >{item.icon}
        </Button>
      ))}
    </FloatingMenu>
  ); 
};

const EditContentField = ({ content, update, options }) => {
  const [contentData, setContent] = useState(content);
  const editor = useEditor({
    extensions: [
      StarterKit, FloatingMenu, BubbleMenu, 
      Image.configure({ inline: true }),
      TextAlign.configure({ types: ['heading', 'paragraph', 'image'] }),
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
      update(editor.getHTML());
    },
  });

  return (
    <div>
      <FloatingBar editor={editor} options={options} />
      <PopUpBar editor={editor} options={options} />
      <EditorContent className="editor-content" editor={editor} />
    </div>
  ); 
};

export default EditContentField;
