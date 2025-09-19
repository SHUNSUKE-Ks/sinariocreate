import React from 'react';

const AppLayout = ({ header, tabBar, mainArea }) => {
  return (
    <div>
      {header}
      {tabBar}
      {mainArea}
    </div>
  );
};

export default AppLayout;
