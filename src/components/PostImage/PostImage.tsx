/** **************
* PostImage component displays the image for a Post
*************** */

import './PostImage.css';

import PostNavigationArrow from 'components/PostNavigationArrow/PostNavigationArrow';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';

interface PostImageProps {
    imageUrl: string,
    previousPost: number,
    nextPost: number
}

const PostImage: React.FC<PostImageProps> = ({
    imageUrl,
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
        <div className="post-image" onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler}>
            {arrowsVisible && <PostNavigationArrow direction="previous" postId={previousPost} />}
            <img
                src={imageUrl}
                width={window.innerWidth * 0.70}
            />
            {arrowsVisible && <PostNavigationArrow direction="next" postId={nextPost} />}
        </div>
    );
};

PostImage.displayName = 'PostImage';

export default observer(PostImage);
