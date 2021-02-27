/****************
* PostImage component displays the image for a Post
****************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow.js';
import './PostImage.css';

const PostImage = observer(({ stateStore, previousPost, nextPost, api }) => {
  return(
    <div className="post-image">
      <PostNavigationArrow stateStore={stateStore} direction="previous" postId={previousPost}></PostNavigationArrow>
      <img src={stateStore.visiblePost.fullImageUrl}></img>
      <PostNavigationArrow stateStore={stateStore} direction="next" postId={nextPost}></PostNavigationArrow>
    </div>
  )
});

PostImage.displayName = 'PostImage';

export default PostImage;