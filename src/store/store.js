import { observable, action, configure } from 'mobx';
import axios from 'axios';

configure({ enforceActions: 'observed' });

export default class stateStore {
  @observable siteName = null;
  @observable siteUrl = 'throughapinhole.com';
  @observable showAllCategories = true;
  @observable showAllPosts = true;
  @observable visibleCategory = {categoryId: 1, name: ''};
  @observable visiblePost = {postId: 1, name: '', full_image: ''};
  categoryList = observable.array([]);
  currentCategoryPosts = observable.array([]);
  currentCategoryData = observable.object({});

  @action setSiteName = (name) => {
    this.siteName = name;
  }

  fetchSiteData = () => {
    const getSiteInformationURI = `https://${this.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        this.setSiteName(response.data.name);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  @action setShowAllCategories = (value) => {
    this.showAllCategories = value;
  }

  @action setShowAllPosts = (value) => {
    this.showAllPosts = value;
  }

  @action setVisibleCategory = (categoryId) => {
    this.visibleCategory = categoryId;
  }
  
  @action setVisiblePost = (postId) => {
    this.visibleCategory = postId;
  }

  @action setCategoryList = (categories) => {
    this.categoryList = categories;
  }

  @action setCategoryPosts = (posts) => {
    this.categoryPosts = posts;
  }

  @action setCategoryData = (categoryData) => {
    this.currentCategoryData = categoryData;
  }

}