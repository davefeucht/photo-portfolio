/****************
* PostTitlebar component displays the titlebar for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import CloseButton from '../CloseButton/CloseButton.jsx';
import './PostFooter.css';

const PostFooter = observer(({ tags }) => {
  return(
    <div className="post-footer">
      <div className="labels">{tags.join(', ')}</div>
    </div>
  )
});

PostFooter.displayName = 'PostFooter';

export default PostFooter;