/****************
* Post component displays one individual Post in a modal
****************/

import React from "react";
import ReactDOM from "react-dom";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import PostImage from '../PostImage/PostImage.jsx';
import './Post.css';

const Post = observer(({ stateStore, id, category, categoryName, title, image, api, context }) => {
  const _closeModal = () => {
    runInAction(() => {
      stateStore.setShowModal(false);
    })
  }
    
  const div = <div className="post-background" onClick={_closeModal.bind(this)}>
                <div className="post">
                  <PostTitlebar title={title}></PostTitlebar>
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