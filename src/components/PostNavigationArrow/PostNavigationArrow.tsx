/** **************
* PostNavigationArrow component displays a navigation arrow for a Post
*************** */

import './PostNavigationArrow.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

interface PostNavigationArrowProps {
    postHeight: number,
    direction: string,
    postId: number
}

const PostNavigationArrow: React.FC<PostNavigationArrowProps> = ({ postHeight = 0, direction, postId }) => {
    const { categoryId } = useParams();

    // TODO: calc this based on a height variable, not just a hard-coded 41
    const top = (postHeight / 2) - 41;
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
