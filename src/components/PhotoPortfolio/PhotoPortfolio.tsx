/** *****************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
****************** */

import './PhotoPortfolio.css';

import { reaction, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import {
    Route,
    Routes,
    useParams
} from 'react-router-dom';

import { ApiContext } from '../../utils/ApiContext';
import { API, Store } from '../../utils/types';
import Categories from '../Categories/Categories';
import Category from '../Category/Category';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Page from '../Page/Page';
import Post from '../Post/Post';
import TitleBar from '../TitleBar/TitleBar';

interface PhotoPortfolioProps {
    stateStore: Store,
    api: API
}

const PhotoPortfolio: React.FC<PhotoPortfolioProps> = ({ stateStore, api }) => {
    const { categoryId, pageId } = useParams();

    const setScreenSize = () => {
        runInAction(() => {
            stateStore.screenInfo.width = stateStore.applicationRoot?.clientWidth;
            stateStore.screenInfo.height = stateStore.applicationRoot?.clientHeight;
        });
    };

    const setColumns = (width: number, height: number) => {
        if ((width < height)) {
            document.body.style.setProperty('--number-of-columns', '2');
        } else {
            document.body.style.setProperty('--number-of-columns', '5');
        }
    };

    useEffect(() => {
        window.addEventListener('resize', setScreenSize.bind(this));
        api.getCategories()
            .then(categories => {
                stateStore.setCategoryList(categories);
            });
        api.getPages()
            .then(pages => {
                stateStore.setPages(pages);
            });

        setScreenSize();
        setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height);
        const disposer = reaction(
            () => [stateStore.applicationRoot?.clientWidth, stateStore.applicationRoot?.clientHeight],
            () => setScreenSize()
        );
        const disposer2 = reaction(
            () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
            () => setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height)
        );
        return () => {
            window.removeEventListener('resize', setScreenSize);
            disposer();
            disposer2();
        };
    }, []);

    return (
        <ApiContext.Provider value={api}>
            <div className="app">
                <TitleBar stateStore={stateStore} />
                <div className="photo-portfolio">
                    <Routes>
                        <Route
                            path="/"
                            element={(
                                <Categories
                                    maxItemsPerPage={stateStore.maxItemsPerPage}
                                    screenInfo={stateStore.screenInfo}
                                    categoryList={stateStore.categoryList}
                                />
                            )}
                        />
                        <Route
                            path="page/:pageId"
                            element={(
                                <Page
                                    key={pageId}
                                    currentPageData={stateStore.currentPageData}
                                    setPageData={stateStore.setPageData}
                                />
                            )}
                        />
                        <Route
                            path="category/:categoryId"
                            element={(
                                <Category
                                    key={categoryId}
                                    maxItemsPerPage={stateStore.maxItemsPerPage}
                                    screenInfo={stateStore.screenInfo}
                                    currentCategoryPosts={stateStore.currentCategoryPosts}
                                    currentCategoryData={stateStore.currentCategoryData}
                                    setCategoryPosts={stateStore.setCategoryPosts}
                                    setCategoryData={stateStore.setCategoryData}
                                    setThumbnailImageUrl={stateStore.setThumbnailImageUrl}
                                />
                            )}
                        >
                            <Route
                                path="post/:postId"
                                element={(
                                    <Post
                                        screenInfo={stateStore.screenInfo}
                                        visiblePost={stateStore.visiblePost}
                                        currentCategoryPosts={stateStore.currentCategoryPosts}
                                        clearVisiblePostTagNames={stateStore.clearVisiblePostTagNames}
                                        setCurrentPost={stateStore.setCurrentPost}
                                    />
                                )}
                            />
                        </Route>
                    </Routes>
                </div>
                <Menu stateStore={stateStore} />
                <Footer />
            </div>
        </ApiContext.Provider>
    );
};

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default observer(PhotoPortfolio);
