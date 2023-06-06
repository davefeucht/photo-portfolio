/** **************
* PostImage component displays the image for a Post
*************** */

import './PostImage.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow.jsx';

function PostImage({ stateStore, previousPost, nextPost }) {
    const onMouseOverHandler = () => {
        const arrows = document.querySelectorAll('.post-navigation-arrow');
        arrows.forEach(arrow => {
            const isDisabled = arrow.classList.contains('disabled');
            if (isDisabled) {
                arrow.style.opacity = 0.5;
            } else {
                arrow.style.opacity = 1;
            }
        });
    };

    const onMouseOutHandler = () => {
        const arrows = document.querySelectorAll('.post-navigation-arrow');
        arrows.forEach(arrow => {
            arrow.style.opacity = 0;
        });
    };

    return (
        <div className="post-image" onMouseOver={onMouseOverHandler.bind(this)} onMouseOut={onMouseOutHandler.bind(this)}>
            <PostNavigationArrow stateStore={stateStore} direction="previous" postId={previousPost} />
            <img src={stateStore.visiblePost.fullImageUrl} />
            <PostNavigationArrow stateStore={stateStore} direction="next" postId={nextPost} />
        </div>
    );
}

PostImage.displayName = 'PostImage';

PostImage.propTypes = {
    stateStore: PropTypes.object.isRequired,
    previousPost: PropTypes.number,
    nextPost: PropTypes.number
};

PostImage.defaultProps = {
    previousPost: null,
    nextPost: null
};

export default observer(PostImage);
