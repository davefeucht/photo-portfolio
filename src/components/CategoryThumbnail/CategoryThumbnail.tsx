/** ***************
* CategoryThumbnail component displays the post image for a particular category.
**************** */

import './CategoryThumbnail.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';

import { Store } from '../../utils/types';
import CategoryTitle from '../CategoryTitle/CategoryTitle';

interface CategoryThumbnailProps {
    id: number,
    name: string
}

const CategoryThumbnail: React.FC<CategoryThumbnailProps> = ({ id, name }) => {
    const [thumbnailImageUrl, setThumbnailImageUrl] = useState('');
    const store = useContext(StoreContext) as Store;

    useEffect(() => {
        const fetchThumbUrl = async (categoryId: number) => {
            setThumbnailImageUrl(await store.getCategoryImage(categoryId))
        };

        if (!thumbnailImageUrl) {
            fetchThumbUrl(id);
        }
    }, [id]);

    const divStyle = { backgroundImage: `url(${thumbnailImageUrl || ''})` };

    return (
        <Link to={`/category/${id}`}>
            <div style={divStyle} className="category-thumbnail" aria-label={`category-${name.split(' ').join('-')}`}>
                <CategoryTitle title={name} />
            </div>
        </Link>
    );
};

CategoryThumbnail.displayName = 'CategoryThumbnail';

export default observer(CategoryThumbnail);
