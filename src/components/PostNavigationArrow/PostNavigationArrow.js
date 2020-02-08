/****************
* PostNavigationArrow component displays a navigation arrow for a Post
****************/

import React from "react";
import { runInAction } from "mobx";
import { observer } from 'mobx-react';
import './PostNavigationArrow.css';

const PostNavigationArrow = observer(({ stateStore, direction }) => {

  const divStyle = direction === 'previous' ? { left: 0 } : { right: 0 };

  return(
    <div className="post-navigation-arrow" style={divStyle}>
      <div className="arrow">{direction === 'previous' ? '<' : '>'}</div>
    </div>
  );
});

PostNavigationArrow.displayName = 'PostNavigationArrow';

export default PostNavigationArrow;