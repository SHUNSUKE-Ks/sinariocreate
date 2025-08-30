import React from 'react';

const HomeHeader = ({ title, subtitle }) => {
  return (
    <div className="panel header-panel">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {/* Actions and rightSlot can be added here later */}
    </div>
  );
};

export default HomeHeader;