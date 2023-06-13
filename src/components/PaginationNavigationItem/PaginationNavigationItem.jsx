/** **************
* PaginationNavigationItem component displays one item of the pagination navigation
*************** */

import './PaginationNavigationItem.css';

import PropTypes from 'prop-types';
import React from 'react';

const PaginationNavigationItem = ({
    content, selectedState, navigationFunction, isLast
}) => {
    return (
        <div
            className={`pagination-navigation__item ${selectedState}`}
            onClick={navigationFunction ? () => navigationFunction(parseInt(content)) : undefined}
        >
            {content}
            {!isLast ? ' • ' : ''}
        </div>
    );
};

PaginationNavigationItem.displayName = 'PaginationNavigationItem';

PaginationNavigationItem.propTypes = {
    content: PropTypes.string.isRequired,
    selectedState: PropTypes.string.isRequired,
    navigationFunction: PropTypes.func.isRequired,
    isLast: PropTypes.bool.isRequired
};

export default PaginationNavigationItem;
