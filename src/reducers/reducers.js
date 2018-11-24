import { combineReducers } from "redux";
import { VisibilityFilters, SET_SHOWALLPOSTS, SET_SHOWALLCATEGORIES, SET_SITE_NAME, SET_CATEGORY_TO_SHOW, SET_POST_TO_SHOW, SET_CATEGORY_LIST, SET_CATEGORY_POSTS, SET_CATEGORY_DATA, SET_FULLIMAGE_URL, SET_THUMBNAILIMAGE_URL } from "../actions/actions.js";

const initialState = {
  siteName: "",
  siteUrl: "throughapinhole.com",
  categoryList: [],
  showAllCategories: VisibilityFilters.SHOW_ALL,
  showAllPosts: VisibilityFilters.SHOW_ALL,
  singleCategoryToShow: {categoryId: 1, name: ""},
  singlePostToShow: {postId: 1, name: "", full_image: ""},
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
    case SET_FULLIMAGE_URL:
      return Object.assign({}, state, {
        singlePostToShow: {postId: state.singlePostToShow.postId, name: state.singlePostToShow.name, full_image: action.image_url}
      })
    case SET_THUMBNAILIMAGE_URL:
      let temp_category_posts = state.currentCategoryPosts.slice();
      temp_category_posts[action.post_index].thumbnail_image = action.image_url;
      return Object.assign({}, state, {
        currentCategoryPosts: temp_category_posts
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