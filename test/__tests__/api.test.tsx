import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import WordpressAPI from 'utils/WordpressAPI';

import { categories, imageUrl, pages, posts, siteInfo, tagNames } from '../data/testData';

// @ts-ignore it seems the type definitions for AxiosMockAdapter do not match Axios
const axiosMock = new AxiosMockAdapter(axios);
const siteUrl = 'throughapinhole.com';

beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0);
    axiosMock.resetHandlers();
    axiosMock.resetHistory();
})

describe("API", () => {
    it('Should get a post thumbnail', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/media/${posts[0].featured_media}`).reply(200, {
            media_details: {
                sizes: {
                    large: {
                        source_url: imageUrl
                    }
                }
            }
        });

        const postThumbnail = await api.getPostThumbnail(1);
        expect(postThumbnail).toEqual(imageUrl);
    });

    it('Should get the site info', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/`).reply(200, { name: 'Through a Pinhole' });

        const siteName = await api.getSiteInfo();

        expect(siteName).toEqual(siteInfo.siteName);
    });

    it('Should get the categories', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/categories?exclude=175`).reply(200, categories);

        const returnedCategories = await api.getCategories();

        expect(returnedCategories).toEqual(categories);
    });

    it('Should get a category image', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/posts?categories=${posts[0].categories[0]}`).reply(200, posts.filter(post => post.categories.includes(1)));
        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/media/${posts[0].featured_media}/`).reply(200, {
            media_details: {
                sizes: {
                    large: {
                        source_url: imageUrl
                    },
                    medium: {
                        source_url: imageUrl
                    }
                }
            }
        });

        const categoryImage = await api.getCategoryImage(1);

        expect(categoryImage).toEqual(imageUrl);
    });

    it('Should get the posts', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/posts?categories=${categories[0].id}&per_page=20`).reply(200, posts);

        const returnedPosts = await api.getPosts(categories[0].id);

        expect(returnedPosts).toEqual(posts);
    });

    it('Should get a post based on id', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/posts/${posts[0].id}`).reply(200, posts[0]);

        const returnedPost = await api.getPost(posts[0].id);

        expect(returnedPost).toEqual(posts[0]);
    });

    it('Should get the category info by id', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/categories/${categories[0].id}`).reply(200, categories[0]);

        const returnedCategory = await api.getCategoryInfo(categories[0].id);

        expect(returnedCategory).toEqual(categories[0]);
    });

    it('Should get post image', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/media/${posts[0].featured_media}`).reply(200, {
            media_details: {
                sizes: {
                    full: {
                        source_url: imageUrl
                    },
                    large: {
                        source_url: imageUrl
                    },
                    medium: {
                        source_url: imageUrl
                    }
                }
            }
        });

        const returnedImageUrl = await api.getPostImage(posts[0].featured_media);

        expect(returnedImageUrl).toEqual(imageUrl);
    });

    it('Should get tag names for tags', async () => {
        const api = new WordpressAPI(siteUrl);
        const tags = [0, 1];

        tags.forEach(tag => {
            axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/tags/${tag}`).reply(200, { name: tagNames[tag] });
        });

        const returnedTagNames = await api.getTagNames(tags);

        expect(returnedTagNames).toEqual(tagNames);
    });

    it('Should get the pages', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/pages`).reply(200, pages);

        const returnedPages = await api.getPages();

        expect(returnedPages).toEqual(pages);
    });

    it('Should get a page based on id', async () => {
        const api = new WordpressAPI(siteUrl);

        axiosMock.onGet(`https://${siteUrl}/wp-json/wp/v2/pages/${pages[0].id}`).reply(200, pages[0]);

        const returnedPage = await api.getPage(pages[0].id);

        expect(returnedPage).toEqual(pages[0]);
    });
});