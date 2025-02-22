/** *****************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
****************** */

import './PhotoPortfolio.css';

import Categories from 'components/Categories/Categories';
import Category from 'components/Category/Category';
import Menu from 'components/Menu/Menu';
import Page from 'components/Page/Page';
import Post from 'components/Post/Post';
import TitleBar from 'components/TitleBar/TitleBar';
import { observer } from 'mobx-react';
import * as React from 'react';
import { useEffect } from 'react';
import {
    Route,
    Routes,
    useParams
} from 'react-router-dom';
import { StoreContext } from 'utils/StoreContext';
import { Store } from 'utils/types';

interface PhotoPortfolioProps {
    stateStore: Store
}

const PhotoPortfolio: React.FC<PhotoPortfolioProps> = ({ stateStore }) => {
    const { categoryId, pageId } = useParams();

    const setColumns = (width: number, height: number) => {
        if ((width < height)) {
            document.body.style.setProperty('--number-of-columns', '2');
        } else {
            document.body.style.setProperty('--number-of-columns', '5');
        }
    };

    const updateScreenSize = () => {
        stateStore.setScreenInfo(window.innerWidth, window.innerHeight);
        setColumns(window.innerWidth, window.innerHeight);
    };

    useEffect(() => {
        stateStore.getCategories();
        stateStore.getPages();

        stateStore.setScreenInfo(window.innerWidth, window.innerHeight);
        setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height);
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        }
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
            </div>
        </StoreContext.Provider>
    );
};

PhotoPortfolio.displayName = 'PhotoPortfolio';

export default observer(PhotoPortfolio);
