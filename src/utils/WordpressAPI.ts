import axios from 'axios';

import {
    API,
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

class WordpressAPI implements API {
    siteUrl: string;

    constructor(siteUrl: string) {
        this.siteUrl = siteUrl;
    }

    getPostThumbnail = async (featuredImage: number) => {
        const getPostThumbnailURI = `https://${this.siteUrl}/wp-json/wp/v2/media/${featuredImage}`;
        const response = await axios.get(getPostThumbnailURI);
        const size = response.data.media_details.sizes.large ? 'large' : 'full';
        const thumbUrl: string = response.data.media_details.sizes[size].source_url;

        return thumbUrl;
    };

    getSiteInfo = async () => {
        const getSiteInformationURI = `https://${this.siteUrl}/wp-json/`;

        const response: SiteInfoResponse = await axios.get(getSiteInformationURI);
        const siteName = response.data.name;

        return siteName;
    };

    getCategories = async () => {
        const getCategoriesURI = `https://${this.siteUrl}/wp-json/wp/v2/categories?exclude=175`;

        const response: CategoriesResponse = await axios.get(getCategoriesURI);
        const categories = response.data;

        return categories;
    };

    getCategoryImage = async (categoryId: number) => {
        // Define the request string to get the posts for this category
        const getCategoryPostURI = `https://${this.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;

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
            const categoryImageURI = `https://${this.siteUrl}/wp-json/wp/v2/media/${categories[randomPost].featured_media}/`;

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

    getPosts = async (categoryId: number) => {
        const getPostsURI = `https://${this.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20`;
        const response: PostsResponse = await axios.get(getPostsURI);
        const posts = response.data;

        return posts;
    };

    getPost = async (postId: number) => {
        const getPostURI = `https://${this.siteUrl}/wp-json/wp/v2/posts/${postId}`;
        const response: PostResponse = await axios.get(getPostURI);
        const post = response.data;

        return post;
    };

    getCategoryInfo = async (categoryId: number) => {
        const getPostsCategoryURI = `https://${this.siteUrl}/wp-json/wp/v2/categories/${categoryId}`;
        const response: CategoryResponse = await axios.get(getPostsCategoryURI);
        const categoryData = response.data;

        return categoryData;
    };

    getPostImage = async (image: number) => {
        const getPostImageURI = `https://${this.siteUrl}/wp-json/wp/v2/media/${image}`;
        const response: MediaResponse = await axios.get(getPostImageURI);
        const fullImageUrl = response.data.media_details.sizes.full?.source_url ?? '';

        return fullImageUrl;
    };

    getTagNames = async (tags: number[]) => {
        const tagNames: string[] = [];
        const tagPromises = tags.map(async tagId => {
            return axios.get(`https://${this.siteUrl}/wp-json/wp/v2/tags/${tagId}`)
                .then((response: TagNameResponse) => {
                    tagNames.push(response.data.name);
                });
        });

        await Promise.all(tagPromises);

        return tagNames;
    };

    getPages = async () => {
        const getPagesURI = `https://${this.siteUrl}/wp-json/wp/v2/pages`;
        const response: PagesResponse = await axios.get(getPagesURI);
        const pages = response.data;

        return pages;
    };

    getPage = async (pageId: number) => {
        const getPagesURI = `https://${this.siteUrl}/wp-json/wp/v2/pages/${pageId}`;
        const response: PageResponse = await axios.get(getPagesURI);
        const page = response.data;

        return page;
    };
}

export default WordpressAPI;
