/** **************
* Post component displays one individual Post in a modal
*************** */

import './Post.css';

import PostRenderer from 'components/Post/PostRenderer';
import { observer } from 'mobx-react';
import * as React from 'react';
import {
    useContext,
    useEffect,
    useState
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getNextPost,
    getPreviousPost,
    setPostRect
} from 'utils/PostHelper';
import { StoreContext } from 'utils/StoreContext';
import { Store } from 'utils/types';


const Post: React.FC = () => {
    const [imageHeight, setImageHeight] = useState<number>(0);

    const { categoryId = '-1', postId = '-1' } = useParams();
    const navigate = useNavigate();
    const store = useContext(StoreContext) as Store;

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    const updateImage = (image: HTMLImageElement, imageHeight: number) => {
        setPostRect(image, store.screenInfo.width, store.screenInfo.height, store.visiblePost);
        setImageHeight(imageHeight);
    };

    useEffect(() => {
        store.clearVisiblePostTagNames();
        store.getPost(parseInt(postId));
    }, [postId]);

    return (
        <PostRenderer
            imageHeight={imageHeight}
            onClose={closeModalHandler}
            onImageLoad={updateImage}
            previousPost={getPreviousPost(parseInt(postId), store.currentCategoryPosts)}
            nextPost={getNextPost(parseInt(postId), store.currentCategoryPosts)}
            screenInfo={store.screenInfo}
            visiblePost={store.visiblePost}
        />
    );
};

Post.displayName = 'Post';

export default observer(Post);
