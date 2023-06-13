/** **************
* PostTitlebar component displays the titlebar for a Post
*************** */

import './PostTitlebar.css';

import { observer } from 'mobx-react';
import * as React from 'react';

import CloseButton from '../CloseButton/CloseButton';

interface PostTitlebarProps {
    postTitle: string
}

const PostTitlebar: React.FC<PostTitlebarProps> = ({ postTitle = null }) => {
    return (
        <div className="post-titlebar">
            <div className="title">{postTitle}</div>
            <CloseButton />
        </div>
    );
};

PostTitlebar.displayName = 'PostTitlebar';

export default observer(PostTitlebar);
