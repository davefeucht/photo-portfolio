/** **************
* PostThumbnail component displays the thumbnail image for a Post
*************** */

import './PostThumbnail.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Store } from '../../utils/types';

interface PostThumbnailProps {
    stateStore: Store,
    id: string,
    index: number
}

const PostThumbnail: React.FC<PostThumbnailProps> = ({ stateStore, id, index }) => {
    const divStyle = { backgroundImage: `url(${stateStore.currentCategoryPosts[index].thumbnail_image ? stateStore.currentCategoryPosts[index].thumbnail_image : ''})` };
    const location = useLocation();

    return (
        <Link
            to={{ pathname: `post/${id}` }}
            state={{ background: location }}
        >
            <div className="post-thumbnail" style={divStyle} />
        </Link>
    );
};

PostThumbnail.displayName = 'PostThumbnail';

export default observer(PostThumbnail);
