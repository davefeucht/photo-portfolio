/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import { observer } from 'mobx-react';
import TitleBar from "../TitleBar/TitleBar.jsx";
import Categories from "../Categories/Categories.jsx";
import Category from "../Category/Category.jsx";
import Footer from "../Footer/Footer.jsx";
import './PhotoPortfolio.css';

const PhotoPortfolio = observer(({ stateStore, api }) => {
  return (
    <div className="app">
      <TitleBar stateStore={stateStore} api={api}/>
      <div className="photo-portfolio">
        {stateStore.visibilityFlags.showAllCategories ? 
          <Categories stateStore={stateStore} api={api}/> : 
          <Category 
            key={stateStore.singleCategoryToShow.categoryId.toString()} 
            categoryId={stateStore.singleCategoryToShow.categoryId} 
            name={stateStore.singleCategoryToShow.categoryName} 
            site={stateStore.siteInfo.siteUrl} 
          />
        }
      </div>
      <Footer />
    </div>
  );
});

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default PhotoPortfolio;