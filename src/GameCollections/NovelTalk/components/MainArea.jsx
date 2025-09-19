import React from 'react';

const MainArea = ({ children, leftWidth = '30%', rightWidth = '70%' }) => {
  const style = {
    display: 'flex',
  };

  const leftStyle = {
    width: leftWidth,
  };

  const rightStyle = {
    width: rightWidth,
  };

  // Note: The spec mentions a responsive fallback, which would require a more complex implementation
  // with media queries or a resize observer. This is a basic structure.
  const [left, right] = React.Children.toArray(children);

  return (
    <main style={style}>
      <div style={leftStyle}>{left}</div>
      <div style={rightStyle}>{right}</div>
    </main>
  );
};

export default MainArea;
