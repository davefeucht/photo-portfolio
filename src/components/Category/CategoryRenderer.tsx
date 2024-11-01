import Posts from 'components/Posts/Posts';
import SectionHeader from 'components/SectionHeader/SectionHeader';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Post, ScreenInfo } from 'utils/types';

interface Props {
    categoryId: number;
    maxItemsPerPage: number;
    categoryName?: string;
    currentCategoryPosts: Post[];
    screenInfo: ScreenInfo;
}

const CategoryRenderer: React.FC<Props> = ({
    categoryId,
    maxItemsPerPage,
    categoryName,
    currentCategoryPosts,
    screenInfo
}) => {
    return (
        <div className="category">
            <SectionHeader title={categoryName ?? ""} />
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

export default observer(CategoryRenderer);
