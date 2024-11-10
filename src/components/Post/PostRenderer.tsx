import PostFooter from 'components/PostFooter/PostFooter';
import PostImage from 'components/PostImage/PostImage';
import PostTitlebar from 'components/PostTitlebar/PostTitlebar';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScreenInfo, VisiblePost } from 'utils/types';

interface Props {
    onClose(): void;
    onImageLoad(image: HTMLImageElement, imageHeight: number): void;
    imageHeight: number;
    previousPost: number;
    nextPost: number;
    screenInfo: ScreenInfo;
    visiblePost: VisiblePost;
}

const image = document.createElement('img');

const PostRenderer: React.FC<Props> = ({
    onClose,
    onImageLoad,
    imageHeight,
    previousPost,
    nextPost,
    screenInfo,
    visiblePost
}) => {
    const imageRef = useRef<HTMLImageElement>(null);

    const onLoad = () => {
        onImageLoad(image, imageRef.current?.clientHeight ?? 0);
    }

    image.onload = onLoad

    useEffect(() => {
        onImageLoad(image, imageRef.current?.clientHeight ?? 0);
    }, [screenInfo.width, screenInfo.height]);

    useEffect(() => {
        if (visiblePost.fullImageUrl) {
            image.src = visiblePost.fullImageUrl;
        }

        if (imageRef.current) {
            imageRef.current.addEventListener('transitionend', onLoad, true);
        }

        onLoad();

        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener('transitionend', onLoad);
            }
            // disposer();
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
