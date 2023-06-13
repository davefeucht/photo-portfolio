/** ***************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
**************** */

import './Categories.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail.jsx';
import PaginationNavigation from '../PaginationNavigation/PaginationNavigation.jsx';

const Categories = ({ stateStore }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    const startIndex = (currentPageIndex - 1) * stateStore.maxItemsPerPage;
    const endIndex = startIndex + stateStore.maxItemsPerPage;

    const setRows = () => {
        const numberOfColumns = document.body.style.getPropertyValue('--number-of-columns');
        const numberOfCategories = stateStore.maxItemsPerPage;
        document.body.style.setProperty('--number-of-rows', numberOfCategories / numberOfColumns);
    };

    useEffect(() => {
        setRows();
    }, [stateStore.screenInfo.width, stateStore.screenInfo.height]);

    return (
        <div className="category-list">
            {stateStore.categoryList.slice(startIndex, endIndex)
                .map((category, index) => {
                    return (<CategoryThumbnail key={category.id.toString()} id={category.id} index={index} name={category.name} stateStore={stateStore} />);
                })}
            <PaginationNavigation totalPages={stateStore.categoryList.length / stateStore.maxItemsPerPage} currentPageIndex={currentPageIndex} navigationFunction={content => { setCurrentPageIndex(content); }} />
        </div>
    );
};

Categories.propTypes = {
    stateStore: PropTypes.object.isRequired
};

Categories.displayName = 'Categories';

export default observer(Categories);
