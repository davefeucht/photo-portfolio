/** ***************
* TitleBar component implements the title bar of the application
**************** */

import './TitleBar.css';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import { StoreContext } from 'utils/StoreContext';
import { Store } from 'utils/types';

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
        <AppBar className="title-bar" position="static">
            <Toolbar>
                <IconButton
                    className={`hamburger-button ${menuState}`}
                    onClick={toggleMenu}
                    aria-label="hamburger-button"
                    size="large"
                    edge="start"
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {store.siteInfo.siteName}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

TitleBar.displayName = 'TitleBar';

export default observer(TitleBar);
