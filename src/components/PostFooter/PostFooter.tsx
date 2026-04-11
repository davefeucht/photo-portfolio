/** **************
* PostFooter component displays the footer for a Post
*************** */

import './PostFooter.css';

import { Typography } from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';

interface PostFooterProps {
    tagNames: string[]
}

const PostFooter: React.FC<PostFooterProps> = ({ tagNames }) => {
    return (
        <div className="post-footer">
            <Typography className="labels">{tagNames.join(', ')}</Typography>
        </div>
    );
};

PostFooter.displayName = 'PostFooter';

export default observer(PostFooter);
