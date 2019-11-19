/*****************
* TitleBar component implements the title bar of the application
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import './TitleBar.css';

const TitleBar = observer(({ siteName }) => {
    return (
      <div className='title-bar'>
        <div>
          <h1>{siteName}</h1>
        </div>
      </div>
    );
});

TitleBar.displayName = 'TitleBar';

export default TitleBar;