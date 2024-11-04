import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import WordpressAPI from 'utils/WordpressAPI';

import { categories, imageUrl, posts, siteInfo } from '../data/testData';

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
});