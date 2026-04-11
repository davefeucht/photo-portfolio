import Posts from 'components/Posts/Posts';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Post } from 'utils/types';

interface Props {
    currentCategoryPosts: Post[];
    currentCategoryName: string;
}

const CategoryRenderer: React.FC<Props> = ({
    currentCategoryPosts,
    currentCategoryName
}) => {
    return (
        <div className="category" aria-label={currentCategoryName}>
            <Posts
                currentCategoryPosts={currentCategoryPosts}
            />
            <Outlet />
        </div>
    );
};

export default observer(CategoryRenderer);
