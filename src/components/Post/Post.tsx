/** **************
* Post component displays one individual Post in a modal
*************** */

import './Post.css';

import PostRenderer from 'components/Post/PostRenderer';
import { observer } from 'mobx-react';
import * as React from 'react';
import {
    useContext,
    useEffect
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    getNextPost,
    getPreviousPost
} from 'utils/PostHelper';
import { StoreContext } from 'utils/StoreContext';
import { Store } from 'utils/types';


const Post: React.FC = () => {
    const { categoryId = '-1', postId = '-1' } = useParams();
    const navigate = useNavigate();
    const store = useContext(StoreContext) as Store;

    const closeModalHandler = () => {
        navigate(`/category/${categoryId}`);
    };

    useEffect(() => {
        store.clearVisiblePostTagNames();
        store.getPost(parseInt(postId));
    }, [postId]);

    return (
        <PostRenderer
            onClose={closeModalHandler}
            previousPost={getPreviousPost(parseInt(postId), store.currentCategoryPosts)}
            nextPost={getNextPost(parseInt(postId), store.currentCategoryPosts)}
            visiblePost={store.visiblePost}
        />
    );
};

Post.displayName = 'Post';

export default observer(Post);
