/*****************
* TitleBar component implements the title bar of the application
*****************/

import React, { useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import './TitleBar.css';

const TitleBar = observer(({ stateStore }) => {
  useEffect(() => {
    _fetchSiteData();
  });

  const _fetchSiteData = () => {
    const getSiteInformationURI = `https://${stateStore.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then((response) => {
        stateStore.setSiteName(response.data.name);
      })
      .catch(error => {
        console.warn(error.message);
      });
  };

  return (
    <div className='title-bar'>
      <div>
        <h1>{stateStore.siteName}</h1>
      </div>
    </div>
  );
});

TitleBar.displayName = 'TitleBar';

export default TitleBar;