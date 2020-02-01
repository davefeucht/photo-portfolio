/****************
* PostImage component displays the image for a Post
****************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import './PostImage.css';

const PostImage = observer(({ stateStore }) => {
  return(
    <div className="post-image">
      <img src={stateStore.visiblePost.fullImageUrl}></img>
    </div>
  )
});

PostImage.displayName = 'PostImage';

export default PostImage;