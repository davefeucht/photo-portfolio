/*****************
* Posts component displays a list of Posts
*****************/

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import PostThumbnail from '../PostThumbnail/PostThumbnail.jsx';
import PaginationNavigation from '../PaginationNavigation/PaginationNavigation.jsx';
import './Posts.css';

const Posts = ({ stateStore }) => {
    const [currentPageIndex, setCurrentPageIndex] = useState(1);
    const [currentPosts, setCurrentPosts] = useState([]);
    
    const setRows = () => {
        const numberOfColumns = document.body.style.getPropertyValue('--number-of-columns');
        const numberOfPosts = stateStore.maxItemsPerPage;
        document.body.style.setProperty('--number-of-rows', numberOfPosts / numberOfColumns);
    };
    
    useEffect(() => {
        const startIndex = (currentPageIndex - 1) * stateStore.maxItemsPerPage;
        const endIndex = startIndex + stateStore.maxItemsPerPage;
        const posts = stateStore.currentCategoryPosts.slice(startIndex, endIndex);
        setCurrentPosts(posts);
    }, [stateStore.currentCategoryPosts, currentPageIndex]);

    useEffect(() => {
        setRows();
        const disposer = reaction(
            () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
            () => setRows()
        );
        return () => {
            disposer();
        }
    }, [stateStore.screenInfo.width, stateStore.screenInfo.height]);

    return (
        <div className="posts">
            {currentPosts.map((post, index) => {
                return (<PostThumbnail key={post.id.toString()} stateStore={stateStore} id={post.id} title={post.title.rendered} tags={post.tags} index={index} image={post.featured_media} />);
            })}
            <PaginationNavigation totalPages={stateStore.currentCategoryPosts.length / stateStore.maxItemsPerPage} currentPageIndex={currentPageIndex} navigationFunction={content => {setCurrentPageIndex(content)}} />
        </div>
    );
};

Posts.displayName = 'Posts';

Posts.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(Posts);
