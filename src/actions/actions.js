export const TOGGLE_SHOWALLPOSTS = "TOGGLE_SHOWALLPOSTS";

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_SINGLE: "SHOW_SINGLE"
}

export const toggleShowAllPosts = showAll => {
  return {
    type: TOGGLE_SHOWALLPOSTS,
    showAll: showAll
  }
}