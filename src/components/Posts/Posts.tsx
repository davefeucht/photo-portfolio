/** ***************
* Posts component displays a list of Posts
**************** */

import './Posts.css';

import PaginationNavigation from 'components/PaginationNavigation/PaginationNavigation';
import PostThumbnail from 'components/PostThumbnail/PostThumbnail';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Post as PostState, ScreenInfo } from 'utils/types';

interface PostsProps {
    maxItemsPerPage: number,
    screenInfo: ScreenInfo,
    categoryId: number,
    currentCategoryPosts: PostState[]
}

const Posts: React.FC<PostsProps> = ({
    maxItemsPerPage,
    screenInfo,
    categoryId,
    currentCategoryPosts
}) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    const startIndex = (currentPageIndex - 1) * maxItemsPerPage;
    const endIndex = startIndex + maxItemsPerPage;

    const setRows = () => {
        const numberOfColumns = parseInt(document.body.style.getPropertyValue('--number-of-columns')) || 1;
        const numberOfPosts = maxItemsPerPage;
        document.body.style.setProperty('--number-of-rows', `${numberOfPosts / numberOfColumns}`);
    };

    useEffect(() => {
        setCurrentPageIndex(1);
    }, [categoryId]);

    useEffect(() => {
        setRows();
    }, [screenInfo.width, screenInfo.height]);

    return (
        <div className="posts">
            {currentCategoryPosts.slice(startIndex, endIndex)
                .map((post, index) => {
                    return (<PostThumbnail key={post.id.toString()} id={post.id} thumbnailImage={currentCategoryPosts[startIndex + index].thumbnail_image} />);
                })}
            <PaginationNavigation
                totalPages={currentCategoryPosts.length / maxItemsPerPage}
                currentPageIndex={currentPageIndex}
                navigationFunction={content => { setCurrentPageIndex(content); }}
            />
        </div>
    );
};

Posts.displayName = 'Posts';

export default observer(Posts);
