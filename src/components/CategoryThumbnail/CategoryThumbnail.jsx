/*****************
* CategoryThumbnail component displays the post image for a particular category.
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import CategoryTitle from '../CategoryTitle/CategoryTitle.jsx';

import { getCategoryImage } from '../../utils/Api';

import './CategoryThumbnail.css';

const CategoryThumbnail = ({ id, index, name, stateStore }) => {

    if (!stateStore.categoryList[index].thumbnail_image) {
        getCategoryImage(id, index, stateStore);
    }

    const divStyle = { backgroundImage: "url(" + (stateStore.categoryList[index].thumbnail_image ? stateStore.categoryList[index].thumbnail_image : "") + ")" };

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
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    stateStore: PropTypes.object.isRequired
};

export default observer(CategoryThumbnail);
