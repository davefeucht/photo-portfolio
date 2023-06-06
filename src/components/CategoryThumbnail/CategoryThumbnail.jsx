/** ***************
* CategoryThumbnail component displays the post image for a particular category.
**************** */

import './CategoryThumbnail.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { getCategoryImage } from '../../utils/Api';
import CategoryTitle from '../CategoryTitle/CategoryTitle.jsx';

function CategoryThumbnail({ id, name, stateStore }) {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState('');

    if (!thumbnailImageUrl) {
        getCategoryImage(id, stateStore.siteInfo.siteUrl)
            .then(imageUrl => {
                setThumbnailImageUrl(imageUrl);
            });
    }

    const divStyle = { backgroundImage: `url(${thumbnailImageUrl || ''})` };

    return (
        <Link to={`/category/${id}`}>
            <div style={divStyle} className="category-thumbnail">
                <CategoryTitle title={name} />
            </div>
        </Link>
    );
}

CategoryThumbnail.displayName = 'CategoryThumbnail';

CategoryThumbnail.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stateStore: PropTypes.object.isRequired
};

export default observer(CategoryThumbnail);
