/** **************
* PostFooter component displays the footer for a Post
*************** */

import './PostFooter.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React from 'react';

function PostFooter({ stateStore }) {
    return (
        <div className="post-footer">
            <div className="labels">{stateStore.visiblePost.tagNames.join(', ')}</div>
        </div>
    );
}

PostFooter.displayName = 'PostFooter';

PostFooter.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(PostFooter);
