/** ***************
* Posts component displays a list of Posts
**************** */

import './Posts.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

import { Store } from '../../utils/types';
import PaginationNavigation from '../PaginationNavigation/PaginationNavigation';
import PostThumbnail from '../PostThumbnail/PostThumbnail';

interface PostsProps {
    stateStore: Store
}

const Posts: React.FC<PostsProps> = ({ stateStore }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    const startIndex = (currentPageIndex - 1) * stateStore.maxItemsPerPage;
    const endIndex = startIndex + stateStore.maxItemsPerPage;

    const setRows = () => {
        const numberOfColumns = parseInt(document.body.style.getPropertyValue('--number-of-columns'));
        const numberOfPosts = stateStore.maxItemsPerPage;
        document.body.style.setProperty('--number-of-rows', `${numberOfPosts / numberOfColumns}`);
    };

    useEffect(() => {
        setRows();
    }, [stateStore.screenInfo.width, stateStore.screenInfo.height]);

    return (
        <div className="posts">
            {stateStore.currentCategoryPosts.slice(startIndex, endIndex)
                .map((post, index) => {
                    return (<PostThumbnail key={post.id.toString()} stateStore={stateStore} id={post.id} index={index + startIndex} />);
                })}
            <PaginationNavigation totalPages={stateStore.currentCategoryPosts.length / stateStore.maxItemsPerPage} currentPageIndex={currentPageIndex} navigationFunction={content => { setCurrentPageIndex(content); }} />
        </div>
    );
};

Posts.displayName = 'Posts';

export default observer(Posts);
