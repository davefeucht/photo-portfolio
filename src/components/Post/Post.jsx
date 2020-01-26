/****************
* Post component displays one individual Post in a modal
****************/

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import './Post.css';

const Post = observer(({ stateStore, id, category, categoryName, title, image, api, context }) => {

  useEffect(() => {
    const image = document.createElement('img');
    image.onload = () => {
      const postElement = document.querySelector('.post');
      postElement.style.height = `${image.height}px`
      postElement.style.width = `${image.width}px`
    }
    image.src = stateStore.visiblePost.fullImageUrl;
  }, [stateStore.visiblePost.fullImageUrl]);
  
  const _closeModal = () => {
    runInAction(() => {
      stateStore.setShowModal(false);
    })
  }
    
  const div = <div className="post-background">
                <div className="post">
                  <PostTitlebar title={title} closeFunction={_closeModal}></PostTitlebar>
                  <PostImage stateStore={stateStore}></PostImage>
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