/** ***************
* CategoryTitle component displays the category title over a CategoryThumbnail for a particular category.
**************** */

import './CategoryTitle.css';

import * as React from 'react';

interface CategoryTitleProps {
    title: string
}

const CategoryTitle: React.FC<CategoryTitleProps> = ({ title }) => {
    return (
        <div className="category-title">
            <div className="category-title-text">{title}</div>
        </div>
    );
};

CategoryTitle.displayName = 'CategoryTitle';

export default CategoryTitle;
