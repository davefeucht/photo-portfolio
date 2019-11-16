/*****************
* TitleBar component implements the title bar of the application
*****************/

import React from 'react';
import { observer } from 'mobx-react';
import './TitleBar.css';

const TitleBar = observer((props) => {
    return (
      <div className='title-bar'>
        <div>
          <h1>{props.siteName}</h1>
        </div>
      </div>
    );
});

TitleBar.displayName = 'TitleBar';

export default TitleBar;