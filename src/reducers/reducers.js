import { combineReducers } from "redux";
import { VisibilityFilters, TOGGLE_SHOWALLPOSTS } from "../actions/actions.js";

const initialState = {
  showAll: VisibilityFilters.SHOW_ALL
};

function visibilityFilter (state = initialState, action) {
  switch(action.type) {
    case TOGGLE_SHOWALLPOSTS:
      return Object.assign({}, state, {
        showAll: action.showAll
      });
    default:
      return state;
  }
}

const photoPortfolio  = combineReducers({
  visibilityFilter
});

export default photoPortfolio;