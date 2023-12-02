/** ***************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
**************** */

import './Categories.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Category, ScreenInfo, SiteInfo } from '../../utils/types';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail';
import PaginationNavigation from '../PaginationNavigation/PaginationNavigation';

interface CategoriesProps {
    maxItemsPerPage: number,
    screenInfo: ScreenInfo,
    categoryList: Category[]
}

const Categories: React.FC<CategoriesProps> = ({
    maxItemsPerPage,
    screenInfo,
    categoryList
}) => {
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(1);

    const startIndex = (currentPageIndex - 1) * maxItemsPerPage;
    const endIndex = startIndex + maxItemsPerPage;

    const setRows = () => {
        const numberOfColumns = parseInt(document.body.style.getPropertyValue('--number-of-columns')) || 1;
        const numberOfCategories = maxItemsPerPage;
        document.body.style.setProperty('--number-of-rows', `${numberOfCategories / numberOfColumns}`);
    };

    useEffect(() => {
        setRows();
    }, [screenInfo.width, screenInfo.height]);

    return (
        <div className="category-list">
            {categoryList.slice(startIndex, endIndex)
                .map(category => {
                    return (<CategoryThumbnail key={category.id.toString()} id={category.id} name={category.name} />);
                })}
            <PaginationNavigation totalPages={categoryList.length / maxItemsPerPage} currentPageIndex={currentPageIndex} navigationFunction={(content: number) => { setCurrentPageIndex(content); }} />
        </div>
    );
};

Categories.displayName = 'Categories';

export default observer(Categories);
