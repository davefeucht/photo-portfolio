/** ***************
* MenuLink component implements the a link in the menu of the application
**************** */
import './MenuLink.css';

import { Typography } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface MenuLinkProps {
    href: string;
    text: string;
    onClick?(): void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, text, onClick }) => {
    return (
        <Link onClick={() => onClick && onClick()} to={`${href}`}>
            <Typography className="menu-link">{text}</Typography>
        </Link>
    );
};

MenuLink.displayName = 'MenuLink';

export default MenuLink;
