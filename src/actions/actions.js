export const TOGGLE_SHOWALLPOSTS = "TOGGLE_SHOWALLPOSTS";
export const TOGGLE_SHOWALLCATEGORIES = "TOGGLE_SHOWALLCATEGORIES";
export const SET_SITE_NAME = "SET_SITE_NAME";
export const SET_CATEGORY_TO_SHOW = "SET_CATEGORY_TO_SHOW";
 
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

export const toggleShowAllPosts = showStatus => {
  return {
    type: TOGGLE_SHOWALLPOSTS,
    showAll: showStatus
  }
}

export const toggleShowAllCategories = showStatus => {
  return {
    type: TOGGLE_SHOWALLCATEGORIES,
    showAll: showStatus
  }
}

export const setSingleCategoryToShow = category => {
  return {
    type: SET_CATEGORY_TO_SHOW,
    category: category
  }
}