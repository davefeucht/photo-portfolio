/*****************
* Menu component implements the menu of the application
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import MenuLink from '../MenuLink/MenuLink.jsx';
import './Menu.css';

const Menu = ({ stateStore }) => {
    const { menuState, toggleMenuState, categoryList } = stateStore;
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
                            )
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
