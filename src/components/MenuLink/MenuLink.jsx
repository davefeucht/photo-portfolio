/** ***************
* MenuLink component implements the a link in the menu of the application
**************** */

import './MenuLink.css';

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function MenuLink({ href, text }) {
    return (
        <Link to={`${href}`}>
            <div className="menu-link">{text}</div>
        </Link>
    );
}

MenuLink.displayName = 'MenuLink';

MenuLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default MenuLink;
