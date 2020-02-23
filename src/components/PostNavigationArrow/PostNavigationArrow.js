/****************
* PostNavigationArrow component displays a navigation arrow for a Post
****************/

import React from "react";
import { runInAction } from "mobx";
import { observer } from 'mobx-react';
import './PostNavigationArrow.css';

const PostNavigationArrow = observer(({ stateStore, direction, api }) => {
  const clickHandler = () => {
    const currentIndex = stateStore.currentCategoryPosts.findIndex(post => post.id === stateStore.visiblePost.postId);
    const numberOfPosts = stateStore.currentCategoryPosts.length;
    let nextIndex = direction === 'previous' ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0) {
      nextIndex = numberOfPosts - 1;
    }
    if (nextIndex > numberOfPosts - 1) {
      nextIndex = 0;
    }
    const post = stateStore.currentCategoryPosts[nextIndex];

    runInAction(() => {
      stateStore.setVisiblePost(post.id, post.title.rendered);
      api.getPostImage(post.featured_media);
      api.getTagNames(post.tags);
    })
  }

  //TODO: calc this based on a height variable, not just a hard-coded 41
  const top = stateStore.visiblePost.height ? (stateStore.visiblePost.height / 2) - (41) : 0;
  const divStyle = direction === 'previous' ? { top: `${top}px`, left: '0px' } : { top: `${top}px`, right: '0px' };
  const imgSrc = direction === 'previous' ? './images/arrow-left.png' : './images/arrow-right.png';

  return(
    <div className="post-navigation-arrow" style={divStyle} onClick={clickHandler.bind(this)}>
      <div className="arrow"><img src={imgSrc} /></div>
    </div>
  );
});

PostNavigationArrow.displayName = 'PostNavigationArrow';

export default PostNavigationArrow;