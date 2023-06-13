/** ***************
* CategoryTitle component displays the category title over a CategoryThumbnail for a particular category.
**************** */

import './CategoryTitle.css';

import PropTypes from 'prop-types';
import React from 'react';

const CategoryTitle = ({ title }) => {
    return (
        <div className="category-title">
            <div className="category-title-text">{title}</div>
        </div>
    );
};

CategoryTitle.displayName = 'CategoryTitle';

CategoryTitle.propTypes = {
    title: PropTypes.string.isRequired
};

export default CategoryTitle;
