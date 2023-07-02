/** ***************
* CategoryThumbnail component displays the post image for a particular category.
**************** */

import './CategoryThumbnail.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { getCategoryImage } from '../../utils/Api';
import { SiteInfo } from '../../utils/types';
import CategoryTitle from '../CategoryTitle/CategoryTitle';

interface CategoryThumbnailProps {
    id: number,
    name: string,
    siteInfo: SiteInfo
}

const CategoryThumbnail: React.FC<CategoryThumbnailProps> = ({ id, name, siteInfo }) => {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState('');

    if (!thumbnailImageUrl) {
        getCategoryImage(id, siteInfo.siteUrl)
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
};

CategoryThumbnail.displayName = 'CategoryThumbnail';

export default observer(CategoryThumbnail);
