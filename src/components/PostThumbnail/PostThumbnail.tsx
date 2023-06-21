/** **************
* PostThumbnail component displays the thumbnail image for a Post
*************** */

import './PostThumbnail.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface PostThumbnailProps {
    id: string,
    thumbnailImage: string
}

/*
 * currentCategoryPosts
*/

const PostThumbnail: React.FC<PostThumbnailProps> = ({ id, thumbnailImage = '' }) => {
    const divStyle = { backgroundImage: `url(${thumbnailImage})` };
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
