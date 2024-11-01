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
import { StoreContext } from 'utils/StoreContext';

import { Store } from '../../utils/types';
import Categories from '../Categories/Categories';
import Category from '../Category/Category';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import Page from '../Page/Page';
import Post from '../Post/Post';
import TitleBar from '../TitleBar/TitleBar';

interface PhotoPortfolioProps {
    stateStore: Store
}

const PhotoPortfolio: React.FC<PhotoPortfolioProps> = ({ stateStore }) => {
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
        stateStore.getCategories();
        stateStore.getPages();

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
        <StoreContext.Provider value={stateStore}>
            <div className="app">
                <TitleBar />
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
                                <Page key={pageId} />
                            )}
                        />
                        <Route
                            path="category/:categoryId"
                            element={(
                                <Category key={categoryId} />
                            )}
                        >
                            <Route
                                path="post/:postId"
                                element={(
                                    <Post />
                                )}
                            />
                        </Route>
                    </Routes>
                </div>
                <Menu stateStore={stateStore} />
                <Footer />
            </div>
        </StoreContext.Provider>
    );
};

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default observer(PhotoPortfolio);
