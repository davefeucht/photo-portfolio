/** **************
* PostTitlebar component displays the titlebar for a Post
*************** */

import './PostTitlebar.css';

import { DialogTitle } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';

interface PostTitlebarProps {
    postTitle: string
}

const PostTitlebar: React.FC<PostTitlebarProps> = ({ postTitle }) => {
    return (
        <DialogTitle color="secondary" sx={{ backgroundColor: "var(--template-dark-gray)" }}>{postTitle}</DialogTitle>
    );
};

PostTitlebar.displayName = 'PostTitlebar';

export default observer(PostTitlebar);
