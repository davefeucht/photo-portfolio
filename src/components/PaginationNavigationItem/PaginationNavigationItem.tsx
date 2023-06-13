/** **************
* PaginationNavigationItem component displays one item of the pagination navigation
*************** */

import './PaginationNavigationItem.css';

import * as React from 'react';

interface PaginationNavigationItemProps {
    content: string,
    selectedState: string,
    navigationFunction(content: number): void,
    isLast: boolean
}

const PaginationNavigationItem: React.FC<PaginationNavigationItemProps> = ({
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

export default PaginationNavigationItem;
