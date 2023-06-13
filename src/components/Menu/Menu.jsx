/** ***************
* Menu component implements the menu of the application
**************** */

import './Menu.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import MenuLink from '../MenuLink/MenuLink.jsx';

const Menu = ({ stateStore }) => {
    const {
        menuState, toggleMenuState, categoryList, pages
    } = stateStore;
    return (
        <div className={`menu ${menuState}`}>
            <ul>
                <li onClick={() => toggleMenuState()}>
                    <MenuLink href="" text="Home" />
                </li>
                <li>
                    Categories
                    <ul>
                        {categoryList.map(category => {
                            return (
                                <li key={`li_${category.name}_${category.id}`} onClick={() => toggleMenuState()}><MenuLink key={`${category.name}_${category.id}`} href={`category/${category.id}`} text={category.name} /></li>
                            );
                        })}
                    </ul>
                </li>
                <li>
                    Info
                    <ul>
                        {pages.map(page => {
                            return (
                                <li key={`li_${page.title.rendered}`} onClick={() => toggleMenuState()}><MenuLink key={`${page.title.rendered}_${page.id}`} href={`page/${page.id}`} text={page.title.rendered} /></li>
                            );
                        })}
                    </ul>
                </li>
            </ul>
        </div>
    );
};

Menu.displayName = 'Menu';

Menu.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(Menu);
