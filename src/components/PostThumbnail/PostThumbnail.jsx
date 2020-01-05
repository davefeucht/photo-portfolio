/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import './PostThumbnail.css';

const PostThumbnail = observer(({ stateStore, id, index, image, api }) => {
  const _showFullPost = (event) => {
    event.preventDefault();
  }

  const divStyle = {backgroundImage: "url(" + (stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : "") + ")", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundSize: "cover"};

  return(
    <div className="post-thumbnail" style={divStyle} onClick={_showFullPost.bind(this)}></div>
  );
});

PostThumbnail.displayName = 'PostThumbnail';

export default PostThumbnail;