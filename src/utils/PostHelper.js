import { runInAction } from 'mobx';

export const getPostInfo = (postId, api) => {
    const parsedPostId = parseInt(postId);
    runInAction(() => {
        api.getPost(parsedPostId);
    });
}

export const getNextPost = (postId, currentCategoryPosts) => {
    const currentIndex = currentCategoryPosts.findIndex(post => post.id === postId);
    const nextIndex = currentIndex + 1;
    const numberOfPosts = currentCategoryPosts.length;
    if (nextIndex >= numberOfPosts) {
        return null;
    }
    const nextId = currentCategoryPosts[currentIndex + 1].id;
    return nextId;
}

export const getPreviousPost = (postId, currentCategoryPosts) => {
    const currentIndex = currentCategoryPosts.findIndex(post => post.id === postId);
    const previousIndex = currentIndex - 1;
    if (previousIndex < 0) {
        return null;
    }
    const previousId = currentCategoryPosts[currentIndex - 1].id;
    return previousId;
}

const getPostSize = (screenWidth, screenHeight, imageWidth, imageHeight, stateStore) => {
    const postTitlebar = document.querySelector('.post-titlebar');
    const postFooter = document.querySelector('.post-footer');
    const screenAspectRatio = screenWidth / screenHeight;
    const aspectRatio = imageWidth / imageHeight;
    const rect = {};
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
    rect.height = height + postTitlebar.clientHeight + postFooter.clientHeight;

    runInAction(() => {
        stateStore.visiblePost.width = width;
        stateStore.visiblePost.height = height;
    })

    return rect;
}

const getPostPosition = (screenWidth, screenHeight, postWidth, postHeight) => {
    const position = {};
    position.left = `${(screenWidth - postWidth) / 2}px`;
    position.top = `${(screenHeight - postHeight) / 2}px`;

    return position;
}

export const setPostRect = (image, screenWidth, screenHeight, stateStore) => {
    const postElement = document.querySelector('.post');
    const imageElement = document.querySelector('.post-image > img');
    const backgroundElement = document.querySelector('.post-background');
    const rect = getPostSize(screenWidth, screenHeight, image.width, image.height, stateStore);
    imageElement.style.width = `${rect.width}px`;
    imageElement.style.height = `${rect.image_height}px`;
    postElement.style.width = `${rect.width}px`;
    backgroundElement.style.width = `${screenWidth}px`;
    backgroundElement.style.height = `${screenHeight}px`;

    const position = getPostPosition(screenWidth, screenHeight, rect.width, rect.height);
    postElement.style.left = position.left;
    postElement.style.top = position.top;
}
