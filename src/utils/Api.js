import axios from 'axios';
import { runInAction } from 'mobx';

export default class API {
  constructor(stateStore) {
    this._stateStore = stateStore;
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
        const randomPost = Math.floor((Math.random() * (numberOfPosts + 1)));

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
}