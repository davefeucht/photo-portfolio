/****************
* PostTitlebar component displays the titlebar for a Post
****************/

import React from "react";
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import CloseButton from '../CloseButton/CloseButton.jsx';
import './PostTitlebar.css';

const PostTitlebar = ({ postTitle }) => {
  return(
    <div className="post-titlebar">
      <div className="title">{postTitle}</div>
      <CloseButton></CloseButton>
    </div>
  )
};

PostTitlebar.displayName = 'PostTitlebar';

PostTitlebar.propTypes = {
  postTitle: PropTypes.string
};

export default observer(PostTitlebar);