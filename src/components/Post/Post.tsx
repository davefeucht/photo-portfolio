/** **************
* Post component displays one individual Post in a modal
*************** */

import './Post.css';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
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
    const [imageHeight, setImageHeight] = useState<number>(0);
    const { categoryId = '-1', postId = '-1' } = useParams();
    const navigate = useNavigate();
    const imageRef = useRef<HTMLImageElement>(null);

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
        setImageHeight(imageRef.current?.clientHeight ?? 0);
    };

    useEffect(() => {
        let tagNames: string[] = [];
        let url = '';
        if (postId) {
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
        }
    }, [postId]);

    useEffect(() => {
        if (visiblePost.fullImageUrl) {
            image.src = visiblePost.fullImageUrl;
        }

        if (imageRef.current) {
            imageRef.current.addEventListener('transitionend', updateImage, true);
        }

        const disposer = reaction(
            () => [screenInfo.width, screenInfo.height],
            () => updateImage()
        );

        updateImage();

        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener('transitionend', updateImage);
            }
            disposer();
        };
    }, [visiblePost.fullImageUrl]);

    return (
        <div className="post-background" onClick={closeModalHandler}>
            <div className="post" onClick={stopPropagation}>
                <PostTitlebar postTitle={visiblePost.postTitle} />
                <PostImage
                    imageUrl={visiblePost.fullImageUrl}
                    imageHeight={imageHeight}
                    previousPost={getPreviousPost(parseInt(postId), currentCategoryPosts)}
                    nextPost={getNextPost(parseInt(postId), currentCategoryPosts)}
                    ref={imageRef}
                />
                <PostFooter tagNames={visiblePost.tagNames} />
            </div>
        </div>
    );
};

Post.displayName = 'Post';

export default observer(Post);
