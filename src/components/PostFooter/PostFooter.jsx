/****************
* PostTitlebar component displays the titlebar for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import CloseButton from '../CloseButton/CloseButton.jsx';
import './PostFooter.css';

const PostFooter = observer(({ stateStore }) => {
  let tags = '';
  if (stateStore.visiblePost.tags) {
    tags = stateStore.visiblePost.tags.join(', ');
  }
  return(
    <div className="post-footer">
      <div className="labels">{tags}</div>
    </div>
  )
});

PostFooter.displayName = 'PostFooter';

export default PostFooter;