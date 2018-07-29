export const SET_SHOWALLPOSTS = "TOGGLE_SHOWALLPOSTS";
export const SET_SHOWALLCATEGORIES = "TOGGLE_SHOWALLCATEGORIES";
export const SET_SITE_NAME = "SET_SITE_NAME";
export const SET_CATEGORY_TO_SHOW = "SET_CATEGORY_TO_SHOW";
export const SET_CATEGORY_LIST = "SET_CATEGORY_LIST";
 
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

export const setCategoryList = categoryList => {
  return {
    type: SET_CATEGORY_LIST,
    categoryList: categoryList
  }
}