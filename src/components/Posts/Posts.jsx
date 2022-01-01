/*****************
* Posts component displays a list of Posts
*****************/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import PostThumbnail from '../PostThumbnail/PostThumbnail.jsx';
import './Posts.css';

const Posts = ({ stateStore, api }) => {
    const setRows = () => {
        const numberOfColumns = document.body.style.getPropertyValue('--number-of-columns');
        const numberOfPosts = stateStore.currentCategoryPosts.length;
        document.body.style.setProperty('--number-of-rows', numberOfPosts / numberOfColumns);
    };

    useEffect(() => {
        setRows();
        const disposer = reaction(
            () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
            () => setRows()
        );
        return () => {
            disposer();
        }
    });

    //If we are showing all posts, then map the list of posts to a list of PostThumbnail components
    const postList = stateStore.currentCategoryPosts.map((post, index) => {
        return (<PostThumbnail key={post.id.toString()} stateStore={stateStore} id={post.id} title={post.title.rendered} tags={post.tags} index={index} image={post.featured_media} api={api} />);
    });

    return (
        <div className="posts">
            {postList}
        </div>
    );
};

Posts.displayName = 'Posts';

Posts.propTypes = {
    stateStore: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
};

export default observer(Posts);
