import React from 'react';

const Toast = ({ message, duration = 3000, position = 'bottom', onClose }) => {
  if (!message) return null;

  const styles = {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: '5px',
    zIndex: 1000,
  };

  if (position === 'top') {
    styles.top = '20px';
  } else {
    styles.bottom = '20px';
  }

  setTimeout(() => {
    onClose();
  }, duration);

  return <div style={styles}>{message}</div>;
};

export default Toast;
