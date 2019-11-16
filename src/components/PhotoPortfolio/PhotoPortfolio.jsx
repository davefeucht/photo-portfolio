/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import { observer } from 'mobx-react';
import TitleBar from "../TitleBar/TitleBar.jsx";
import Categories from "../Categories/Categories.jsx";
import Category from "../Category.jsx";
import Footer from "../Footer/Footer.jsx";
import './PhotoPortfolio.css';

const PhotoPortfolio = observer(({ stateStore }) => {
  stateStore.fetchSiteData();

  //Method to display a single category when one is clicked on.
  const _showSpecificCategory = (categoryId, categoryName) => {
    stateStore.setShowAllCategories(false);
    stateStore.setVisibleCategory({categoryId, categoryName})
  }

  let contentToDisplay = <Categories stateStore={stateStore} showSingleCategory={_showSpecificCategory.bind(this)} />
  
  if(!stateStore.showAllCategories) {
    contentToDisplay = <Category 
      key={stateStore.singleCategoryToShow.categoryId.toString()} 
      categoryId={stateStore.singleCategoryToShow.categoryId} 
      name={stateStore.singleCategoryToShow.categoryName} 
      site={stateStore.siteUrl} 
    />; 
  }
  
  return (
    <div className="app">
      <TitleBar siteName={stateStore.siteName} />
      <div className="photo-portfolio">
        {stateStore.showAllCategories ? 
          <Categories stateStore={stateStore} /> : 
          <Category 
            key={stateStore.singleCategoryToShow.categoryId.toString()} 
            categoryId={stateStore.singleCategoryToShow.categoryId} 
            name={stateStore.singleCategoryToShow.categoryName} 
            site={stateStore.siteUrl} 
          />
        }
      </div>
      <Footer />
    </div>
  );
});

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default (PhotoPortfolio);