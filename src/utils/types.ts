export interface PostTitle {
    rendered: string
}

export interface PostContent {
    rendered: string,
    protected: boolean
}

export interface ImageData {
    post_index: number,
    image_url: string
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

export interface VisiblePost {
    postId: number,
    postTitle: string,
    tags: number[],
    tagNames: string[],
    fullImageUrl: string,
    width: number,
    height: number,
    featured_media: number
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
    tags: number[],
    thumbnail_image: string
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
    visiblePost: VisiblePost,
    categoryList: Category[],
    currentCategoryPosts: Post[],
    currentCategoryData: Category,
    pages: Page[],
    currentPageData: Page,
    maxItemsPerPage: number,
    setMenuState(state: string): void,
    toggleMenuState(): void,
    setApplicationRoot(element: HTMLElement): void,
    setSiteName(name: string): void,
    setVisiblePost(postId: number, postTitle: string): void,
    setVisiblePostImage(fullImageUrl: string): void,
    setVisiblePostTags(tagNames: string[]): void,
    clearVisiblePostTagNames(): void,
    setCategoryList(categories: Category[]): void,
    setCategoryPosts(posts: Post[]): void,
    setCategoryData(categoryData: Category): void,
    setThumbnailImageUrl(imageData: ImageData): void,
    setCurrentPost(postData: Post): void,
    setPages(pages: Page[]): void,
    setPageData(pageData: Page): void
}
