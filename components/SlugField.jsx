

import React from 'react';
import slugify from 'slugify';
import {
   FormControl, InputGroup, 
} from 'react-bootstrap';


const SlugField = ({slug, update, path = ''}) => {
  return (
  <InputGroup style={{width:'500px',margin: '0 auto'}} >
  <InputGroup.Text>https://strideequity.com.au/{path}</InputGroup.Text>
    <FormControl 
      type="text" 
      value={slug} 
      onChange={(e) => update(slugify(e.target.value))}
    />
    </InputGroup>
  )}

  export default SlugField;
