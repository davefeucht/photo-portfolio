/** **************
* PostImage component displays the image for a Post
*************** */

import './PostImage.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { forwardRef, useState } from 'react';

import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

interface PostImageProps {
    imageUrl: string,
    imageHeight: number,
    previousPost: number,
    nextPost: number,
    ref: React.ForwardedRef<HTMLImageElement>
}

const PostImage: React.FC<PostImageProps> = forwardRef(({
    imageUrl,
    imageHeight,
    previousPost,
    nextPost
}, ref) => {
    const [arrowsVisible, setArrowsVisible] = useState<boolean>(false);

    const onMouseOverHandler = () => {
        setArrowsVisible(true);
    };

    const onMouseOutHandler = () => {
        setArrowsVisible(false);
    };

    return (
        <div className="post-image" onMouseOver={onMouseOverHandler.bind(this)} onMouseOut={onMouseOutHandler.bind(this)}>
            {arrowsVisible && <PostNavigationArrow imageHeight={imageHeight} direction="previous" postId={previousPost} />}
            <img ref={ref} src={imageUrl} />
            {arrowsVisible && <PostNavigationArrow imageHeight={imageHeight} direction="next" postId={nextPost} />}
        </div>
    );
});

PostImage.displayName = 'PostImage';

export default observer(PostImage);
