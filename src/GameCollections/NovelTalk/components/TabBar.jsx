import React from 'react';

const TabBar = ({ tabs, activeTab, onTabClick, orientation = 'horizontal' }) => {
  const style = {
    display: 'flex',
    flexDirection: orientation === 'horizontal' ? 'row' : 'column',
    borderBottom: orientation === 'horizontal' ? '1px solid #ccc' : 'none',
    borderRight: orientation === 'vertical' ? '1px solid #ccc' : 'none',
  };

  const tabStyle = (key) => ({
    padding: '10px 15px',
    cursor: 'pointer',
    borderBottom: activeTab === key && orientation === 'horizontal' ? '2px solid #007bff' : 'none',
    borderRight: activeTab === key && orientation === 'vertical' ? '2px solid #007bff' : 'none',
    fontWeight: activeTab === key ? 'bold' : 'normal',
  });

  return (
    <nav style={style}>
      {tabs.map(tab => (
        <div key={tab.key} style={tabStyle(tab.key)} onClick={() => onTabClick(tab.key)}>
          {tab.label}
        </div>
      ))}
    </nav>
  );
};

export default TabBar;
