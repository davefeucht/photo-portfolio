import axios from 'axios';
import { runInAction } from 'mobx';

export const getPostThumbnail = (featuredImage, index, stateStore) => {
    const getPostThumbnailURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/media/${featuredImage}`;
    axios.get(getPostThumbnailURI)
    .then(res => {
        runInAction(() => {
            let thumbnailImage = new Image();
            const size = res.data.media_details.large ? 'large' : 'full';
            const thumbnailUrl = res.data.media_details.sizes[size].source_url;
            stateStore.setThumbnailImageUrl({post_index: index, image_url: thumbnailUrl});
            thumbnailImage.src = thumbnailUrl;
        })
    });
};

export const getSiteInfo = stateStore => {
    const getSiteInformationURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
    .then(response => {
        runInAction(() => {
            stateStore.setSiteName(response.data.name);
            document.title = response.data.name;
        })
    })
    .catch(error => {
        console.warn(error.message);
    });
};

export const getCategories = stateStore => {
        const getCategoriesURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/categories?exclude=175`;

        axios.get(getCategoriesURI)
        .then(response => {
            runInAction(() => {
                const categories = response.data;
                stateStore.setCategoryList(categories);
            })
        })
        .catch(error => {
            console.warn(error.message);
        });
};

export const getCategoryImage = async (categoryId, stateStore) => {
    //Define the request string to get the posts for this category
    const getCategoryPostURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;

    // Var to return
    let fullImageUrl = '';

    //Make the request
    const response = await axios.get(getCategoryPostURI);
    const categories = response.data;

    //Determine a random post from the ones returned
    const numberOfPosts = categories.length;
    const randomPost = Math.floor((Math.random() * numberOfPosts));

    //If this post does exist in the returned results
    if (categories[randomPost] !== undefined) {
        //Define the request string to get the featured media for the random post
        const getCategoryImage = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/media/${categories[randomPost].featured_media}/`; 

        const response = await axios.get(getCategoryImage);
        const categoryImage = response.data;

        //If the large size image exists, use it
        if(categoryImage.media_details.sizes.large) {
            fullImageUrl = categoryImage.media_details.sizes.large.source_url;
        }

        //Otherwise use the medium size version
        else {
            fullImageUrl = categoryImage.media_details.sizes.medium.source_url;
        }
    }

    return fullImageUrl;
};

export const getPosts = (categoryId, stateStore) => {
    const getPostsURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20`;
    axios.get(getPostsURI)
    .then(res => {
        runInAction(() => {
            const posts = res.data;
            stateStore.setCategoryPosts(posts);
        });
    })
    .then(() => {
        stateStore.currentCategoryPosts.forEach((post, index) => {
            getPostThumbnail(post.featured_media, index, stateStore);
        })
    });
};

export const getPost = (postId, stateStore) => {
    const getPostURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/posts/${postId}`;
    axios.get(getPostURI)
    .then(res => {
        runInAction(() => {
            const post = res.data;
            stateStore.setCurrentPost(post);
        });
    })
    .then(() => {
        getTagNames(stateStore.visiblePost.tags, stateStore);
    })
    .then(() => {
        getPostImage(stateStore.visiblePost.featured_media, stateStore);
    });
};

export const getCategoryInfo = (categoryId, stateStore) => {
    const getPostsCategoryURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/categories/${categoryId}`; 
    axios.get(getPostsCategoryURI)
    .then(res => {
        runInAction(() => {
        const categoryData = res.data;
        stateStore.setCategoryData(categoryData);
        });
    });
};

export const getPostImage = (image, stateStore) => {
    const getPostImageURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/media/${image}`; 
    axios.get(getPostImageURI)
    .then(res => {
        runInAction(() => {
            let thumbnailImage = new Image();
            let fullImage = new Image();
            const thumbnailUrl = res.data.media_details.sizes.thumbnail.source_url;
            const fullImageUrl = res.data.media_details.sizes.full.source_url;
            stateStore.setVisiblePostImage(fullImageUrl);
            thumbnailImage.src = thumbnailUrl;
            fullImage.src = fullImageUrl;
        })
    });
};

export const getTagNames = (tags, stateStore) => {
    runInAction(() => {
        stateStore.visiblePost.tagNames.clear();
    })
    tags.forEach(tagId => {
    const getTagNameURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/tags/${tagId}`
    axios.get(getTagNameURI)
        .then(res => {
            runInAction(() => {
                stateStore.visiblePost.tagNames.push(res.data.name);
            })
        })
    });
};

export const getPages = stateStore => {
    const getPagesURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/pages`;
    axios.get(getPagesURI)
    .then(res => {
        runInAction(() => {
            const pages = res.data;
            stateStore.setPages(pages);
        });
    })
};

export const getPage = (pageId, stateStore) => {
    const getPagesURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/wp/v2/pages/${pageId}`;
    axios.get(getPagesURI)
    .then(res => {
        runInAction(() => {
            const page = res.data;
            stateStore.setPageData(page);
        });
    })
};
