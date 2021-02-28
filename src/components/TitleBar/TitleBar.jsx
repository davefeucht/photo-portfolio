/*****************
* TitleBar component implements the title bar of the application
*****************/

import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import './TitleBar.css';

const TitleBar = ({ stateStore, api }) => {
  useEffect(() => {
    api.getSiteInfo();
  });

  return (
    <div className='title-bar'>
      <div>
        <h1>{stateStore.siteInfo.siteName}</h1>
      </div>
    </div>
  );
};

TitleBar.displayName = 'TitleBar';

export default observer(TitleBar);