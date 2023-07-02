/** **************
* PostFooter component displays the footer for a Post
*************** */

import './PostFooter.css';

import { observer } from 'mobx-react';
import * as React from 'react';

interface PostFooterProps {
    tagNames: string[]
}

const PostFooter: React.FC<PostFooterProps> = ({ tagNames }) => {
    return (
        <div className="post-footer">
            <div className="labels">{tagNames.join(', ')}</div>
        </div>
    );
};

PostFooter.displayName = 'PostFooter';

export default observer(PostFooter);
