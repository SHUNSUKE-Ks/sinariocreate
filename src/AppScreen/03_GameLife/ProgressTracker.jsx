import React from 'react';

const ProgressTracker = () => {
  return (
    <div className="panel progress-tracker">
      <h3>進行状況</h3>
      <p>達成度: 50%</p>
      <div style={{ width: '100%', height: '20px', background: 'gray' }}>
        <div style={{ width: '50%', height: '100%', background: 'green' }}></div>
      </div>
    </div>
  );
};

export default ProgressTracker;