/** **************
* PaginationNavigation component displays the navigation for pagination of items
*************** */

import './PaginationNavigation.css';

import PropTypes from 'prop-types';
import React from 'react';

import PaginationNavigationItem from '../PaginationNavigationItem/PaginationNavigationItem.jsx';

const prepNavigationItems = (totalPages, currentPageIndex) => {
    const navigationItems = [];
    for (let i = 0; i < totalPages; i++) {
        navigationItems.push({
            content: `${i + 1}`,
            selectedState: i === (currentPageIndex - 1) ? 'selected' : 'deselected'
        });
    }

    return navigationItems;
};

const PaginationNavigation = ({ totalPages, currentPageIndex, navigationFunction }) => {
    return (
        <div className="pagination-navigation">
            <div className="pagination-navigation__content">
                {prepNavigationItems(totalPages, currentPageIndex).map((item, index, array) => {
                    return (
                        <PaginationNavigationItem
                            key={`pagination_navigation_${item.content}`}
                            content={item.content}
                            selectedState={item.selectedState}
                            navigationFunction={navigationFunction}
                            isLast={index === array.length - 1}
                        />
                    );
                })}
            </div>
        </div>
    );
};

PaginationNavigation.displayName = 'PaginationNavigation';

PaginationNavigation.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPageIndex: PropTypes.number.isRequired,
    navigationFunction: PropTypes.func.isRequired
};

export default PaginationNavigation;
