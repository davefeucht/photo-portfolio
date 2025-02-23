/** ***************
* Categories component displays a list of existing photo categories 
* and makes them clickable to display just a single category.
**************** */

import './Categories.css';

import ImageList from '@mui/material/ImageList';
import { observer } from 'mobx-react';
import * as React from 'react';

import { Category } from '../../utils/types';
import CategoryThumbnail from '../CategoryThumbnail/CategoryThumbnail';

interface CategoriesProps {
    categoryList: Category[]
}

const Categories: React.FC<CategoriesProps> = ({
    categoryList
}) => {
    return (
        <ImageList
            gap={0}
            cols={4}
            variant="standard"
            rowHeight={(window.innerHeight - 64) / 2}
            sx={{ margin: 0, width: "100vw", height: "100%" }}
        >
            {categoryList.map(category => {
                return (
                    <CategoryThumbnail key={category.id} id={category.id} name={category.name} />
                );
            })}
        </ImageList>
    );
};

Categories.displayName = 'Categories';

export default observer(Categories);
