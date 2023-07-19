/** ***************
* TitleBar component implements the title bar of the application
**************** */

import './TitleBar.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';

import { ApiContext } from '../../utils/ApiContext';
import { API, Store } from '../../utils/types';

interface TitleBarProps {
    stateStore: Store
}

const TitleBar: React.FC<TitleBarProps> = ({ stateStore }) => {
    const { menuState } = stateStore;
    const api = useContext(ApiContext) as API;
    const { getSiteInfo } = api;

    const toggleMenu = () => {
        stateStore.setMenuState(stateStore.menuState === 'closed' ? 'open' : 'closed');
    };

    useEffect(() => {
        getSiteInfo()
            .then(siteName => {
                stateStore.setSiteName(siteName);
                document.title = siteName;
            });
    }, []);

    return (
        <div className="title-bar">
            <div className={`hamburger-button ${menuState}`} onClick={toggleMenu}>
                <img src="./assets/images/hamburger_icon.svg" style={{ border: 0 }} />
            </div>
            <div>
                <h1>{stateStore.siteInfo.siteName}</h1>
            </div>
        </div>
    );
};

TitleBar.displayName = 'TitleBar';

export default observer(TitleBar);
