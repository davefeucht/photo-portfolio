/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import { observer } from 'mobx-react';
import { Link, useRouteMatch } from 'react-router-dom';
import './PostThumbnail.css';

const PostThumbnail = observer(({ stateStore, id, title, tags, index, image, api }) => {
  const divStyle = {backgroundImage: "url(" + (stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : "") + ")"};
  let { url } = useRouteMatch();

  return(
    <Link to={`${url}/posts/${id}`}>
      <div className="post-thumbnail" style={divStyle}></div>
    </Link>
  );
});

PostThumbnail.displayName = 'PostThumbnail';

export default PostThumbnail;