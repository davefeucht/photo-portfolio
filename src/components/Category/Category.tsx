/** ***************
* Category component displays the posts for a particular category.
**************** */

import './Category.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import {
    useParams
} from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';

import { Store } from '../../utils/types';
import CategoryRenderer from './CategoryRenderer';

const Category: React.FC = () => {
    const { categoryId } = useParams();
    const store = useContext(StoreContext) as Store;

    useEffect(() => {
        // Set current category ID to state store, and let it fetch category posts when this ID changes
        if (categoryId) {
            store.setCurrentCategoryId(parseInt(categoryId));
            store.getPosts(parseInt(categoryId));
        }
    }, [categoryId]);

    return (
        <CategoryRenderer
            categoryId={store.currentCategoryId}
            maxItemsPerPage={store.maxItemsPerPage}
            categoryName={store.currentCategoryName}
            currentCategoryPosts={store.currentCategoryPosts}
            screenInfo={store.screenInfo}
        />
    );
};

Category.displayName = 'Category';

export default observer(Category);
