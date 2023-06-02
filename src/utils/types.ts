export interface PostTitle {
    rendered: string
}

export interface PostContent {
    rendered: string,
    protected: boolean
}

export interface Category {
    id: number,
    count: number,
    description: string,
    link: string,
    name: string,
    slug: string,
    taxonomy: string,
    parent: number
}

export interface Post {
    id: string,
    link: string,
    modified: string,
    slug: string,
    type: string,
    title: PostTitle,
    content: PostContent,
    author: number,
    featured_media: number,
    categories: number[],
    tags: number[]
}

export interface Page {
    id: number,
    link: string,
    modified: string,
    slug: string,
    type: string,
    title: PostTitle,
    content: PostContent,
    author: number,
    featured_media: number
}

export interface Image {
    postId: number,
    postTitle: string,
    tags: number[],
    tagNames: string[],
    fullImageUrl: string,
    width: number,
    height: number
}

export interface ScreenInfo {
    width: number,
    height: number
}

export interface SiteInfo {
    siteName: string,
    siteUrl: string
}

export interface Store {
    menuState: string,
    applicationRoot: HTMLElement
    screenInfo: ScreenInfo,
    siteInfo: SiteInfo,
    visiblePost: Image,
    categoryList: Category[],
    currentCategoryPosts: Post[],
    currentCategoryDate: Category,
    pages: Page[],
    currentPageData: Page,
    maxItemsPerPage: number
}
