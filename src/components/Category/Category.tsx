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

import { ApiContext } from '../../utils/ApiContext';
import {
    API,
    Category as CategoryState,
    ImageData,
    Post as PostState,
    ScreenInfo
} from '../../utils/types';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';

interface CategoryProps {
    maxItemsPerPage: number,
    screenInfo: ScreenInfo,
    currentCategoryPosts: PostState[],
    currentCategoryData: CategoryState,
    setCategoryPosts: (a: PostState[]) => void,
    setCategoryData: (a: CategoryState) => void,
    setThumbnailImageUrl: (a: ImageData) => void
}

const Category: React.FC<CategoryProps> = ({
    maxItemsPerPage,
    screenInfo,
    currentCategoryPosts,
    currentCategoryData,
    setCategoryPosts,
    setCategoryData,
    setThumbnailImageUrl
}) => {
    const { categoryId = '0' } = useParams();
    const api = useContext(ApiContext) as API;
    const { getPosts, getPostThumbnail, getCategoryInfo } = api;

    useEffect(() => {
        if (categoryId) {
            getPosts(parseInt(categoryId))
                .then((posts: PostState[]) => {
                    setCategoryPosts(posts);
                    currentCategoryPosts.forEach((post, index) => {
                        getPostThumbnail(post.featured_media)
                            .then((thumbUrl: string) => {
                                setThumbnailImageUrl({ post_index: index, image_url: thumbUrl });
                            });
                    });
                });
            getCategoryInfo(parseInt(categoryId))
                .then((categoryInfo: CategoryState) => {
                    setCategoryData(categoryInfo);
                });
        }
    }, [categoryId]);

    return (
        <div className="category">
            <SectionHeader title={currentCategoryData.name} />
            <Posts
                maxItemsPerPage={maxItemsPerPage}
                screenInfo={screenInfo}
                categoryId={parseInt(categoryId)}
                currentCategoryPosts={currentCategoryPosts}
            />
            <Outlet />
        </div>
    );
};

Category.displayName = 'Category';

export default observer(Category);
