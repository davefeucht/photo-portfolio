/****************
* PostFooter component displays the footer for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import CloseButton from '../CloseButton/CloseButton.jsx';
import './PostFooter.css';

const PostFooter = observer(({ stateStore }) => {
  return(
    <div className="post-footer">
      <div className="labels">{stateStore.visiblePost.tagNames.join(', ')}</div>
    </div>
  )
});

PostFooter.displayName = 'PostFooter';

export default PostFooter;