/** ***************
* Category component displays the posts for a particular category.
**************** */

import './Category.css';

import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import {
    Outlet,
    useParams
} from 'react-router-dom';

import { getCategoryInfo, getPosts, getPostThumbnail } from '../../utils/Api';
import { Store } from '../../utils/types';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';

interface CategoryProps {
    stateStore: Store
}

const Category: React.FC<CategoryProps> = ({ stateStore }) => {
    const { categoryId } = useParams();

    useEffect(() => {
        getPosts(parseInt(categoryId), stateStore.siteInfo.siteUrl)
            .then(posts => {
                stateStore.setCategoryPosts(posts);
                stateStore.currentCategoryPosts.forEach((post, index) => {
                    getPostThumbnail(post.featured_media, stateStore.siteInfo.siteUrl)
                        .then(thumbUrl => {
                            stateStore.setThumbnailImageUrl({ post_index: index, image_url: thumbUrl });
                        });
                });
            });
        getCategoryInfo(parseInt(categoryId), stateStore.siteInfo.siteUrl)
            .then(categoryInfo => {
                stateStore.setCategoryData(categoryInfo);
            });
    }, [categoryId]);

    return (
        <div className="category">
            <SectionHeader title={stateStore.currentCategoryData.name} />
            <Posts stateStore={stateStore} />
            <Outlet />
        </div>
    );
};

Category.displayName = 'Category';

export default observer(Category);
