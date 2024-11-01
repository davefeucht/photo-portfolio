import PostFooter from 'components/PostFooter/PostFooter';
import PostImage from 'components/PostImage/PostImage';
import PostTitlebar from 'components/PostTitlebar/PostTitlebar';
import { reaction } from 'mobx';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { setPostRect } from 'utils/PostHelper';
import { ScreenInfo, VisiblePost } from 'utils/types';

interface Props {
    onClose(): void;
    previousPost: number;
    nextPost: number;
    screenInfo: ScreenInfo;
    visiblePost: VisiblePost;
}

const image = document.createElement('img');

const PostRenderer: React.FC<Props> = ({
    onClose,
    previousPost,
    nextPost,
    screenInfo,
    visiblePost
}) => {
    const [imageHeight, setImageHeight] = useState<number>(0);
    const imageRef = useRef<HTMLImageElement>(null);

    const updateImage = () => {
        setPostRect(image, screenInfo.width, screenInfo.height, visiblePost);
    };

    image.onload = () => {
        updateImage();
        setImageHeight(imageRef.current?.clientHeight ?? 0);
    };

    useEffect(() => {
        if (visiblePost.fullImageUrl) {
            image.src = visiblePost.fullImageUrl;
        }

        if (imageRef.current) {
            imageRef.current.addEventListener('transitionend', updateImage, true);
        }

        const disposer = reaction(
            () => [screenInfo.width, screenInfo.height],
            () => updateImage()
        );

        updateImage();

        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener('transitionend', updateImage);
            }
            disposer();
        };
    }, [visiblePost.fullImageUrl]);

    return (
        <div className="post-background" onClick={onClose}>
            <div className="post" onClick={event => event.stopPropagation()}>
                <PostTitlebar postTitle={visiblePost.postTitle} />
                <PostImage
                    imageUrl={visiblePost.fullImageUrl}
                    imageHeight={imageHeight}
                    previousPost={previousPost}
                    nextPost={nextPost}
                    ref={imageRef}
                />
                <PostFooter tagNames={visiblePost.tagNames} />
            </div>
        </div>
    );
};

export default PostRenderer;
