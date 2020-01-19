/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import { runInAction } from "mobx";
import { observer } from 'mobx-react';
import './PostThumbnail.css';

const PostThumbnail = observer(({ stateStore, id, title, index }) => {
  const _showFullPost = () => {
    runInAction(() => {
      stateStore.setVisiblePost(id, title);
      stateStore.setShowAllPosts(false);
    });
  }

  const divStyle = {backgroundImage: "url(" + (stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : "") + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover"};

  return(
    <div className="post-thumbnail" style={divStyle} onClick={_showFullPost.bind(this)}></div>
  );
});

PostThumbnail.displayName = 'PostThumbnail';

export default PostThumbnail;