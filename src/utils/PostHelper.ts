import { runInAction } from 'mobx';

import {
    Post,
    VisiblePost
} from './types';

export const getNextPost = (postId: number, currentCategoryPosts: Post[]) => {
    const currentIndex = currentCategoryPosts.findIndex(post => post.id === postId);
    const nextIndex = currentIndex + 1;
    const numberOfPosts = currentCategoryPosts.length;
    if (nextIndex >= numberOfPosts) {
        return -1;
    }
    const nextId = currentCategoryPosts[currentIndex + 1].id;
    return nextId;
};

export const getPreviousPost = (postId: number, currentCategoryPosts: Post[]) => {
    const currentIndex = currentCategoryPosts.findIndex(post => post.id === postId);
    const previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
        return -1;
    }
    const previousId = currentCategoryPosts[currentIndex - 1].id;
    return previousId;
};

const getPostSize = (screenWidth: number, screenHeight: number, imageWidth: number, imageHeight: number) => {
    const postTitlebar = document.querySelector('.post-titlebar');
    const postFooter = document.querySelector('.post-footer');
    const screenAspectRatio = screenWidth / screenHeight;
    const aspectRatio = imageWidth / imageHeight;
    const rect = {
        width: 0,
        height: 0,
        image_height: 0
    };
    let width = 0;
    let height = 0;
    if (screenAspectRatio >= 1) {
        height = screenAspectRatio < 1.7 ? screenHeight * 0.8 : screenHeight * 0.7;
        width = height * aspectRatio;
    } else {
        width = screenWidth * 0.8;
        height = width / aspectRatio;
    }

    rect.width = width;
    rect.image_height = height;
    rect.height = (postTitlebar && postFooter) ? height + postTitlebar.clientHeight + postFooter.clientHeight : 0;

    return rect;
};

const getPostPosition = (screenWidth: number, screenHeight: number, postWidth: number, postHeight: number) => {
    const position = {
        left: '0px',
        top: '0px'
    };
    position.left = `${(screenWidth - postWidth) / 2}px`;
    position.top = `${(screenHeight - postHeight) / 2}px`;

    return position;
};

export const setPostRect = (image: HTMLImageElement, screenWidth: number, screenHeight: number, visiblePost: VisiblePost) => {
    const postElement = document.querySelector('.post') as HTMLElement;
    const imageElement = document.querySelector('.post-image > img') as HTMLElement;
    const backgroundElement = document.querySelector('.post-background') as HTMLElement;
    const rect = getPostSize(screenWidth, screenHeight, image.width, image.height);
    runInAction(() => {
        visiblePost.width = rect.width;
        visiblePost.height = rect.height;
    });
    imageElement.style.width = `${rect.width}px`;
    imageElement.style.height = `${rect.image_height}px`;
    postElement.style.width = `${rect.width}px`;
    backgroundElement.style.width = `${screenWidth}px`;
    backgroundElement.style.height = `${screenHeight}px`;

    const position = getPostPosition(screenWidth, screenHeight, rect.width, rect.height);
    postElement.style.left = position.left;
    postElement.style.top = position.top;
};
