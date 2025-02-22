/** **************
* PaginationNavigation component displays the navigation for pagination of items
*************** */

import './PaginationNavigation.css';

import PaginationNavigationItem from 'components/PaginationNavigationItem/PaginationNavigationItem';
import * as React from 'react';

interface PaginationNavigationProps {
    totalPages: number,
    currentPageIndex: number,
    navigationFunction(content: number): void
}

const prepNavigationItems = (totalPages: number, currentPageIndex: number) => {
    const navigationItems = [];
    for (let i = 0; i < totalPages; i++) {
        navigationItems.push({
            content: `${i + 1}`,
            selectedState: i === (currentPageIndex - 1) ? 'selected' : 'deselected'
        });
    }

    return navigationItems;
};

const PaginationNavigation: React.FC<PaginationNavigationProps> = ({ totalPages, currentPageIndex, navigationFunction }) => {
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

export default PaginationNavigation;
