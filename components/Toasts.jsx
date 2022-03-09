import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  Toast,
} from 'react-bootstrap';
import Global from '../utils/globalEvents';

const Item = ({ notification, onRemove }) => {
  const [show, setShow] = useState(true);

  return (
    <Toast 
      onClose={() => {
        onRemove(notification.id);
        setShow(false);
      }} 
      show={show}
      animation
      delay={10000}
      style={{ width: '350px' }}
      autohide
    >
      <Toast.Header>
        <strong className="mr-auto">{notification.type}</strong>
        <small>{moment(notification.time).fromNow()}</small>
      </Toast.Header>
      <Toast.Body>{notification.msg}</Toast.Body>
    </Toast>
  );
};

const Toasts = () => {
  let count = 0;
  const [notifications, setNotifications] = useState([]);
  const onNotify = (e) => {
    count += 1;
    const notification = { ...e.detail, ...{ id: count } };
    setNotifications([...notifications, ...[notification]]);
  };

  useEffect(() => {
    Global.on('notify', onNotify);
    return () => Global.remove('notify', onNotify);
  }, []);
  
  const remove = (id) => setNotifications(notifications.filter((n) => id !== n.id));

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        zIndex: 99999,
        right: 0,
      }}
    >
      { notifications.map((item) => <Item key={item.id} notification={item} onRemove={remove} />) }
    </div>
  );
};
export default Toasts;
