/** ***************
* TitleBar component implements the title bar of the application
**************** */

import './TitleBar.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { StoreContext } from 'utils/StoreContext';

import { Store } from '../../utils/types';

const TitleBar: React.FC = () => {
    const store = useContext(StoreContext) as Store;
    const { menuState } = store;

    const toggleMenu = () => {
        store.setMenuState(store.menuState === 'closed' ? 'open' : 'closed');
    };

    useEffect(() => {
        store.getSiteInfo();
    }, []);

    return (
        <div className="title-bar">
            <div className={`hamburger-button ${menuState}`} onClick={toggleMenu}>
                <img src="./assets/images/hamburger_icon.svg" style={{ border: 0 }} />
            </div>
            <div>
                <h1>{store.siteInfo.siteName}</h1>
            </div>
        </div>
    );
};

TitleBar.displayName = 'TitleBar';

export default observer(TitleBar);
