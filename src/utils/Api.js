import axios from 'axios';

export const getPostThumbnail = async (featuredImage, siteUrl) => {
    const getPostThumbnailURI = `https://${siteUrl}/wp-json/wp/v2/media/${featuredImage}`;
    const response = await axios.get(getPostThumbnailURI);
    const size = response.data.media_details.sizes.large ? 'large' : 'full';
    const thumbUrl = response.data.media_details.sizes[size].source_url;

    return thumbUrl;
};

export const getSiteInfo = async siteUrl => {
    const getSiteInformationURI = `https://${siteUrl}/wp-json/`;

    const response = await axios.get(getSiteInformationURI);
    const siteName = response.data.name;

    return siteName;
};

export const getCategories = async siteUrl => {
    let categories = [];
    const getCategoriesURI = `https://${siteUrl}/wp-json/wp/v2/categories?exclude=175`;

    const response = await axios.get(getCategoriesURI);
    categories = response.data;

    return categories
};

export const getCategoryImage = async (categoryId, siteUrl) => {
    //Define the request string to get the posts for this category
    const getCategoryPostURI = `https://${siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;

    // Var to return
    let fullImageUrl = '';

    //Make the request
    const response = await axios.get(getCategoryPostURI);
    const categories = response.data;

    //Determine a random post from the ones returned
    const numberOfPosts = categories.length;
    const randomPost = Math.floor((Math.random() * numberOfPosts));

    //If this post does exist in the returned results
    if (categories[randomPost] !== undefined) {
        //Define the request string to get the featured media for the random post
        const getCategoryImage = `https://${siteUrl}/wp-json/wp/v2/media/${categories[randomPost].featured_media}/`; 

        const response = await axios.get(getCategoryImage);
        const categoryImage = response.data;

        //If the large size image exists, use it
        if(categoryImage.media_details.sizes.large) {
            fullImageUrl = categoryImage.media_details.sizes.large.source_url;
        }

        //Otherwise use the medium size version
        else {
            fullImageUrl = categoryImage.media_details.sizes.medium.source_url;
        }
    }

    return fullImageUrl;
};

export const getPosts = async (categoryId, siteUrl) => {
    const getPostsURI = `https://${siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20`;
    const response = await axios.get(getPostsURI);
    const posts = response.data;

    return posts;
};

export const getPost = async (postId, siteUrl) => {
    const getPostURI = `https://${siteUrl}/wp-json/wp/v2/posts/${postId}`;
    const response = await axios.get(getPostURI);
    const post = response.data;

    return post;
};

export const getCategoryInfo = async (categoryId, siteUrl) => {
    const getPostsCategoryURI = `https://${siteUrl}/wp-json/wp/v2/categories/${categoryId}`; 
    const response = await axios.get(getPostsCategoryURI);
    const categoryData = response.data;

    return categoryData;
};

export const getPostImage = async (image, siteUrl) => {
    const getPostImageURI = `https://${siteUrl}/wp-json/wp/v2/media/${image}`; 
    const response = await axios.get(getPostImageURI);
    const fullImageUrl = response.data.media_details.sizes.full.source_url; 

    return fullImageUrl;
};

export const getTagNames = async (tags, siteUrl) => {
    const tagNames = [];
    for (const tagId of tags) {
        const getTagNameURI = `https://${siteUrl}/wp-json/wp/v2/tags/${tagId}`
        const response = await axios.get(getTagNameURI);
        tagNames.push(response.data.name); 
    }
    
    return tagNames;
};

export const getPages = async siteUrl => {
    const getPagesURI = `https://${siteUrl}/wp-json/wp/v2/pages`;
    const response = await axios.get(getPagesURI);
    const pages = response.data;

    return pages;
};

export const getPage = async (pageId, siteUrl) => {
    const getPagesURI = `https://${siteUrl}/wp-json/wp/v2/pages/${pageId}`;
    const response = await axios.get(getPagesURI);
    const page = response.data;

    return page;
};
