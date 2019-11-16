/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React from "react";
import { observer } from 'mobx-react';
import axios from "axios";
import TitleBar from "../TitleBar/TitleBar.jsx";
import Categories from "../Categories.jsx";
import Category from "../Category.jsx";
import Footer from "../Footer/Footer.jsx";
import './PhotoPortfolio.css';

const PhotoPortfolio = observer((props) => {
  const _getSiteInformation = () => {
    const getSiteInformationURI = `https://${props.stateStore.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        const siteName = response.data.name;
        props.stateStore.setSiteName(siteName);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  //Method to display a single category when one is clicked on.
  const _showSpecificCategory = (categoryId, categoryName) => {
    props.stateStore.setShowAllCategories(false);
    props.stateStore.setVisibleCategory({categoryId, categoryName})
  }
  
  _getSiteInformation();

  let contentToDisplay = <Categories showSingleCategory={_showSpecificCategory.bind(this)} />
  
  if(!props.stateStore.showAllCategories) {
    contentToDisplay = <Category 
      key={props.stateStore.singleCategoryToShow.categoryId.toString()} 
      categoryId={props.stateStore.singleCategoryToShow.categoryId} 
      name={props.stateStore.singleCategoryToShow.categoryName} 
      site={props.stateStore.siteUrl} 
    />; 
  }
  
  return (
    <div className="app">
      <TitleBar stateStore={props.stateStore} />
      <div className="photo-portfolio">
        {contentToDisplay}
      </div>
      <Footer />
    </div>
  );
});

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default (PhotoPortfolio);