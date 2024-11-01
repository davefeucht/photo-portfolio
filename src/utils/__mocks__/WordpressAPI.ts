import { categories, pages, posts, siteInfo, tagNames } from "../../../test/data/testData";

const imageUrl = 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg';

export const mockGetSiteInfo = jest.fn(async () => siteInfo.siteName);
export const mockGetPostImage = jest.fn(async () => imageUrl);
export const mockGetPost = jest.fn(async () => posts[0]);
export const mockGetPosts = jest.fn(async () => posts);
export const mockGetPages = jest.fn(async () => pages);
export const mockGetPage = jest.fn(async () => pages[0]);
export const mockGetPostThumbnail = jest.fn(async () => imageUrl);
export const mockGetCategoryImage = jest.fn(async () => imageUrl);
export const mockGetCategories = jest.fn(async () => categories);
export const mockGetTagNames = jest.fn(async () => tagNames);

const mock = jest.fn().mockImplementation(() => {
    return {
        getSiteInfo: mockGetSiteInfo,
        getPostImage: mockGetPostImage,
        getPost: mockGetPost,
        getCategories: mockGetCategories,
        getCategoryImage: mockGetCategoryImage,
        getPage: mockGetPage,
        getPages: mockGetPages,
        getPosts: mockGetPosts,
        getPostThumbnail: mockGetPostThumbnail,
        getTagNames: mockGetTagNames
    };
});

export default mock;
