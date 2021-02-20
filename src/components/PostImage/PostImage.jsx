/****************
* PostImage component displays the image for a Post
****************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow.js';
import './PostImage.css';

const PostImage = observer(({ stateStore, api }) => {
  const onMouseOverHandler = () => {
    const arrows = document.querySelectorAll('.post-navigation-arrow');
    arrows.forEach(arrow => {
      arrow.style.opacity = 1;
    })
  }

  return(
    <div className="post-image" onMouseOver={onMouseOverHandler.bind(this)}>
      <PostNavigationArrow stateStore={stateStore} direction="previous" api={api}></PostNavigationArrow>
      <img src={stateStore.visiblePost.fullImageUrl}></img>
      <PostNavigationArrow stateStore={stateStore} direction="next" api={api}></PostNavigationArrow>
    </div>
  )
});

PostImage.displayName = 'PostImage';

export default PostImage;