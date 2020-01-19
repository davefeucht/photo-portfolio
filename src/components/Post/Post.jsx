/****************
* Post component displays one individual Post
****************/

import React from "react";
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import './Post.css';

const Post = observer(({ stateStore, id, category, categoryName, title, image, api, context }) => {
  const _showAllPosts = () => {
    runInAction(() => {
      stateStore.setShowAllPosts(true);
    })
  }
    
  let divStyle = {backgroundImage: "url(" + stateStore.visiblePost.fullImageUrl + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "contain"};
  let classList = "post";

  return(
    <div className={classList} style={divStyle} onClick={_showAllPosts.bind(this)}>
    </div>
  );
});

Post.displayName = 'Post';

export default Post;