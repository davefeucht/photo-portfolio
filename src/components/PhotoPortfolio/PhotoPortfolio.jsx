/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import { action } from 'mobx';
import { observer } from 'mobx-react';
import axios from 'axios';
import TitleBar from "../TitleBar/TitleBar.jsx";
import Categories from "../Categories/Categories.jsx";
import Category from "../Category.jsx";
import Footer from "../Footer/Footer.jsx";
import './PhotoPortfolio.css';

const PhotoPortfolio = observer(({ stateStore }) => {
  const _fetchSiteData = () => {
    const getSiteInformationURI = `https://${stateStore.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        action(() => {
          stateStore.setSiteName(response.name);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  };

  _fetchSiteData();

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

export default PhotoPortfolio;