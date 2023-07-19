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

interface MediaSize {
    file: string,
    width: number,
    height: number,
    mime_type: string,
    source_url: string
}

type Media = 'image' | 'video' | 'text' | 'application' | 'audio';

export interface MediaResponse {
    data: {
        alt_text: string,
        author: number,
        caption: {
            rendered: string
        },
        comment_status: string,
        date: string,
        date_gmt: string,
        description: {
            rendered: string
        },
        guid: {
            rendered: string
        },
        id: number,
        link: string,
        media_details: {
            width: number,
            height: number,
            file: string,
            sizes: {
                full?: MediaSize,
                large?: MediaSize,
                medium?: MediaSize,
                medium_large?: MediaSize,
                thumbnail?: MediaSize
            },
            media_type: Media
        }
    }
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

export interface CategoryResponse {
    data: Category
}

export interface CategoriesResponse {
    data: Category[]
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
    id: number,
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

export interface PostResponse {
    data: Post
}

export interface PostsResponse {
    data: Post[]
}

export interface TagNameResponse {
    data: {
        name: string,
        link: string
    }
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

export interface PageResponse {
    data: Page
}

export interface PagesResponse {
    data: Page[]
}

export interface ScreenInfo {
    width: number,
    height: number
}

export interface SiteInfo {
    siteName: string,
    siteUrl: string
}

export interface SiteInfoResponse {
    data: {
        description: string,
        gmt_offset: string,
        home: string,
        name: string,
        site_icon: number,
        site_icon_url: string,
        site_logo: number,
        timezone_string: string,
        url: string
    }
}

export interface API {
    siteUrl: string,
    getPostThumbnail(featuredImage: number): Promise<string>,
    getSiteInfo(): Promise<string>,
    getCategories(): Promise<Category[]>,
    getCategoryImage(categoryId: number): Promise<string>,
    getPosts(categoryId: number): Promise<Post[]>,
    getPost(postId: number): Promise<Post>,
    getCategoryInfo(categoryId: number): Promise<Category>,
    getPostImage(image: number): Promise<string>,
    getTagNames(tags: number[]): Promise<string[]>,
    getPages(): Promise<Page[]>,
    getPage(pageId: number): Promise<Page>
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
