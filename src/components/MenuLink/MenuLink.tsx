/** ***************
* MenuLink component implements the a link in the menu of the application
**************** */

import './MenuLink.css';

import * as React from 'react';
import { Link } from 'react-router-dom';

interface MenuLinkProps {
    href: string,
    text: string
}

const MenuLink: React.FC<MenuLinkProps> = ({ href, text }) => {
    return (
        <Link to={`${href}`}>
            <div className="menu-link">{text}</div>
        </Link>
    );
};

MenuLink.displayName = 'MenuLink';

export default MenuLink;
