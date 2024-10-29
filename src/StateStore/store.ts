import { configure, makeAutoObservable } from 'mobx';
import WordpressAPI from 'utils/WordpressAPI';

import {
    Category,
    ImageData,
    Page,
    Post,
    Store,
    VisiblePost
} from '../utils/types';

configure({ enforceActions: 'observed' });

class stateStore implements Store {
    api: WordpressAPI;
    menuState: string;
    applicationRoot: HTMLElement;
    screenInfo: {
        width: number,
        height: number
    };
    siteInfo: {
        siteName: string,
        siteUrl: string
    };
    visiblePost: VisiblePost;
    categoryList: Category[];
    currentCategoryPosts: Post[];
    currentCategoryData: Category;
    pages: Page[];
    currentPageData: Page;
    maxItemsPerPage: number;

    constructor() {
        this.menuState = 'closed';
        this.applicationRoot = document.createElement('div');

        this.screenInfo = {
            width: 0,
            height: 0
        };

        this.siteInfo = {
            siteName: 'Through a Pinhole',
            siteUrl: 'throughapinhole.com'
        };

        this.visiblePost = {
            postId: 1,
            postTitle: '',
            tags: [],
            tagNames: [],
            fullImageUrl: '',
            width: 0,
            height: 0,
            featured_media: 0
        };

        this.categoryList = [];
        this.currentCategoryPosts = [];
        this.currentCategoryData = {
            id: 0,
            count: 0,
            description: '',
            link: '',
            name: '',
            slug: '',
            taxonomy: '',
            parent: 0
        };
        this.pages = [];
        this.currentPageData = {
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
        };
        this.maxItemsPerPage = 10;
        this.api = new WordpressAPI(this.siteInfo.siteUrl);

        makeAutoObservable(this);
    }

    getPosts = async (categoryId: number) => {
        const posts = await this.api.getPosts(categoryId)
        this.setCategoryPosts(posts);
        const thumbnailUrls = await Promise.all(
            posts.map(post => {
                return this.getPostThumbnail(post.featured_media);
            })
        )
        thumbnailUrls.forEach((thumbnailUrl, index) => {
            this.setThumbnailImageUrl({ post_index: index, image_url: thumbnailUrl})
        })
    }

    getPostThumbnail = async (featuredImage: number) => {
        return await this.api.getPostThumbnail(featuredImage);
    }

    getSiteInfo = async () => {
        const siteName = await this.api.getSiteInfo();
        this.setSiteName(siteName);
    };

    getCategories = async () => {
        const categories = await this.api.getCategories();
        this.setCategoryList(categories);
    };

    getPages = async () => {
        const pages = await this.api.getPages();
        this.setPages(pages);
    };

    getCategoryImage = async (categoryId: number) => {
        return await this.api.getCategoryImage(categoryId);
    };

    getPost = async (postId: number) => {
        const post = await this.api.getPost(postId);
        const tagNames = await this.getTagNames(post.tags);
        const postImageUrl = await this.getPostImage(post.featured_media);

        this.setCurrentPost(post, tagNames, postImageUrl);
    };

    getTagNames = async (tagIds: number[]) => {
        return await this.api.getTagNames(tagIds);
    };

    getPostImage = async (mediaId: number) => {
        return await this.api.getPostImage(mediaId);
    }

    getPage = async (pageId: number) => {
        const page = await this.api.getPage(pageId);
        this.setPageData(page);
    }

    setMenuState = (state: string) => {
        this.menuState = state;
    };

    toggleMenuState = () => {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    };

    setApplicationRoot = (element: HTMLElement) => {
        this.applicationRoot = element;
    };

    setSiteName = (name: string) => {
        this.siteInfo.siteName = name;
    };

    setVisiblePostImage = (fullImageUrl: string) => {
        this.visiblePost.fullImageUrl = fullImageUrl;
    };

    setVisiblePostTags = (tagNames: string[]) => {
        tagNames.forEach(tagName => {
            this.visiblePost.tagNames.push(tagName);
        });
    };

    clearVisiblePostTagNames = () => {
        this.visiblePost.tagNames.splice(0, this.visiblePost.tagNames.length);
    };

    setCategoryList = (categories: Category[]) => {
        this.categoryList.length = 0;
        categories.forEach((category, index) => {
            this.categoryList[index] = category;
        });
    };

    setCategoryPosts = (posts: Post[]) => {
        this.currentCategoryPosts.length = 0;
        posts.forEach((post, index) => {
            this.currentCategoryPosts[index] = post;
        });
    };

    setCategoryData = (categoryData: Category) => {
        this.currentCategoryData = categoryData;
    };

    setThumbnailImageUrl = (imageData: ImageData) => {
        this.currentCategoryPosts[imageData.post_index].thumbnail_image = imageData.image_url;
    };

    setCurrentPost = (postData: Post, tagNames: string[] = [], imageUrl = '') => {
        const visiblePostData: VisiblePost = {
            postId: postData.id,
            postTitle: postData.title.rendered,
            tags: postData.tags,
            tagNames,
            fullImageUrl: imageUrl,
            width: 0,
            height: 0,
            featured_media: postData.featured_media
        };

        this.visiblePost = visiblePostData;
    };

    setPages = (pages: Page[]) => {
        pages.forEach(page => {
            this.pages.push(page);
        });
    };

    setPageData = (pageData: Page) => {
        Object.assign(this.currentPageData, pageData);
    };
}

export default stateStore;
