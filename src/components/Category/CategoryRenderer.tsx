import Posts from 'components/Posts/Posts';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Post } from 'utils/types';

interface Props {
    currentCategoryPosts: Post[];
}

const CategoryRenderer: React.FC<Props> = ({
    currentCategoryPosts
}) => {
    return (
        <div className="category">
            <Posts
                currentCategoryPosts={currentCategoryPosts}
            />
            <Outlet />
        </div>
    );
};

export default observer(CategoryRenderer);
