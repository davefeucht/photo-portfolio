/** **************
* PostTitlebar component displays the titlebar for a Post
*************** */

import './PostTitlebar.css';

import { Close } from '@mui/icons-material';
import { DialogTitle, IconButton } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';

interface PostTitlebarProps {
    postTitle: string;
    onClose(): void;
}

const PostTitlebar: React.FC<PostTitlebarProps> = ({ postTitle, onClose }) => {
    return (
        <DialogTitle color="secondary" sx={{ backgroundColor: "var(--template-dark-gray)" }}>
            <div className="post__titlebar">
                <div>{postTitle}</div>
                <IconButton style={{ color: "inherit" }} onClick={onClose}>
                    <Close />
                </IconButton>
            </div>
        </DialogTitle>
    );
};

PostTitlebar.displayName = 'PostTitlebar';

export default observer(PostTitlebar);
