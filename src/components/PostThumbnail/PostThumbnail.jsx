/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import './PostThumbnail.css';

const PostThumbnail = observer(({ stateStore, id, index }) => {
  const divStyle = {backgroundImage: "url(" + (stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : "") + ")"};
  const { url } = useRouteMatch();
  const location = useLocation();

  return(
    <Link to={{
      pathname: `${url}/post/${id}`,
      state: { background: location }
    }}>
      <div className="post-thumbnail" style={divStyle}></div>
    </Link>
  );
});

PostThumbnail.displayName = 'PostThumbnail';

export default PostThumbnail;