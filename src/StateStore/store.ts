import { configure, makeAutoObservable } from 'mobx';
import { ImageData, Image, Store, Category, Post, Page } from '../utils/types';

configure({ enforceActions: 'observed' });

class stateStore implements Store {
    menuState = 'closed'
    applicationRoot: HTMLElement = null;
    screenInfo: {
        width: number,
        height: number
    }
    siteInfo: {
        siteName: string,
        siteUrl: string
    }
    visiblePost: {
        postId: number,
        postTitle: string,
        tags: number[],
        tagNames: string[],
        fullImageUrl: string,
        width: number,
        height: number
    };
    categoryList: Category[] = [];
    currentCategoryPosts: Post[] = [];
    currentCategoryData: Category = {
        id: 0,
        count: 0,
        description: '',
        link: '',
        name: '',
        slug: '',
        taxonomy: '',
        parent: 0
    };
    pages: Page[] = [];
    currentPageData: Page = {
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
    maxItemsPerPage = 10;

    constructor() {
        makeAutoObservable(this);
    }

    setMenuState = (state: string) => {
        this.menuState = state;
    }

    toggleMenuState = () => {
        this.menuState = this.menuState === 'closed' ? 'open' : 'closed';
    }

    setApplicationRoot = (element: HTMLElement) => {
        this.applicationRoot = element;
    }

    setSiteName = (name: string) => {
        this.siteInfo.siteName = name;
    }

    setVisiblePost = (postId: number, postTitle: string) => {
        this.visiblePost.postId = postId;
        this.visiblePost.postTitle = postTitle;
    }

    setVisiblePostImage = (fullImageUrl: string) => {
        this.visiblePost.fullImageUrl = fullImageUrl;
    }

    setVisiblePostTags = (tagNames: string[]) => {
        tagNames.forEach(tagName => {
            this.visiblePost.tagNames.push(tagName);
        });
    }

    clearVisiblePostTagNames = () => {
        this.visiblePost.tagNames.splice(0, this.visiblePost.tagNames.length);
    }

    setCategoryList = (categories: Category[]) => {
        this.categoryList.length = 0;
        categories.forEach((category, index) => {
            this.categoryList[index] = category;
        })
    }

    setCategoryPosts = (posts: Post[]) => {
        this.currentCategoryPosts.length = 0;
        posts.forEach((post, index) => {
            this.currentCategoryPosts[index] = post;
        })
    }

    setCategoryData = (categoryData: Category) => {
        Object.keys(categoryData).forEach((key: keyof Category) => {
            this.currentCategoryData[key] = categoryData[key];
        });
    }

    setThumbnailImageUrl = (imageData: ImageData) => {
        this.currentCategoryPosts[imageData.post_index].thumbnail_image = imageData.image_url;
    }

    setCurrentPost = (postData: Post) => {
        Object.keys(postData).forEach((key: keyof Image) => {
            this.visiblePost[key] = postData[key];
        })
    }

    setPages = (pages: Page[]) => {
        pages.forEach(page => {
            this.pages.push(page);
        });
    }

    setPageData = (pageData: Page) => {
        Object.assign(this.currentPageData, pageData);
    }
}

export default stateStore;
