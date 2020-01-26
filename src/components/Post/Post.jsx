/****************
* Post component displays one individual Post in a modal
****************/

import React from "react";
import ReactDOM from "react-dom";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import PostTitlebar from '../PostTitlebar/PostTitlebar.jsx';
import './Post.css';

const Post = observer(({ stateStore, id, category, categoryName, title, image, api, context }) => {
  const _closeModal = () => {
    runInAction(() => {
      stateStore.setShowModal(false);
    })
  }
    
  const modalStyle = {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 10};
  const divStyle = {width: '80%', height: '80%'}; 
  const imageStyle = {backgroundImage: "url(" + stateStore.visiblePost.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain"};
  const classList = "post";
  const div = <div style={modalStyle} onClick={_closeModal.bind(this)}>
                <div className={classList} style={divStyle}>
                  <PostTitlebar title={title}></PostTitlebar>

                </div>
                <div className={classList} style={divStyle} onClick={_closeModal.bind(this)}></div>;
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