/** **************
* PostTitlebar component displays the titlebar for a Post
*************** */

import './PostTitlebar.css';

import { Close } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';

interface PostTitlebarProps {
    postTitle: string;
    onClose(): void;
}

const PostTitlebar: React.FC<PostTitlebarProps> = ({ postTitle, onClose }) => {
    return (
        <AppBar className="post__titlebar" position="static">
            <Toolbar>
                <div className="post__titlebar-content">
                    <div>{postTitle}</div>
                    <IconButton style={{ color: "inherit" }} onClick={onClose}>
                        <Close />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    );
};

PostTitlebar.displayName = 'PostTitlebar';

export default observer(PostTitlebar);
