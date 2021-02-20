/****************
* Post component displays one individual Post in a modal
****************/

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { reaction, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { useParams, useHistory } from 'react-router-dom';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import PostFooter from '../PostFooter/PostFooter.jsx';
import './Post.css';

const Post = observer(({ stateStore, api }) => {
  const { postId } = useParams();
  const history = useHistory();

  const getPostInfo = () => {
    const parsedPostId = parseInt(postId);
    const currentPost = stateStore.currentCategoryPosts.filter(post => post.id === parsedPostId)[0];
    runInAction(() => {
      api.getPostImage(currentPost.featured_media);
      api.getTagNames(currentPost.tags);
      stateStore.setVisiblePost(parsedPostId, currentPost.title.rendered);
    });
  }

  const getPostSize = (screenWidth, screenHeight, imageWidth, imageHeight) => {
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
      
      rect.width = `${width}px`;
      rect.height = `${height}px`;

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

  const setPostRect = (image) => {
    const screenWidth = stateStore.screenInfo.width;
    const screenHeight = stateStore.screenInfo.height;
    const postElement = document.querySelector('.post');
    const imageElement = document.querySelector('.post-image > img');
    const backgroundElement = document.querySelector('.post-background');
    const rect = getPostSize(screenWidth, screenHeight, image.width, image.height);
    imageElement.style.width = rect.width;
    imageElement.style.height = rect.height;
    postElement.style.width = rect.width;
    backgroundElement.style.width = `${screenWidth}px`;
    backgroundElement.style.height = `${screenHeight}px`;

    const position = getPostPosition(screenWidth, screenHeight, postElement.clientWidth, postElement.clientHeight);
    postElement.style.left = position.left;
    postElement.style.top = position.top;
  }

  const closeModal = e => {
    e.stopPropagation();
    history.goBack();
  };

  useEffect(() => {
    getPostInfo();

    const image = document.createElement('img');
    image.onload = () => {
      setPostRect(image);
    }
    if (stateStore.visiblePost.fullImageUrl !== null) {
      image.src = stateStore.visiblePost.fullImageUrl;
    }
    
    const disposer = reaction(
      () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
      () => setPostRect(image)
    );
    return () => {
      disposer();
    }
  }, [stateStore.visiblePost.fullImageUrl]);
    
  const div = <div className="post-background">
                <div className="post">
                  <PostTitlebar postTitle={stateStore.visiblePost.postTitle} closeFunction={closeModal}></PostTitlebar>
                  <PostImage stateStore={stateStore} api={api}></PostImage>
                  <PostFooter stateStore={stateStore}></PostFooter>
                </div>
              </div>

  return(
    div
  );
});

Post.displayName = 'Post';

export default Post;