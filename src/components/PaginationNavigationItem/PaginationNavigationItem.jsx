/****************
* PaginationNavigationItem component displays one item of the pagination navigation
****************/

import React from "react";
import PropTypes from 'prop-types';
import './PaginationNavigationItem.css';

const PaginationNavigationItem = ({ content, selectedState, navigationFunction, isLast }) => {
    return (
        <div 
            className={`pagination-navigation__item ${selectedState}`} 
            onClick={navigationFunction ? () => navigationFunction(parseInt(content)) : undefined}
        >
            {content}{!isLast ? ' • ' : ''}
        </div>
    )
};

PaginationNavigationItem.displayName = 'PaginationNavigationItem';

PaginationNavigationItem.propTypes = {
    content: PropTypes.string.isRequired,
    selectedState: PropTypes.string.isRequired,
    navigationFunction: PropTypes.func,
    isLast: PropTypes.bool.isRequired
};

export default PaginationNavigationItem;
