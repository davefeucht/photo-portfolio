import axios from 'axios';

import {
    CategoriesResponse,
    CategoryResponse,
    MediaResponse,
    PageResponse,
    PagesResponse,
    PostResponse,
    PostsResponse,
    SiteInfoResponse,
    TagNameResponse
} from './types';

export const getPostThumbnail = async (featuredImage: number, siteUrl: string) => {
    const getPostThumbnailURI = `https://${siteUrl}/wp-json/wp/v2/media/${featuredImage}`;
    const response = await axios.get(getPostThumbnailURI);
    const size = response.data.media_details.sizes.large ? 'large' : 'full';
    const thumbUrl: string = response.data.media_details.sizes[size].source_url;

    return thumbUrl;
};

export const getSiteInfo = async (siteUrl: string) => {
    const getSiteInformationURI = `https://${siteUrl}/wp-json/`;

    const response: SiteInfoResponse = await axios.get(getSiteInformationURI);
    const siteName = response.data.name;

    return siteName;
};

export const getCategories = async (siteUrl: string) => {
    const getCategoriesURI = `https://${siteUrl}/wp-json/wp/v2/categories?exclude=175`;

    const response: CategoriesResponse = await axios.get(getCategoriesURI);
    const categories = response.data;

    return categories;
};

export const getCategoryImage = async (categoryId: number, siteUrl: string) => {
    // Define the request string to get the posts for this category
    const getCategoryPostURI = `https://${siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;

    // Var to return
    let fullImageUrl = '';

    // Make the request
    const response = await axios.get(getCategoryPostURI);
    const categories = response.data;

    // Determine a random post from the ones returned
    const numberOfPosts = categories.length;
    const randomPost = Math.floor((Math.random() * numberOfPosts));

    // If this post does exist in the returned results
    if (categories[randomPost] !== undefined) {
        // Define the request string to get the featured media for the random post
        const categoryImageURI = `https://${siteUrl}/wp-json/wp/v2/media/${categories[randomPost].featured_media}/`;

        const imageURIResponse = await axios.get(categoryImageURI);
        const categoryImage = imageURIResponse.data;

        // If the large size image exists, use it
        if (categoryImage.media_details.sizes.large) {
            fullImageUrl = categoryImage.media_details.sizes.large.source_url;
        // Otherwise use the medium size version
        } else {
            fullImageUrl = categoryImage.media_details.sizes.medium.source_url;
        }
    }

    return fullImageUrl;
};

export const getPosts = async (categoryId: number, siteUrl: string) => {
    const getPostsURI = `https://${siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20`;
    const response: PostsResponse = await axios.get(getPostsURI);
    const posts = response.data;

    return posts;
};

export const getPost = async (postId: number, siteUrl: string) => {
    const getPostURI = `https://${siteUrl}/wp-json/wp/v2/posts/${postId}`;
    const response: PostResponse = await axios.get(getPostURI);
    const post = response.data;

    return post;
};

export const getCategoryInfo = async (categoryId: number, siteUrl: string) => {
    const getPostsCategoryURI = `https://${siteUrl}/wp-json/wp/v2/categories/${categoryId}`;
    const response: CategoryResponse = await axios.get(getPostsCategoryURI);
    const categoryData = response.data;

    return categoryData;
};

export const getPostImage = async (image: number, siteUrl: string) => {
    const getPostImageURI = `https://${siteUrl}/wp-json/wp/v2/media/${image}`;
    const response: MediaResponse = await axios.get(getPostImageURI);
    const fullImageUrl = response.data.media_details.sizes.full?.source_url ?? '';

    return fullImageUrl;
};

export const getTagNames = async (tags: number[], siteUrl: string) => {
    const tagNames: string[] = [];
    const tagPromises = tags.map(async tagId => {
        return axios.get(`https://${siteUrl}/wp-json/wp/v2/tags/${tagId}`)
            .then((response: TagNameResponse) => {
                tagNames.push(response.data.name);
            });
    });

    await Promise.all(tagPromises);

    return tagNames;
};

export const getPages = async (siteUrl: string) => {
    const getPagesURI = `https://${siteUrl}/wp-json/wp/v2/pages`;
    const response: PagesResponse = await axios.get(getPagesURI);
    const pages = response.data;

    return pages;
};

export const getPage = async (pageId: number, siteUrl: string) => {
    const getPagesURI = `https://${siteUrl}/wp-json/wp/v2/pages/${pageId}`;
    const response: PageResponse = await axios.get(getPagesURI);
    const page = response.data;

    return page;
};
