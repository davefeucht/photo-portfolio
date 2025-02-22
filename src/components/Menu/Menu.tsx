/** ***************
* Menu component implements the menu of the application
**************** */

import CloseIcon from '@mui/icons-material/Close';
import { Box, Divider, Drawer, IconButton, List, ListItem, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Store } from '../../utils/types';
import MenuLink from '../MenuLink/MenuLink';

interface MenuProps {
    stateStore: Store
}

const Menu: React.FC<MenuProps> = ({ stateStore }) => {
    const {
        menuState, toggleMenuState, categoryList, pages
    } = stateStore;

    return (
        <Drawer
            open={menuState === 'open'}
            onClose={toggleMenuState}
            elevation={10}
            PaperProps={{
                sx: { backgroundColor: "rgb(54, 54, 54)" }
            }}
        >
            <Box sx={{ width: "250px" }} role="presentation">
                <List>
                    <ListItem sx={{ justifyContent: "flex-end" }}>
                        <IconButton onClick={toggleMenuState}>
                            <CloseIcon color="secondary" />
                        </IconButton>
                    </ListItem>
                    <ListItem onClick={() => toggleMenuState()}>
                        <MenuLink href="" text="Home" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Typography color="secondary" variant='h6'>Categories</Typography>
                    </ListItem>
                    {categoryList.map(category => {
                        return (
                            <ListItem key={`${category.name}_${category.id}`}>
                                <MenuLink href={`category/${category.id}`} text={category.name} />
                            </ListItem>
                        )
                    })}
                    <Divider />
                    <ListItem>
                        <Typography color="secondary" variant='h6'>Info</Typography>
                    </ListItem>
                    {pages.map(page => {
                        return (
                            <ListItem key={`${page.title.rendered}_${page.id}`}>
                                <MenuLink href={`page/${page.id}`} text={page.title.rendered} />
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </Drawer>
    );
};

Menu.displayName = 'Menu';

export default observer(Menu);
