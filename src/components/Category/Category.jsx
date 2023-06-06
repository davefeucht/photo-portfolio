/** ***************
* Category component displays the posts for a particular category.
**************** */

import './Category.css';

import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
    Outlet,
    useParams
} from 'react-router-dom';

import { getCategoryInfo, getPosts, getPostThumbnail } from '../../utils/Api.js';
import Posts from '../Posts/Posts.jsx';
import SectionHeader from '../SectionHeader/SectionHeader.jsx';

function Category({ stateStore }) {
    const { categoryId } = useParams();

    useEffect(() => {
        getPosts(categoryId, stateStore.siteInfo.siteUrl)
            .then(posts => {
                stateStore.setCategoryPosts(posts);
                stateStore.currentCategoryPosts.forEach((post, index) => {
                    getPostThumbnail(post.featured_media, stateStore.siteInfo.siteUrl)
                        .then(thumbUrl => {
                            stateStore.setThumbnailImageUrl({ post_index: index, image_url: thumbUrl });
                        });
                });
            });
        getCategoryInfo(categoryId, stateStore.siteInfo.siteUrl)
            .then(categoryInfo => {
                stateStore.setCategoryData(categoryInfo);
            });
    }, [categoryId]);

    return (
        <div className="category">
            <SectionHeader stateStore={stateStore} title={stateStore.currentCategoryData.name} />
            <Posts stateStore={stateStore} categoryId={categoryId} />
            <Outlet />
        </div>
    );
}

Category.displayName = 'Category';

Category.propTypes = {
    stateStore: PropTypes.object.isRequired
};

export default observer(Category);
