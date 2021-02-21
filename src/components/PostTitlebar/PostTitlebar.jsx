/****************
* PostTitlebar component displays the titlebar for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import CloseButton from '../CloseButton/CloseButton.jsx';
import './PostTitlebar.css';

const PostTitlebar = observer(({ postTitle }) => {
  return(
    <div className="post-titlebar">
      <div className="title">{postTitle}</div>
      <CloseButton></CloseButton>
    </div>
  )
});

PostTitlebar.displayName = 'PostTitlebar';

export default PostTitlebar;