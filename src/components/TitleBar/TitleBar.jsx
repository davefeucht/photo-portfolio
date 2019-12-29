/*****************
* TitleBar component implements the title bar of the application
*****************/

import React, { useEffect } from 'react';
import axios from 'axios';
import { observer } from 'mobx-react';
import './TitleBar.css';
import { runInAction } from 'mobx';

const TitleBar = observer(({ stateStore }) => {
  useEffect(() => {
    _fetchSiteData();
  });

  const _fetchSiteData = () => {
    const getSiteInformationURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then((response) => {
        runInAction(() => {
          stateStore.setSiteName(response.data.name);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  };

  return (
    <div className='title-bar'>
      <div>
        <h1>{stateStore.siteInfo.siteName}</h1>
      </div>
    </div>
  );
});

TitleBar.displayName = 'TitleBar';

export default TitleBar;