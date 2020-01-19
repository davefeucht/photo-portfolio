/****************
* Post component displays one individual Post
****************/

import React from "react";
import ReactDOM from "react-dom";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import './Post.css';

const Post = observer(({ stateStore, id, category, categoryName, title, image, api, context }) => {
  const _showAllPosts = () => {
    runInAction(() => {
      stateStore.setShowModal(false);
    })
  }
    
  const divStyle = {backgroundImage: "url(" + stateStore.visiblePost.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain"};
  const classList = "post";
  const div = <div className={classList} style={divStyle} onClick={_showAllPosts.bind(this)}></div>;

  return(
    ReactDOM.createPortal(
      div,
      stateStore.modalDiv
    )
  );
});

Post.displayName = 'Post';

export default Post;