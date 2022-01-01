/*****************
* MenuLink component implements the a link in the menu of the application
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import './MenuLink.css';

const MenuLink = ({ href, text }) => {
    let { url } = useRouteMatch();
    return (
        <Link to={`${url}${href}`}>
            <div className="menu-link">{text}</div>
        </Link>
    );
};

MenuLink.displayName = 'MenuLink';

MenuLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default MenuLink;
