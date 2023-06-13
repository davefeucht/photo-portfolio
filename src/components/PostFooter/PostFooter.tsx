/** **************
* PostFooter component displays the footer for a Post
*************** */

import './PostFooter.css';

import { observer } from 'mobx-react';
import * as React from 'react';

import { Store } from '../../utils/types';

interface PostFooterProps {
    stateStore: Store
}

const PostFooter: React.FC<PostFooterProps> = ({ stateStore }) => {
    return (
        <div className="post-footer">
            <div className="labels">{stateStore.visiblePost.tagNames.join(', ')}</div>
        </div>
    );
};

PostFooter.displayName = 'PostFooter';

export default observer(PostFooter);
