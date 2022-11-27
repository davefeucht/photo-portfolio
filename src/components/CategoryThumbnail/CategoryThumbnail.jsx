/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import CategoryTitle from '../CategoryTitle/CategoryTitle.jsx';

import { getCategoryImage } from '../../utils/Api';

import './CategoryThumbnail.css';

const CategoryThumbnail = ({ id, name, stateStore }) => {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState('');

    if (!thumbnailImageUrl) {
        getCategoryImage(id, stateStore)
            .then(imageUrl => {
                setThumbnailImageUrl(imageUrl);
            });
    }

    const divStyle = { backgroundImage: "url(" + (thumbnailImageUrl ? thumbnailImageUrl : "") + ")" };

    return (
        <Link to={`/category/${id}`}>
            <div style={divStyle} className="category-thumbnail">
                <CategoryTitle title={name} />
            </div>
        </Link>
    );
};

CategoryThumbnail.displayName = 'CategoryThumbnail';

CategoryThumbnail.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stateStore: PropTypes.object.isRequired
};

export default observer(CategoryThumbnail);
