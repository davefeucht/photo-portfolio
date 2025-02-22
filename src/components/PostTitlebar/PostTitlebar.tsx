/** **************
* PostTitlebar component displays the titlebar for a Post
*************** */

import './PostTitlebar.css';

import CloseButton from 'components/CloseButton/CloseButton';
import { observer } from 'mobx-react';
import * as React from 'react';

interface PostTitlebarProps {
    postTitle: string
}

const PostTitlebar: React.FC<PostTitlebarProps> = ({ postTitle }) => {
    return (
        <div className="post-titlebar">
            <div className="title">{postTitle}</div>
            <CloseButton />
        </div>
    );
};

PostTitlebar.displayName = 'PostTitlebar';

export default observer(PostTitlebar);
