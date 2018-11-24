export const SET_SHOWALLPOSTS = "TOGGLE_SHOWALLPOSTS";
export const SET_SHOWALLCATEGORIES = "TOGGLE_SHOWALLCATEGORIES";
export const SET_SITE_NAME = "SET_SITE_NAME";
export const SET_CATEGORY_TO_SHOW = "SET_CATEGORY_TO_SHOW";
export const SET_POST_TO_SHOW = "SET_POST_TO_SHOW";
export const SET_CATEGORY_LIST = "SET_CATEGORY_LIST";
export const SET_CATEGORY_DATA = "SET_CATEGORY_DATA";
export const SET_CATEGORY_POSTS = "SET_CATEGORY_POSTS";
export const SET_SINGLE_POST = "SET_SINGLE_POST";
export const SET_POST_URLS = "SET_POST_URLS";
 
export const VisibilityFilters = {
  SHOW_ALL: true,
  SHOW_SINGLE: false 
}

export const setSiteName = siteName => {
  return {
    type: SET_SITE_NAME,
    siteName: siteName
  }
}

export const setShowAllPosts = showStatus => {
  return {
    type: SET_SHOWALLPOSTS,
    showAll: showStatus
  }
}

export const setShowAllCategories = showStatus => {
  return {
    type: SET_SHOWALLCATEGORIES,
    showAll: showStatus
  }
}

export const setSingleCategoryToShow = category => {
  return {
    type: SET_CATEGORY_TO_SHOW,
    category: category
  }
}

export const setSinglePostToShow = post => {
  return {
    type: SET_POST_TO_SHOW,
    post: post
  }
}

export const setCategoryList = categoryList => {
  return {
    type: SET_CATEGORY_LIST,
    categoryList: categoryList
  }
}

export const setCategoryPosts = postList => {
  return {
    type: SET_CATEGORY_POSTS,
    postList: postList
  }
}

export const setCategoryData = categoryData => {
  return {
    type: SET_CATEGORY_DATA,
    categoryData: categoryData
  }
}

export const setPostUrls = postUrls => {
  return {
    type: SET_POST_URLS,
    image_urls: postUrls
  }
}