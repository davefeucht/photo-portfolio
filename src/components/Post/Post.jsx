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

const Post = observer(({ stateStore, title, tags }) => {

  const getPostRect = (imageWidth, imageHeight) => {
      const aspectRatio = imageWidth / imageHeight;
      const screenWidth = stateStore.applicationRoot.clientWidth;
      const screenHeight = stateStore.applicationRoot.clientHeight;
      const rect = {};
      let width = 0;
      let height = 0;
      width = screenWidth * 0.8;
      height = width / aspectRatio;
      
      if (height > screenHeight) {
        height = screenHeight * 0.8;
        width = height * aspectRatio;
      }

      rect.width = `${width}px`;
      rect.height = `${height}px`;
      rect.left = `${(screenWidth - width) / 2}px`;
      rect.top = `${(screenHeight - height) / 2}px`;

      return rect;
  }

  const setPostRect = (image) => {
    const postElement = document.querySelector('.post');
    const rect = getPostRect(image.width, image.height);
    postElement.style.width = rect.width;
    postElement.style.height = rect.height;
    postElement.style.left = rect.left;
    postElement.style.top = rect.top;
  }

  const _closeModal = () => {
    runInAction(() => {
      stateStore.setShowModal(false);
    })
  }

  useEffect(() => {
    const image = document.createElement('img');
    image.onload = () => {
      setPostRect(image);
    }
    image.src = stateStore.visiblePost.fullImageUrl;
    window.addEventListener("resize", setPostRect.bind(this, image));
    return () => {
      window.removeEventListener("resize", setPostRect);
    }
  }, [stateStore.visiblePost.fullImageUrl]);
    
  const div = <div className="post-background">
                <div className="post">
                  <PostTitlebar title={title} closeFunction={_closeModal}></PostTitlebar>
                  <PostImage stateStore={stateStore}></PostImage>
                  <PostFooter tags={tags}></PostFooter>
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