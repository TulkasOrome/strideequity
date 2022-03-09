import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Api from '../../utils/apiCall';

const SettingsFields = ({ settings }) => {
  const save = async () => {
    const res = await Api.post('settings', {value, key});
  };

  return (
    <div>
      { settings.map((s) => (
        <div>
          <Form.Control value={s.key} /><Form.Control value={s.value} />
        </div>
      )) }
      Add a new setting
      <Form.Control /><Form.Control /><Button>Create setting</Button>
    </div>
  );
};

export default SettingsFields;
