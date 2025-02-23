/** ***************
* CategoryThumbnail component displays the post image for a particular category.
**************** */

import './CategoryThumbnail.css';

import ThumbnailRenderer from 'components/ThumbnailRenderer/ThumbnailRenderer';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from 'utils/StoreContext';
import { Store } from 'utils/types';

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

    return (
        <ThumbnailRenderer
            id={id}
            name={name}
            thumbnailUrl={thumbnailImageUrl}
            variant="category"
        />
    );
};

CategoryThumbnail.displayName = 'CategoryThumbnail';

export default observer(CategoryThumbnail);
