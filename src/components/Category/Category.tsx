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
import {
    Category as CategoryState,
    ImageData,
    Post as PostState,
    ScreenInfo,
    SiteInfo
} from '../../utils/types';
import Posts from '../Posts/Posts';
import SectionHeader from '../SectionHeader/SectionHeader';

interface CategoryProps {
    maxItemsPerPage: number,
    siteInfo: SiteInfo,
    screenInfo: ScreenInfo,
    currentCategoryPosts: PostState[],
    currentCategoryData: CategoryState,
    setCategoryPosts: (a: PostState[]) => void,
    setCategoryData: (a: CategoryState) => void,
    setThumbnailImageUrl: (a: ImageData) => void
}

const Category: React.FC<CategoryProps> = ({
    maxItemsPerPage,
    siteInfo,
    screenInfo,
    currentCategoryPosts,
    currentCategoryData,
    setCategoryPosts,
    setCategoryData,
    setThumbnailImageUrl
}) => {
    const { categoryId = '' } = useParams();

    useEffect(() => {
        if (categoryId) {
            getPosts(parseInt(categoryId), siteInfo.siteUrl)
                .then((posts: PostState[]) => {
                    setCategoryPosts(posts);
                    currentCategoryPosts.forEach((post, index) => {
                        getPostThumbnail(post.featured_media, siteInfo.siteUrl)
                            .then((thumbUrl: string) => {
                                setThumbnailImageUrl({ post_index: index, image_url: thumbUrl });
                            });
                    });
                });
            getCategoryInfo(parseInt(categoryId), siteInfo.siteUrl)
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
