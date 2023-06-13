/** ***************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
**************** */

import './Categories.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Store } from '../../utils/types';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail';
import PaginationNavigation from '../PaginationNavigation/PaginationNavigation';

interface CategoriesProps {
    stateStore: Store
}

const Categories: React.FC<CategoriesProps> = ({ stateStore }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);

    const startIndex = (currentPageIndex - 1) * stateStore.maxItemsPerPage;
    const endIndex = startIndex + stateStore.maxItemsPerPage;

    const setRows = () => {
        const numberOfColumns = parseInt(document.body.style.getPropertyValue('--number-of-columns'));
        const numberOfCategories = stateStore.maxItemsPerPage;
        document.body.style.setProperty('--number-of-rows', `${numberOfCategories / numberOfColumns}`);
    };

    useEffect(() => {
        setRows();
    }, [stateStore.screenInfo.width, stateStore.screenInfo.height]);

    return (
        <div className="category-list">
            {stateStore.categoryList.slice(startIndex, endIndex)
                .map(category => {
                    return (<CategoryThumbnail key={category.id.toString()} id={category.id} name={category.name} stateStore={stateStore} />);
                })}
            <PaginationNavigation totalPages={stateStore.categoryList.length / stateStore.maxItemsPerPage} currentPageIndex={currentPageIndex} navigationFunction={(content: number) => { setCurrentPageIndex(content); }} />
        </div>
    );
};

Categories.displayName = 'Categories';

export default observer(Categories);
