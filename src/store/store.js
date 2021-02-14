import { observable, action, configure, extendObservable } from 'mobx';

configure({ enforceActions: 'observed' });

export default class stateStore {
  @observable applicationRoot = null;
  @observable modalDiv = null;

  screenInfo = observable.object({
    width: 0,
    height: 0
  })

  siteInfo = observable.object({
    siteName: null,
    siteUrl: 'throughapinhole.com'
  });
  
  visibleCategory = observable.object({
    categoryId: 1,
    categoryName: null
  });

  visiblePost = observable.object({
    postId: 1,
    postTitle: null,
    tags: [],
    tagNames: [],
    fullImageUrl: null,
    width: null,
    height: null
  });

  visibilityFlags = observable.object({
    showAllCategories: true,
    showModal: false
  });

  categoryList = observable.array([]);
  currentCategoryPosts = observable.array([]);
  currentCategoryData = observable.object({});

  @action setApplicationRoot = element => {
    this.applicationRoot = element;
  }

  @action setModalDiv = element => {
    this.modalDiv = element;
  }

  @action setSiteName = (name) => {
    this.siteInfo.siteName = name;
  }

  @action setShowAllCategories = (value) => {
    this.visibilityFlags.showAllCategories = value;
  }

  @action setShowModal = (value) => {
    this.visibilityFlags.showModal = value;
  }

  @action setVisibleCategory = (categoryId, categoryName) => {
    this.visibleCategory.categoryId = categoryId;
    this.visibleCategory.categoryName = categoryName;
  }
  
  @action setVisiblePost = (postId, postTitle) => {
    this.visiblePost.postId = postId;
    this.visiblePost.postTitle = postTitle;
  }

  @action setVisiblePostImage = (fullImageUrl) => {
    this.visiblePost.fullImageUrl = fullImageUrl;
  }

  @action setCategoryList = (categories) => {
    this.categoryList.length = 0;
    categories.forEach((category, index) => {
      this.categoryList[index] = category;
    })
  }

  @action setCategoryPosts = (posts) => {
    this.currentCategoryPosts.length = 0;
    posts.forEach((post, index) => {
      this.currentCategoryPosts[index] = post;
    })
  }

  @action setCategoryData = (categoryData) => {
    extendObservable(this.currentCategoryData, categoryData);
  }

  @action setThumbnailImageUrl = (imageData) => {
    this.currentCategoryPosts[imageData.post_index].thumbnail_image = imageData.image_url;
  }

}