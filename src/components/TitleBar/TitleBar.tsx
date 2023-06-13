/** ***************
* TitleBar component implements the title bar of the application
**************** */

import './TitleBar.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';

import { getSiteInfo } from '../../utils/Api';
import { Store } from '../../utils/types';

interface TitleBarProps {
    stateStore: Store
}

const TitleBar: React.FC<TitleBarProps> = ({ stateStore }) => {
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
