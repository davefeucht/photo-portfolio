/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import { runInAction } from "mobx";
import { observer } from 'mobx-react';
import './PostThumbnail.css';

const PostThumbnail = observer(({ stateStore, id, title, tags, index, image, api }) => {
  const _showFullPost = () => {
    runInAction(() => {
      api.getPostImage(image);
      api.getTagNames(tags);
      stateStore.setVisiblePost(id, title);
      stateStore.setShowModal(true);
    });
  }

  const divStyle = {backgroundImage: "url(" + (stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : "") + ")"};

  return(
    <div className="post-thumbnail" style={divStyle} onClick={_showFullPost.bind(this)}></div>
  );
});

PostThumbnail.displayName = 'PostThumbnail';

export default PostThumbnail;