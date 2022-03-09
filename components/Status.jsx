import React from 'react';
import { Dropdown, Badge } from 'react-bootstrap';

const variant = (status) => ({ 
  draft: 'info', 
  submitted: 'primary', 
  pending: 'primary', 
  active: 'success',
  confirmed: 'success',
  published: 'success',
  preview: 'info',
  finished: 'warning',
  archived: 'secondary',
  rejected: 'secondary',
  canceled: 'secondary', 
}[status || 'submitted']);

const Status = ({ status }) => <Badge variant={variant(status)}>{status || 'submitted'}</Badge>;

const StatusSelect = ({
  statusList, selected, onChange, render, size, variant,
}) => (
  <Dropdown drop="up" style={{ display: 'inline' }}>
    <Dropdown.Toggle size={size} variant={variant || 'outline-info'}>
      <Status status={selected} />
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {statusList.map((s) => (
        <Dropdown.Item 
          key={s}
          onClick={() => onChange(s)}
        >{s}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

Status.Select = StatusSelect;

export default Status;
