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
import {
    Post as PostState,
    ScreenInfo,
    SiteInfo,
    VisiblePost
} from '../../utils/types';
import PostFooter from '../PostFooter/PostFooter';
import PostImage from '../PostImage/PostImage';
import PostTitlebar from '../PostTitlebar/PostTitlebar';

const image = document.createElement('img');

interface PostProps {
    screenInfo: ScreenInfo,
    siteInfo: SiteInfo,
    visiblePost: VisiblePost,
    currentCategoryPosts: PostState[],
    clearVisiblePostTagNames: () => void,
    setCurrentPost: (a: PostState, b: string[], c: string) => void
}

const Post: React.FC<PostProps> = ({
    screenInfo,
    siteInfo,
    visiblePost,
    currentCategoryPosts,
    clearVisiblePostTagNames,
    setCurrentPost
}) => {
    const { categoryId, postId } = useParams();
    const navigate = useNavigate();
    let element: HTMLElement = null;
    // Create ref here and pass to PostImage
    // Create state for imageHeight
    // In image.onload(), update imageHeight with ref.current.clientHeight

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const updateImage = () => {
        setPostRect(image, screenInfo.width, screenInfo.height, visiblePost);
    };

    image.onload = () => {
        updateImage();
    };

    useEffect(() => {
        let tagNames: string[] = [];
        let url = '';
        clearVisiblePostTagNames();
        getPost(parseInt(postId), siteInfo.siteUrl)
            .then((post: PostState) => {
                return post;
            })
            .then((newPost: PostState) => {
                getTagNames(newPost.tags, siteInfo.siteUrl)
                    .then(tags => {
                        tagNames = tags;
                    });
                getPostImage(newPost.featured_media, siteInfo.siteUrl)
                    .then((imageUrl: string) => {
                        url = imageUrl;
                        setCurrentPost(newPost, tagNames, url);
                    });
            });
    }, [postId]);

    useEffect(() => {
        if (visiblePost.fullImageUrl !== null && visiblePost.fullImageUrl !== undefined) {
            image.src = visiblePost.fullImageUrl;
        }

        element = document.querySelector('.post img');
        element.addEventListener('transitionend', updateImage, true);

        const disposer = reaction(
            () => [screenInfo.width, screenInfo.height],
            () => updateImage()
        );

        updateImage();

        return () => {
            element.removeEventListener('transitionend', updateImage);
            disposer();
        };
    }, [visiblePost.fullImageUrl]);

    return (
        <div className="post-background" onClick={closeModalHandler}>
            <div className="post" onClick={stopPropagation}>
                <PostTitlebar postTitle={visiblePost.postTitle} />
                <PostImage
                    imageUrl={visiblePost.fullImageUrl}
                    previousPost={getPreviousPost(parseInt(postId), currentCategoryPosts)}
                    nextPost={getNextPost(parseInt(postId), currentCategoryPosts)}
                />
                <PostFooter tagNames={visiblePost.tagNames} />
            </div>
        </div>
    );
};

Post.displayName = 'Post';

export default observer(Post);
