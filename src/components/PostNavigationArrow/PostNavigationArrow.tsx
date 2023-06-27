/** **************
* PostNavigationArrow component displays a navigation arrow for a Post
*************** */

import './PostNavigationArrow.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

interface PostNavigationArrowProps {
    imageHeight: number,
    direction: string,
    postId: number
}

const PostNavigationArrow: React.FC<PostNavigationArrowProps> = ({ imageHeight = 0, direction, postId }) => {
    const { categoryId } = useParams();

    // TODO: calculate these based on a variable somewhere - they are navigationArrowHeight - (postHeaderHight + postFooterHeight)
    // What we want here is actually the height of just the image and not the whole modal
    const top = (imageHeight / 2) - 41;
    const divStyle = direction === 'previous' ? { top: `${top}px`, left: '0px' } : { top: `${top}px`, right: '0px' };
    const classNames = ['post-navigation-arrow', postId ? 'active' : 'disabled', direction];

    const getContent = () => {
        if (postId) {
            return (
                <Link to={`/category/${categoryId}/post/${postId}`}>
                    <div className="arrow"><img src="./assets/images/chevron.svg" /></div>
                </Link>
            );
        }
        return (
            <div className="arrow"><img src="./assets/images/chevron.svg" /></div>
        );
    };

    return (
        <div className={classNames.join(' ')} style={divStyle}>
            {getContent()}
        </div>
    );
};

PostNavigationArrow.displayName = 'PostNavigationArrow';

export default observer(PostNavigationArrow);
