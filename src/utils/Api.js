import axios from 'axios';
import { runInAction } from 'mobx';

export default class API {
  constructor(stateStore) {
    this._stateStore = stateStore;
  }

  getSiteInfo() {
    const getSiteInformationURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then(response => {
        runInAction(() => {
          this._stateStore.setSiteName(response.data.name);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  }

  getCategories() {
    const getCategoriesURI = `https://${this._stateStore.siteInfo.siteUrl}/wp-json/wp/v2/categories?exclude=175`;

    axios.get(getCategoriesURI)
      .then(response => {
        runInAction(() => {
          const categories = response.data;
          this._stateStore.setCategoryList(categories);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  }
}