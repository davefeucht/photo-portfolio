/****************
* PostTitlebar component displays the titlebar for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import './PostTitlebar.css';

const PostTitlebar = observer(({ stateStore, id, title, index, image, api }) => {
  return(
    <div className="post-titlebar">{title}</div>
  )
});

PostTitlebar.displayName = 'PostTitlebar';

export default PostTitlebar;