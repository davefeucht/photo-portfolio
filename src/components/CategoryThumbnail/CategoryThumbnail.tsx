/** ***************
* CategoryThumbnail component displays the post image for a particular category.
**************** */

import './CategoryThumbnail.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { ApiContext } from '../../utils/ApiContext';
import { API } from '../../utils/types';
import CategoryTitle from '../CategoryTitle/CategoryTitle';

interface CategoryThumbnailProps {
    id: number,
    name: string
}

const CategoryThumbnail: React.FC<CategoryThumbnailProps> = ({ id, name }) => {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState('');
    const api = useContext(ApiContext) as API;
    const { getCategoryImage } = api;

    if (!thumbnailImageUrl) {
        getCategoryImage(id)
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
