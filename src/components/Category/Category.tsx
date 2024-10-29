/** ***************
* Category component displays the posts for a particular category.
**************** */

import './Category.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useContext, useEffect } from 'react';
import {
    Outlet,
    useParams
} from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';

import { Store } from '../../utils/types';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';

const Category: React.FC = () => {
    const { categoryId = '0' } = useParams();
    const store = useContext(StoreContext) as Store;

    useEffect(() => {
        // Set current category ID to state store, and let it fetch category posts when this ID changes
        if (categoryId) {
            store.getPosts(parseInt(categoryId));
        }
    }, [categoryId]);

    return (
        <div className="category">
            <SectionHeader title={store.currentCategoryData.name} />
            <Posts
                maxItemsPerPage={store.maxItemsPerPage}
                screenInfo={store.screenInfo}
                categoryId={parseInt(categoryId)}
                currentCategoryPosts={store.currentCategoryPosts}
            />
            <Outlet />
        </div>
    );
};

Category.displayName = 'Category';

export default observer(Category);
