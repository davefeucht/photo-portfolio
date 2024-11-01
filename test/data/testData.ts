import { Category, Page, Post, SiteInfo } from "utils/types";

export const siteInfo: SiteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

export const tagNames = ['something', 'somethingelse'];

export const categories: Category[] = [
    {
        id: 1,
        count: 22,
        description: 'This is Category 1',
        link: 'http://category/1',
        name: 'Category 1',
        slug: 'category1',
        taxonomy: 'Cityscapes',
        parent: 0
    }
];

export const posts: Post[] = [
    {
        id: 1,
        link: 'http://post/1',
        modified: 'now',
        slug: 'post1',
        type: 'post',
        title: {
            rendered: 'Post 1'
        },
        content: {
            rendered: 'This is a post',
            protected: false
        },
        author: 0,
        featured_media: 1,
        categories: [1],
        tags: [0],
        thumbnail_image: 'http://media/1'
    }
];

export const pages: Page[] = [
    {
        id: 1,
        link: 'http://page/1',
        modified: 'now',
        slug: 'page1',
        type: 'page',
        title: {
            rendered: 'Page 1'
        },
        content: {
            rendered: 'This is a page',
            protected: false
        },
        author: 0,
        featured_media: 1
    }
]
