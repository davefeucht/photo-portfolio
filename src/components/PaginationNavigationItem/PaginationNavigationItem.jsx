/****************
* PaginationNavigationItem component displays one item of the pagination navigation
****************/

import React from "react";
import PropTypes from 'prop-types';
import './PaginationNavigationItem.css';

const PaginationNavigationItem = ({ content, selectedState, navigationFunction }) => {
    return (
        <div className={`pagination-navigation__item ${selectedState}`} onClick={navigationFunction ? () => navigationFunction(parseInt(content)) : undefined}>{content}</div>
    )
};

PaginationNavigationItem.displayName = 'PaginationNavigationItem';

PaginationNavigationItem.propTypes = {
    content: PropTypes.string.isRequired,
    selectedState: PropTypes.string.isRequired,
    navigationFunction: PropTypes.func
};

export default PaginationNavigationItem;
