import React, { useRef, useState } from 'react';
import { Badge, Form } from 'react-bootstrap';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

const Editable = ({
  edit, update, value, type = 'content', render = false, options,
}) => {
  const [val, setVal] = useState(value);
  if (type === 'number') {
    return (
      <>
        { edit ? (
          <Form.Control
            min={options.min}
            max={options.max}
            step={options.step}
            size="sm"
            style={{ display: 'inline', width: '100px' }}
            type="number"
            value={val} 
            onChange={(e) => {
              setVal(e.target.value);
              update(e.target.value);
            }}
          />
        ) : (<>{render ? render(val) : val}</>) }
      </>
    ); 
  }

  if (!edit) return sanitizeHtml(value,{allowedTags: [], allowedAttributes: {}}) || ' ';

  return (
    <div><ContentEditable
      
      html={val}
      disabled={!edit}
      onChange={(e) => {
        let input = e.currentTarget.textContent;
        if( options?.maxChars && input.length > options.maxChars ) {
          input = input.substring(0, options.maxChars)
          update(input);
          setVal(input);
          return;
        }
        update(input);
        setVal(e.target.value);
      }}
    />
    { options?.maxChars ? (
      <div className="text-right"  style={{fontSize: '12px'}}>
        <Badge variant="secondary">max {options.maxChars} chars</Badge>
      </div>
    ) : null }
    </div>
  ); 
};

export default Editable;
