import { combineReducers } from "redux";
import { VisibilityFilters, TOGGLE_SHOWALLPOSTS, TOGGLE_SHOWALLCATEGORIES, SET_SITE_NAME, SET_CATEGORY_TO_SHOW } from "../actions/actions.js";

const initialState = {
  siteName: "",
  siteUrl: "throughapinhole.com",
  showAllCategories: VisibilityFilters.SHOW_ALL,
  showAllPosts: VisibilityFilters.SHOW_ALL,
  singleCategoryToShow: {id: 1, name: ""},
  onClickCategory: {}
};

function setupApplication (state = initialState, action) {
  switch(action.type) {
    case SET_SITE_NAME:
      return Object.assign({}, state, {
        siteName: action.siteName
      });
    default:
      return state;
  }
}

function visibilityFilter (state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SHOWALLPOSTS:
      return Object.assign({}, state, {
        showAllPosts: action.showAll
      });
    case TOGGLE_SHOWALLCATEGORIES:
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
  setupApplication,
  visibilityFilter 
});

export default photoPortfolioState