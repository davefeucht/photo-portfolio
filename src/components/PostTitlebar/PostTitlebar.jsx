/** **************
* PostTitlebar component displays the titlebar for a Post
*************** */

import './PostTitlebar.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import CloseButton from '../CloseButton/CloseButton.jsx';

function PostTitlebar({ postTitle }) {
    return (
        <div className="post-titlebar">
            <div className="title">{postTitle}</div>
            <CloseButton />
        </div>
    );
}

PostTitlebar.displayName = 'PostTitlebar';

PostTitlebar.propTypes = {
    postTitle: PropTypes.string.isRequired
};

export default observer(PostTitlebar);
