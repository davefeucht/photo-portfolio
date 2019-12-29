export default class Utils {
  constructor() {
    this.instance = null;
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new Utils();
      return this.instance;
    }
  }

  getSiteInfo() {
    const getSiteInformationURI = `https://${stateStore.siteInfo.siteUrl}/wp-json/`;

    axios.get(getSiteInformationURI)
      .then((response) => {
        runInAction(() => {
          stateStore.setSiteName(response.data.name);
        })
      })
      .catch(error => {
        console.warn(error.message);
      });
  }
}