import Posts from 'components/Posts/Posts';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Category, Post, ScreenInfo } from 'utils/types';

interface Props {
    categoryId: number;
    maxItemsPerPage: number;
    currentCategoryData: Category;
    currentCategoryPosts: Post[];
    screenInfo: ScreenInfo;
}

const CategoryRenderer: React.FC<Props> = ({
    categoryId,
    maxItemsPerPage,
    currentCategoryData,
    currentCategoryPosts,
    screenInfo
}) => {
    return (
        <div className="category">
            <SectionHeader title={currentCategoryData.name} />
            <Posts
                maxItemsPerPage={maxItemsPerPage}
                screenInfo={screenInfo}
                categoryId={categoryId}
                currentCategoryPosts={currentCategoryPosts}
            />
            <Outlet />
        </div>
    );
};

export default CategoryRenderer;
