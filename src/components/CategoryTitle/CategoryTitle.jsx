/*****************
* CategoryTitle component displays the category title over a CategoryThumbnail for a particular category.
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import './CategoryTitle.css';

const CategoryTitle = ({ title }) => {
    return (
        <div className="category-title">
            <div className="category-title-text">{title}</div>
        </div>
    )
};

CategoryTitle.displayName = 'CategoryTitle';

CategoryTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default CategoryTitle;
