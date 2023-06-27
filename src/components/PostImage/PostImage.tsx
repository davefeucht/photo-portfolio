/** **************
* PostImage component displays the image for a Post
*************** */

import './PostImage.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useCallback, useRef, useState } from 'react';

import PostNavigationArrow from '../PostNavigationArrow/PostNavigationArrow';

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
    const [imageHeight, setImageHeight] = useState<number>(0);
    const imageRef = useRef(null);

    const updateImageHeight = useCallback((element: HTMLElement) => {
        imageRef.current = element;
        if (element) {
            setImageHeight(element.getBoundingClientRect().height);
        }
    }, []);

    const onMouseOverHandler = () => {
        setArrowsVisible(true);
    };

    const onMouseOutHandler = () => {
        setArrowsVisible(false);
    };

    return (
        <div className="post-image" onMouseOver={onMouseOverHandler.bind(this)} onMouseOut={onMouseOutHandler.bind(this)}>
            {arrowsVisible && <PostNavigationArrow imageHeight={imageHeight} direction="previous" postId={previousPost} />}
            <img ref={updateImageHeight} src={imageUrl} />
            {arrowsVisible && <PostNavigationArrow imageHeight={imageHeight} direction="next" postId={nextPost} />}
        </div>
    );
};

PostImage.displayName = 'PostImage';

export default observer(PostImage);
