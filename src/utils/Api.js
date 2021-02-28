import axios from 'axios';
import { runInAction } from 'mobx';

export default class API {
  constructor(stateStore) {
    this._stateStore = stateStore;
  }
  
  _getPostThumbnail(featuredImage, index) {
    const getPostThumbnailURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/media/${featuredImage}`;
    axios.get(getPostThumbnailURI)
      .then(res => {
        runInAction(() => {
          let thumbnailImage = new Image();
          const size = res.data.media_details.large ? 'large' : 'full';
          const thumbnailUrl = res.data.media_details.sizes[size].source_url;
          this._stateStore.setThumbnailImageUrl({post_index: index, image_url: thumbnailUrl});
          thumbnailImage.src = thumbnailUrl;
        })
      });
  }

  getSiteInfo() {
    const getSiteInformationURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        runInAction(() => {
          this._stateStore.setSiteName(response.data.name);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  }

  getCategories() {
    const getCategoriesURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/categories?exclude=175`;

    axios.get(getCategoriesURI)
      .then(response => {
        runInAction(() => {
          const categories = response.data;
          this._stateStore.setCategoryList(categories);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  }

  //Function to get a random post image URL for the category
  getCategoryImage(categoryId, index) {
    //Define the request string to get the posts for this category
    const getCategoryPostURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}`;
    //Make the request
    axios.get(getCategoryPostURI) 
      .then((response) => {
        //Determine a random post from the ones returned
        const numberOfPosts = response.data.length;
        const randomPost = Math.floor((Math.random() * numberOfPosts));

        //If this post does exist in the returned results
        if(response.data[randomPost] !== undefined) {
          //Define the request string to get the featured media for the random post
          const getCategoryImage = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/media/${response.data[randomPost].featured_media}/`; 
          //Make the request
          axios.get(getCategoryImage)
            .then(response => {
              runInAction(() => {
                let fullImageUrl = '';

                //If the large size image exists, use it
                if(response.data.media_details.sizes.large) {
                  fullImageUrl = response.data.media_details.sizes.large.source_url;
                }
                //Otherwise use the medium size version
                else {
                  fullImageUrl = response.data.media_details.sizes.medium.source_url;
                }
                
                this._stateStore.categoryList[index].thumbnail_image = fullImageUrl;
              })
            })
        }
      })
  }

  getPosts(categoryId) {
    const getPostsURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/posts?categories=${categoryId}&per_page=20`;
    axios.get(getPostsURI)
      .then(res => {
        runInAction(() => {
          const posts = res.data;
          this._stateStore.setCategoryPosts(posts);
        });
      })
      .then(() => {
        this._stateStore.currentCategoryPosts.forEach((post, index) => {
          this._getPostThumbnail(post.featured_media, index);
        })
      });
  }

  getPost(postId) {
    const getPostURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/posts/${postId}`;
    axios.get(getPostURI)
      .then(res => {
        runInAction(() => {
          const post = res.data;
          this._stateStore.setCurrentPost(post);
        });
      })
      .then(() => {
        this.getTagNames(this._stateStore.visiblePost.tags);
      })
      .then(() => {
        this.getPostImage(this._stateStore.visiblePost.featured_media);
      });
  }

  getCategoryInfo(categoryId) {
    const getPostsCategoryURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/categories/${categoryId}`; 
    axios.get(getPostsCategoryURI)
      .then(res => {
        runInAction(() => {
          const categoryData = res.data;
          this._stateStore.setCategoryData(categoryData);
        });
      });
  }

  getPostImage(image) {
    const getPostImageURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/media/${image}`; 
    axios.get(getPostImageURI)
      .then(res => {
        runInAction(() => {
          let thumbnailImage = new Image();
          let fullImage = new Image();
          const thumbnailUrl = res.data.media_details.sizes.thumbnail.source_url;
          const fullImageUrl = res.data.media_details.sizes.full.source_url;
          this._stateStore.setVisiblePostImage(fullImageUrl);
          thumbnailImage.src = thumbnailUrl;
          fullImage.src = fullImageUrl;
        })
      });
  }

  getTagNames(tags) {
    runInAction(() => {
      this._stateStore.visiblePost.tagNames.clear();
    })
    tags.forEach(tagId => {
      const getTagNameURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/tags/${tagId}`
      axios.get(getTagNameURI)
        .then(res => {
          runInAction(() => {
            this._stateStore.visiblePost.tagNames.push(res.data.name);
          })
        })
    });
  }
}
