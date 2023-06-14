/** **************
* Post component displays one individual Post in a modal
*************** */

import './Post.css';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getPost, getPostImage, getTagNames } from '../../utils/Api';
import {
    getNextPost,
    getPreviousPost,
    setPostRect
} from '../../utils/PostHelper';
import { Store } from '../../utils/types';
import PostFooter from '../PostFooter/PostFooter';
import PostImage from '../PostImage/PostImage';
import PostTitlebar from '../PostTitlebar/PostTitlebar';

const image = document.createElement('img');

interface PostProps {
    stateStore: Store
}

const Post: React.FC<PostProps> = ({ stateStore }) => {
    const { categoryId, postId } = useParams();
    const navigate = useNavigate();
    let element: HTMLElement = null;

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const updateImage = () => {
        setPostRect(image, stateStore.screenInfo.width, stateStore.screenInfo.height, stateStore);
    };

    image.onload = () => {
        updateImage();
    };

    useEffect(() => {
        stateStore.clearVisiblePostTagNames();
        getPost(parseInt(postId), stateStore.siteInfo.siteUrl)
            .then(post => {
                stateStore.setCurrentPost(post);
            })
            .then(() => {
                getTagNames(stateStore.visiblePost.tags, stateStore.siteInfo.siteUrl)
                    .then(tags => {
                        stateStore.setVisiblePostTags(tags);
                    });
                getPostImage(stateStore.visiblePost.featured_media, stateStore.siteInfo.siteUrl)
                    .then(imageUrl => {
                        stateStore.setVisiblePostImage(imageUrl);
                    });
            });
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
        };
    }, [stateStore.visiblePost.fullImageUrl]);

    return (
        <div className="post-background" onClick={closeModalHandler}>
            <div className="post" onClick={stopPropagation}>
                <PostTitlebar postTitle={stateStore.visiblePost.postTitle} />
                <PostImage
                    stateStore={stateStore}
                    previousPost={getPreviousPost(postId, stateStore.currentCategoryPosts)}
                    nextPost={getNextPost(postId, stateStore.currentCategoryPosts)}
                />
                <PostFooter stateStore={stateStore} />
            </div>
        </div>
    );
};

Post.displayName = 'Post';

export default observer(Post);
