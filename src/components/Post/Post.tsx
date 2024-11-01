/** **************
* Post component displays one individual Post in a modal
*************** */

import './Post.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import {
    useContext,
    useEffect
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';

import {
    getNextPost,
    getPreviousPost
} from '../../utils/PostHelper';
import { Store } from '../../utils/types';
import PostRenderer from './PostRenderer';


const Post: React.FC = () => {
    const { categoryId = '-1', postId = '-1' } = useParams();
    const navigate = useNavigate();
    const store = useContext(StoreContext) as Store;

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    useEffect(() => {
        if (postId) {
            store.clearVisiblePostTagNames();
            store.getPost(parseInt(postId));
        }
    }, [postId]);

    return (
        <PostRenderer
            onClose={closeModalHandler}
            previousPost={getPreviousPost(parseInt(postId), store.currentCategoryPosts)}
            nextPost={getNextPost(parseInt(postId), store.currentCategoryPosts)}
            screenInfo={store.screenInfo}
            visiblePost={store.visiblePost}
        />
    );
};

Post.displayName = 'Post';

export default observer(Post);
