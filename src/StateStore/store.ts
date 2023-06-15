import { configure, makeAutoObservable } from 'mobx';

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
        this.applicationRoot = null;

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
            postTitle: null,
            tags: [],
            tagNames: [],
            fullImageUrl: null,
            width: null,
            height: null,
            featured_media: null
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

        makeAutoObservable(this);
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

    setCurrentPost = (postData: Post) => {
        const visiblePostData: VisiblePost = {
            postId: parseInt(postData.id),
            postTitle: postData.title.rendered,
            tags: postData.tags,
            tagNames: [],
            fullImageUrl: null,
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
