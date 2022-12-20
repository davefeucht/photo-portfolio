const media = {
    142: {
        media_details: {
            width: 1280,
            height: 852,
            sizes: {
                full: {
                    source_url: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
                },
                large: {
                    source_url: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
                },
                medium: {
                    source_url: 'https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg'
                }
            }
        }
    }
};

const posts = [
    {
        id: 887,
        featured_media: 142,
        categories: [220]
    },
    {
        id: 824,
        featured_media: 820,
        categories: [220]
    }
];

export const getSiteInfo = siteUrl => {
    return new Promise((resolve, reject) => {
        if (!siteUrl) {
            reject({
                error: 'Request failed: site not found.'
            });
        }

        resolve('Through a Pinhole');
    });
}

export const getPostThumbnail = (featuredImage, siteUrl) => {
    return new Promise((resolve, reject) => {
        if (!siteUrl) {
            reject({
                error: 'Request failed: site not found.'
            });
        }
        if (media[featuredImage]) {
            const size = media[featuredImage].media_details.sizes.large ? 'large' : 'full';
            resolve(media[featuredImage].media_details.sizes[size].source_url);
        } else {
            reject({
                error: `Media with id ${featuredImage} not found.`
            });
        }
    });
};

export const getPosts = (categoryId, siteUrl) => {
    return new Promise((resolve, reject) => {
        if (!siteUrl) {
            reject({
                error: 'Request failed: site not found.'
            });
        }
        const matchingPosts = posts.filter(post => post.categories.includes(categoryId));

        resolve(matchingPosts);
    });
};

export const getCategoryImage = (categoryId, siteUrl) => {
    return new Promise((resolve, reject) => {
        if (!siteUrl) {
            reject({
                error: 'Request failed: site not found.'
            });
        }
        const matchingPost = posts.filter(post => post.categories.includes(categoryId))?.[0];
        if (!matchingPost) {
            reject({
                error: `No posts found in category ${categoryId}.`
            })
        } 
        const mediaId = matchingPost.featured_media;
        const size = media[mediaId].media_details.sizes.large ? 'large' : 'medium';
        resolve(media[mediaId].media_details.sizes[size].source_url);
    });
};
