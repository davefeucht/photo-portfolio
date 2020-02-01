/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import TitleBar from "../TitleBar/TitleBar.jsx";
import Categories from "../Categories/Categories.jsx";
import Category from "../Category/Category.jsx";
import Footer from "../Footer/Footer.jsx";
import './PhotoPortfolio.css';

const PhotoPortfolio = observer(({ stateStore, api }) => {
  useEffect(() => {
    api.getCategories();
    stateStore.setModalDiv(document.querySelector('.app'));
  })

  return (
    <div className="app">
      <TitleBar stateStore={stateStore} api={api}/>
      <div className="photo-portfolio">
        {stateStore.visibilityFlags.showAllCategories ? 
          <Categories stateStore={stateStore} api={api}/> : 
          <Category 
            key={stateStore.visibleCategory.categoryId.toString()} 
            stateStore={stateStore}
            categoryId={stateStore.visibleCategory.categoryId} 
            categoryName={stateStore.visibleCategory.categoryName}
            api={api}
          />
        }
      </div>
      <Footer />
    </div>
  );
});

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default PhotoPortfolio;