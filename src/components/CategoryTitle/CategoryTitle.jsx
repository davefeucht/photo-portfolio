/*****************
* CategoryTitle component displays the category title over a CategoryThumbnail for a particular category.
*****************/

import React from 'react';
import PropTypes from 'prop-types';
import './CategoryTitle.css';

const CategoryTitle = ({ name }) => {
  return (
    <div className="category-title">
      <div className="category-title-text">{name}</div>
    </div>
  )
};

CategoryTitle.displayName = 'CategoryTitle';

CategoryTitle.propTypes = {
  name: PropTypes.string.isRequired
}

export default CategoryTitle;