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
    console.log(post);

    runInAction(() => {
      stateStore.setVisiblePost(post.id, post.title.rendered);
      api.getPostImage(post.featured_media);
      api.getTagNames(post.tags);
    })
  }

  const divStyle = direction === 'previous' ? { left: 0 } : { right: 0 };

  return(
    <div className="post-navigation-arrow" style={divStyle} onClick={clickHandler.bind(this)}>
      <div className="arrow">{direction === 'previous' ? '<' : '>'}</div>
    </div>
  );
});

PostNavigationArrow.displayName = 'PostNavigationArrow';

export default PostNavigationArrow;