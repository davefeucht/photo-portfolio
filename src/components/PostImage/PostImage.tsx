/** **************
* PostImage component displays the image for a Post
*************** */

import './PostImage.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';

import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

interface PostImageProps {
    imageUrl: string,
    postHeight: number,
    previousPost: string,
    nextPost: string
}

const PostImage: React.FC<PostImageProps> = ({
    imageUrl,
    postHeight,
    previousPost,
    nextPost
}) => {
    const [arrowsVisible, setArrowsVisible] = useState<boolean>(false);

    const onMouseOverHandler = () => {
        setArrowsVisible(true);
    };

    const onMouseOutHandler = () => {
        setArrowsVisible(false);
    };

    return (
        <div className="post-image" onMouseOver={onMouseOverHandler.bind(this)} onMouseOut={onMouseOutHandler.bind(this)}>
            {arrowsVisible && <PostNavigationArrow postHeight={postHeight} direction="previous" postId={previousPost} />}
            <img src={imageUrl} />
            {arrowsVisible && <PostNavigationArrow postHeight={postHeight} direction="next" postId={nextPost} />}
        </div>
    );
};

PostImage.displayName = 'PostImage';

export default observer(PostImage);
