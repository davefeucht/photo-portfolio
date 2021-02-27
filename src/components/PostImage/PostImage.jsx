/****************
* PostImage component displays the image for a Post
****************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow.js';
import './PostImage.css';

const PostImage = observer(({ stateStore, previousPost, nextPost }) => {
  const onMouseOverHandler = () => {	
    const arrows = document.querySelectorAll('.post-navigation-arrow');	
    arrows.forEach(arrow => {	
      const isDisabled = arrow.classList.contains('disabled');
      if (isDisabled) {
        arrow.style.opacity = 0.5;
      } else {
        arrow.style.opacity = 1;
      }
    })	
  };

  const onMouseOutHandler = () => {	
    const arrows = document.querySelectorAll('.post-navigation-arrow');	
    arrows.forEach(arrow => {	
      arrow.style.opacity = 0;	
    })	
  };

  return(
    <div className="post-image" onMouseOver={onMouseOverHandler.bind(this)} onMouseOut={onMouseOutHandler.bind(this)}>
      <PostNavigationArrow stateStore={stateStore} direction="previous" postId={previousPost}></PostNavigationArrow>
      <img src={stateStore.visiblePost.fullImageUrl}></img>
      <PostNavigationArrow stateStore={stateStore} direction="next" postId={nextPost}></PostNavigationArrow>
    </div>
  )
});

PostImage.displayName = 'PostImage';

export default PostImage;