import React from 'react';

const LeftPanel = ({ variant, children, padding = '10px' }) => {
  const style = {
    padding: padding,
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

export default LeftPanel;
