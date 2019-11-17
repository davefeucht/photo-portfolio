/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import { observer } from 'mobx-react';
import axios from 'axios';
import TitleBar from "../TitleBar/TitleBar.jsx";
import Categories from "../Categories/Categories.jsx";
import Category from "../Category.jsx";
import Footer from "../Footer/Footer.jsx";
import './PhotoPortfolio.css';
import { runInAction } from "mobx";

const PhotoPortfolio = observer(({ stateStore }) => {
  const _fetchSiteData = () => {
    const getSiteInformationURI = `https://${stateStore.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        stateStore.setSiteName(response.data.name);
      })
      .catch(error => {
        console.log(error.message);
      })
  };

  _fetchSiteData();
  //stateStore.setSiteName("Cheesecake");

  return (
    <div className="app">
      <TitleBar stateStore={stateStore} />
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