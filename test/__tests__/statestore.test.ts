import StateStore from "StateStore/store";

import { categories, imageUrl, pages, posts, tagNames } from "../data/testData";

jest.mock('../../utils/WordpressAPI');

describe('State Store', () => {
    it('Should initialize correctly', () => {
        const store = new StateStore();

        expect(store.menuState).toEqual('closed');
        expect(store.screenInfo).toEqual({ width: 0, height: 0 });
        expect(store.siteInfo).toEqual({ siteName: 'Through a Pinhole', siteUrl: 'throughapinhole.com' });
        expect(store.visiblePost).toEqual({
            postId: 1,
            postTitle: '',
            tags: [],
            tagNames: [],
            fullImageUrl: '',
            width: 0,
            height: 0,
            featured_media: 0
        });
        expect(store.categoryList.length).toEqual(0);
        expect(store.currentCategoryPosts.length).toEqual(0);
        expect(store.currentCategoryId).toEqual(0);
        expect(store.pages.length).toEqual(0);
        expect(store.currentPageData).toEqual({
            id: 0,
            link: '',
            modified: '',
            slug: '',
            type: '',
            title: {
                rendered: ''
            },
            content: {
                rendered: '',
                protected: false
            },
            author: 0,
            featured_media: 0
        });
        expect(store.maxItemsPerPage).toEqual(10);
    });

    it('Should get posts for a category', async () => {
        const store = new StateStore();

        await store.getPosts(1);

        expect(store.currentCategoryPosts).toEqual(posts.map(post => ({ ...post, thumbnail_image: imageUrl })));
    });

    it('Should get the site informaion', async () => {
        const store = new StateStore();

        await store.getSiteInfo();

        expect(store.siteInfo.siteName).toEqual('Through a Pinhole');
    });

    it('Should get the categories', async () => {
        const store = new StateStore();

        await store.getCategories();

        expect(store.categoryList).toEqual(categories);
    });

    it('Should get the pages', async () => {
        const store = new StateStore();

        await store.getPages();

        expect(store.pages).toEqual(pages);
    });

    it('Should get an image for a category', async () => {
        const store = new StateStore();

        const categoryImage = await store.getCategoryImage(1);

        expect(categoryImage).toEqual(imageUrl);
    });

    it('Should get a specific post based on id', async () => {
        const store = new StateStore();

        await store.getPost(posts[0].id);

        expect(store.visiblePost).toEqual({
            postId: posts[0].id,
            postTitle: posts[0].title.rendered,
            tags: posts[0].tags,
            tagNames: tagNames,
            fullImageUrl: imageUrl,
            width: 0,
            height: 0,
            featured_media: posts[0].featured_media
        })
    });

    it('Should get a specific page based on id', async () => {
        const store = new StateStore();

        await store.getPage(pages[0].id);

        expect(store.currentPageData).toEqual(pages[0]);
    });

    it('Should set the menu state', () => {
        const store = new StateStore();

        store.setMenuState('open');

        expect(store.menuState).toEqual('open');
    });

    it('Should toggle the menu state', () => {
        const store = new StateStore();

        expect(store.menuState).toEqual('closed');
        store.toggleMenuState();
        expect(store.menuState).toEqual('open');
    });

    it('Should set the application root', () => {
        const store = new StateStore();
        const root = document.createElement('div');

        store.setApplicationRoot(root);

        expect(store.applicationRoot).toEqual(root);
    });

    it('Should set the visible post image', () => {
        const store = new StateStore();
        const url = 'http://fishy.bob';

        store.setVisiblePostImage(url);

        expect(store.visiblePost.fullImageUrl).toEqual(url);
    });

    it('Should set the visible post tag names', () => {
        const store = new StateStore();
        const tagNames = ['foo', 'bob'];

        store.setVisiblePostTags(tagNames);

        expect(store.visiblePost.tagNames).toEqual(tagNames);
    });
});