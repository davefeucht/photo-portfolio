import { combineReducers } from "redux";
import { VisibilityFilters, SET_SHOWALLPOSTS, SET_SHOWALLCATEGORIES, SET_SITE_NAME, SET_CATEGORY_TO_SHOW, SET_CATEGORY_LIST } from "../actions/actions.js";

const initialState = {
  siteName: "",
  siteUrl: "throughapinhole.com",
  categoryList: [],
  showAllCategories: VisibilityFilters.SHOW_ALL,
  showAllPosts: VisibilityFilters.SHOW_ALL,
  singleCategoryToShow: {id: 1, name: ""},
  currentCategoryPosts: [],
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
    default:
      return state;
  }
}

const photoPortfolioState = combineReducers({
  applicationState,
  visibilityFilter 
});

export default photoPortfolioState