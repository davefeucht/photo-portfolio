/****************
* PostThumbnail component displays the thumbnail image for a Post
****************/

import React from "react";
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link, useLocation } from 'react-router-dom';
import './PostThumbnail.css';

const PostThumbnail = ({ stateStore, id, index }) => {
    const divStyle = { backgroundImage: "url(" + (stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : "") + ")" };
    const location = useLocation();

    return (
        <Link to={{
            pathname: `post/${id}`,
            state: { background: location }
        }}>
            <div className="post-thumbnail" style={divStyle}></div>
        </Link>
    );
};

PostThumbnail.displayName = 'PostThumbnail';

PostThumbnail.propTypes = {
    stateStore: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
};

export default observer(PostThumbnail);
