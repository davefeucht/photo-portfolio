/** **************
* PostImage component displays the image for a Post
*************** */

import './PostImage.css';

import PostNavigationArrow from 'components/PostNavigationArrow/PostNavigationArrow';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect, useState } from 'react';

interface PostImageProps {
    imageUrl: string;
    previousPost: number;
    nextPost: number;
}

const PostImage: React.FC<PostImageProps> = ({
    imageUrl,
    previousPost,
    nextPost
}) => {
    const [arrowsVisible, setArrowsVisible] = useState<boolean>(false);
    const [orientation, setOrientation] = useState<OrientationType>(screen.orientation.type);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [height, setHeight] = useState<number>(window.innerHeight);

    const onMouseOverHandler = () => {
        setArrowsVisible(true);
    };

    const onMouseOutHandler = () => {
        setArrowsVisible(false);
    };

    const calculateOrientation = (event: Event) => {
        const target = event.target as ScreenOrientation;
        setOrientation(target.type);
    }

    const getScreenDimensions = (event: Event) => {
        const target = event.target as Window;
        setHeight(target.innerHeight);
        setWidth(target.innerWidth);
    }

    useEffect(() => {
        screen.orientation.addEventListener("change", calculateOrientation);
        window.addEventListener("resize", getScreenDimensions);

        return () => {
            screen.orientation.removeEventListener("change", calculateOrientation);
            window.removeEventListener("resize", getScreenDimensions);
        }
    }, []);

    return (
        <div className="post__image" aria-label="Post Image" onMouseOver={onMouseOverHandler} onMouseOut={onMouseOutHandler}>
            {arrowsVisible && <PostNavigationArrow direction="previous" postId={previousPost} />}
            {orientation.includes("portrait") && (
                <img
                    src={imageUrl}
                    width={width * 0.80}
                />
            )}
            {orientation.includes("landscape") && (
                <img
                    src={imageUrl}
                    height={height * 0.80}
                />
            )}
            {arrowsVisible && <PostNavigationArrow direction="next" postId={nextPost} />}
        </div>
    );
};

PostImage.displayName = 'PostImage';

export default observer(PostImage);
