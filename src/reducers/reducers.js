import { combineReducers } from "redux";
import { VisibilityFilters, SET_SHOWALLPOSTS, SET_SHOWALLCATEGORIES, SET_SITE_NAME, SET_CATEGORY_TO_SHOW, SET_POST_TO_SHOW, SET_CATEGORY_LIST, SET_CATEGORY_POSTS, SET_CATEGORY_DATA, SET_POST_URLS } from "../actions/actions.js";

const initialState = {
  siteName: "",
  siteUrl: "throughapinhole.com",
  categoryList: [],
  showAllCategories: VisibilityFilters.SHOW_ALL,
  showAllPosts: VisibilityFilters.SHOW_ALL,
  singleCategoryToShow: {categoryId: 1, name: ""},
  singlePostToShow: {postId: 1, name: "", thumbnail_image: "", full_image: ""},
  currentCategoryPosts: [],
  currentCategoryData: {},
  onClickCategory: {}
};

function applicationState (state = initialState, action) {
  switch(action.type) {
    case SET_SITE_NAME:
      return Object.assign({}, state, {
        siteName: action.siteName
      });
    case SET_CATEGORY_LIST:
      return Object.assign({}, state, {
        categoryList: action.categoryList
      })
    case SET_CATEGORY_POSTS:
      return Object.assign({}, state, {
        currentCategoryPosts: action.postList
      })
    case SET_CATEGORY_DATA:
      return Object.assign({}, state, {
        currentCategoryData: action.categoryData
      })
    case SET_POST_URLS:
      return Object.assign({}, state, {
        singlePostToShow: {postId: state.singlePostToShow.postId, name: state.singlePostToShow.name, thumbnail_image: action.image_urls.thumbnail_image, full_image: action.image_urls.full_image}
      })
    default:
      return state;
  }
}

function visibilityFilter (state = initialState, action) {
  switch(action.type) {
    case SET_SHOWALLPOSTS:
      return Object.assign({}, state, {
        showAllPosts: action.showAll
      });
    case SET_SHOWALLCATEGORIES:
      return Object.assign({}, state, {
        showAllCategories: action.showAll
      });
    case SET_CATEGORY_TO_SHOW:
      return Object.assign({}, state, {
        singleCategoryToShow: action.category
      });
    case SET_POST_TO_SHOW:
      return Object.assign({}, state, {
        singlePostToShow: action.post
      });
    default:
      return state;
  }
}

const photoPortfolioState = combineReducers({
  applicationState,
  visibilityFilter 
});

export default photoPortfolioState