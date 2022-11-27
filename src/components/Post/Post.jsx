/****************
* Post component displays one individual Post in a modal
****************/

import React, { useEffect } from "react";
import PropTypes from 'prop-types';
import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getPostInfo,
    getNextPost,
    getPreviousPost,
    setPostRect
} from '../../utils/PostHelper';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import PostFooter from '../PostFooter/PostFooter.jsx';
import './Post.css';

const image = document.createElement('img');

const Post = ({ stateStore }) => {
    const { categoryId, postId } = useParams();
    const parsedPostId = parseInt(postId);
    const navigate = useNavigate();
    let element = null;

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    const stopPropagation = e => {
        e.stopPropagation();
    }

    const updateImage = () => {
        setPostRect(image, stateStore.screenInfo.width, stateStore.screenInfo.height, stateStore);
    };

    image.onload = () => {
        updateImage();
    }

    useEffect(() => {
        getPostInfo(postId, stateStore);
    }, [postId]);

    useEffect(() => {
        if (stateStore.visiblePost.fullImageUrl !== null && stateStore.visiblePost.fullImageUrl !== undefined) {
            image.src = stateStore.visiblePost.fullImageUrl;
        }

        element = document.querySelector('.post img');
        element.addEventListener('transitionend', updateImage, true);

        const disposer = reaction(
            () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
            () => updateImage()
        );

        return () => {
            element.removeEventListener('transitionend', updateImage);
            disposer();
        }
    }, [stateStore.visiblePost.fullImageUrl]);

    return (
        <div className="post-background" onClick={closeModalHandler}>
            <div className="post" onClick={stopPropagation}>
                <PostTitlebar postTitle={stateStore.visiblePost.title && stateStore.visiblePost.title.rendered}></PostTitlebar>
                <PostImage
                    stateStore={stateStore}
                    previousPost={getPreviousPost(parsedPostId, stateStore.currentCategoryPosts)}
                    nextPost={getNextPost(parsedPostId, stateStore.currentCategoryPosts)}>
                </PostImage>
                <PostFooter stateStore={stateStore}></PostFooter>
            </div>
        </div>
    );
};

Post.displayName = 'Post';

Post.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(Post);
