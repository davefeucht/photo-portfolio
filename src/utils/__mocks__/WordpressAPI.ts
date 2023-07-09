const imageUrl = 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg';

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

const categories = [
    {
        id: 23,
        count: 6,
        description: 'Category of other things',
        link: '',
        name: 'Some other category',
        slug: 'smocg',
        taxonomy: '',
        parent: 12,
        meta: {}
    },
    {
        id: 35,
        count: 3,
        description: 'Category of things',
        link: '',
        name: 'Some category',
        slug: 'smcg',
        taxonomy: '',
        parent: 23,
        meta: {}
    }
];

const posts = [
    {
        id: 887,
        link: '',
        modified: '',
        slug: '',
        type: '',
        featured_media: 142,
        categories: [220],
        title: {
            rendered: 'Some post'
        },
        content: {
            rendered: 'Some content',
            protected: false
        },
        thumbnail_image: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
    },
    {
        id: 889,
        featured_media: 145,
        categories: [220],
        title: {
            rendered: 'Some other post'
        },
        thumbnail_image: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
    }
];

const pages = [
    {
        id: 150,
        content: {
            rendered: 'Contact me!'
        },
        title: {
            rendered: 'Contact'
        }
    }
];

const tagNames = ['something', 'somethingelse'];

export default class WordpressAPI {
    siteUrl: string;

    constructor(siteUrl: string) {
        this.siteUrl = siteUrl;
    }

    async getPostThumbnail() {
        return Promise.resolve(imageUrl);
    }

    async getSiteInfo() {
        return Promise.resolve(siteInfo.siteName);
    }

    async getCategories() {
        return Promise.resolve(categories);
    }

    async getCategoryImage() {
        return Promise.resolve(imageUrl);
    }

    async getPosts() {
        return Promise.resolve(posts);
    }

    async getPost() {
        return Promise.resolve(posts[0]);
    }

    async getCategoryInfo() {
        return Promise.resolve(categories[0]);
    }

    async getPostImage() {
        return Promise.resolve(imageUrl);
    }

    async getTagNames() {
        return Promise.resolve(tagNames);
    }

    async getPages() {
        return Promise.resolve(pages);
    }

    async getPage() {
        return Promise.resolve(pages[0]);
    }
}
