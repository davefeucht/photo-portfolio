/****************
* PostFooter component displays the footer for a Post
****************/

import React from "react";
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import './PostFooter.css';

const PostFooter = ({ stateStore }) => {
    console.log(stateStore.visiblePost.tagNames);
    return (
        <div className="post-footer">
            <div className="labels">{stateStore.visiblePost.tagNames.join(', ')}</div>
        </div>
    )
};

PostFooter.displayName = 'PostFooter';

PostFooter.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(PostFooter);
