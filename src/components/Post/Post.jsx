/****************
* Post component displays one individual Post in a modal
****************/

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import PostFooter from '../PostFooter/PostFooter.jsx';
import './Post.css';

const Post = observer(({ stateStore, api }) => {

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

      return rect;
  }

  const getPostPosition = (screenWidth, screenHeight, postWidth, postHeight) => {
    const position = {};
    position.left = `${(screenWidth - postWidth) / 2}px`;
    position.top = `${(screenHeight - postHeight) / 2}px`;

    return position;
  }

  const setPostRect = (image) => {
    const screenWidth = stateStore.applicationRoot.clientWidth;
    const screenHeight = stateStore.applicationRoot.clientHeight;
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

  const closeModal = () => {
    runInAction(() => {
      stateStore.setShowModal(false);
    })
  }

  useEffect(() => {
    const image = document.createElement('img');
    image.onload = () => {
      setPostRect(image);
    }
    if (stateStore.visiblePost.fullImageUrl !== null) {
      image.src = stateStore.visiblePost.fullImageUrl;
    }
    window.addEventListener("resize", setPostRect.bind(this, image));
    return () => {
      window.removeEventListener("resize", setPostRect);
    }
  }, [stateStore.visiblePost.fullImageUrl]);
    
  const div = <div className="post-background">
                <div className="post">
                  <PostTitlebar title={stateStore.visiblePost.postTitle} closeFunction={closeModal}></PostTitlebar>
                  <PostImage stateStore={stateStore} api={api}></PostImage>
                  <PostFooter stateStore={stateStore}></PostFooter>
                </div>
              </div>

  return(
    ReactDOM.createPortal(
      div,
      stateStore.modalDiv
    )
  );
});

Post.displayName = 'Post';

export default Post;