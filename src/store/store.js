import { observable, action, configure } from 'mobx';

configure({ enforceActions: 'observed' });

export default class stateStore {
  siteInfo = observable.object({
    siteName: null,
    siteUrl: 'throughapinhole.com'
  });
  visibleCategory = observable.object({
    categoryId: 1,
    name: null
  });
  visiblePost = observable.object({
    postId: 1,
    name: null,
    full_image: null
  });
  visibilityFlags = observable.object({
    showAllCategories: true,
    showAllPosts: true
  })
  categoryList = observable.array([]);
  currentCategoryPosts = observable.array([]);
  currentCategoryData = observable.object({});

  @action setSiteName = (name) => {
    this.siteInfo.siteName = name;
  }

  @action setShowAllCategories = (value) => {
    this.visibilityFlags.showAllCategories = value;
  }

  @action setShowAllPosts = (value) => {
    this.visibilityFlags.showAllPosts = value;
  }

  @action setVisibleCategory = (categoryId) => {
    this.visibleCategory.categoryId = categoryId;
  }
  
  @action setVisiblePost = (postId) => {
    this.visiblePost.postId = postId;
  }

  @action setCategoryList = (categories) => {
    categories.forEach((category, index) => {
      this.categoryList[index] = category;
    })
  }

  @action setCategoryPosts = (posts) => {
    posts.forEach((post, index) => {
      this.currentCategoryPosts[index] = post;
    })
  }

  @action setCategoryData = (categoryData) => {
    this.currentCategoryData = categoryData;
  }

  @action setThumbnailImageUrl = (imageData) => {
    this.currentCategoryPosts[imageData.post_index].thumbnail_image = imageData.image_url;
  }

}