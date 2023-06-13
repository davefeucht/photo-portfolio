/** ***************
* TitleBar component implements the title bar of the application
**************** */

import './TitleBar.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { getSiteInfo } from '../../utils/Api';

const TitleBar = ({ stateStore }) => {
    const { menuState } = stateStore;

    const toggleMenu = () => {
        stateStore.setMenuState(stateStore.menuState === 'closed' ? 'open' : 'closed');
    };

    useEffect(() => {
        getSiteInfo(stateStore.siteInfo.siteUrl)
            .then(siteName => {
                stateStore.setSiteName(siteName);
                document.title = siteName;
            });
    }, []);

    return (
        <div className="title-bar">
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
