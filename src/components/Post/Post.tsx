/** **************
* Post component displays one individual Post in a modal
*************** */

import './Post.css';

import { reaction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';

import {
    getNextPost,
    getPreviousPost,
    setPostRect
} from '../../utils/PostHelper';
import { Store } from '../../utils/types';
import PostFooter from '../PostFooter/PostFooter';
import PostImage from '../PostImage/PostImage';
import PostTitlebar from '../PostTitlebar/PostTitlebar';

const image = document.createElement('img');

const Post: React.FC = () => {
    const [imageHeight, setImageHeight] = useState<number>(0);
    const { categoryId = '-1', postId = '-1' } = useParams();
    const navigate = useNavigate();
    const imageRef = useRef<HTMLImageElement>(null);
    const store = useContext(StoreContext) as Store;

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    const stopPropagation = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const updateImage = () => {
        setPostRect(image, store.screenInfo.width, store.screenInfo.height, store.visiblePost);
    };

    image.onload = () => {
        updateImage();
        setImageHeight(imageRef.current?.clientHeight ?? 0);
    };

    useEffect(() => {
        if (postId) {
            store.clearVisiblePostTagNames();
            store.getPost(parseInt(postId));
        }
    }, [postId]);

    useEffect(() => {
        if (store.visiblePost.fullImageUrl) {
            image.src = store.visiblePost.fullImageUrl;
        }

        if (imageRef.current) {
            imageRef.current.addEventListener('transitionend', updateImage, true);
        }

        const disposer = reaction(
            () => [store.screenInfo.width, store.screenInfo.height],
            () => updateImage()
        );

        updateImage();

        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener('transitionend', updateImage);
            }
            disposer();
        };
    }, [store.visiblePost.fullImageUrl]);

    return (
        <div className="post-background" onClick={closeModalHandler}>
            <div className="post" onClick={stopPropagation}>
                <PostTitlebar postTitle={store.visiblePost.postTitle} />
                <PostImage
                    imageUrl={store.visiblePost.fullImageUrl}
                    imageHeight={imageHeight}
                    previousPost={getPreviousPost(parseInt(postId), store.currentCategoryPosts)}
                    nextPost={getNextPost(parseInt(postId), store.currentCategoryPosts)}
                    ref={imageRef}
                />
                <PostFooter tagNames={store.visiblePost.tagNames} />
            </div>
        </div>
    );
};

Post.displayName = 'Post';

export default observer(Post);
