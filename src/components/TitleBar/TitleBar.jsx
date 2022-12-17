/*****************
* TitleBar component implements the title bar of the application
*****************/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { getSiteInfo } from '../../utils/Api';

import './TitleBar.css';

const TitleBar = ({ stateStore }) => {
    const { menuState } = stateStore;

    const toggleMenu = () => {
        stateStore.setMenuState(stateStore.menuState === 'closed' ? 'open' : 'closed');
    }

    useEffect(() => {
        const siteInfo = getSiteInfo(stateStore);
        stateStore.setSiteName(siteInfo.name);
        document.title = siteInfo.name;
    }, []);

    return (
      <div className='title-bar'>
        <div className={`hamburger-button ${menuState}`} onClick={toggleMenu}>
            <img src="./assets/images/hamburger_icon.svg" border="0" />
        </div>
        <div>
            <h1>{stateStore.siteInfo.siteName}</h1>
        </div>
      </div>
    );
};

TitleBar.displayName = 'TitleBar';

TitleBar.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(TitleBar);
