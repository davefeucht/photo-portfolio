/*******************
* Top level PhotoPortfolio component. Sets up the base site URL and 
* loads the title bar and list of categories.
*******************/

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { reaction, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import {
    Route,
    Routes,
    useParams
} from 'react-router-dom';
import TitleBar from '../TitleBar/TitleBar.jsx';
import Menu from '../Menu/Menu.jsx';
import Categories from '../Categories/Categories.jsx';
import Category from '../Category/Category.jsx';
import Page from '../Page/Page.jsx';
import Post from '../Post/Post.jsx';
import Footer from '../Footer/Footer.jsx';
import './PhotoPortfolio.css';

const PhotoPortfolio = ({ stateStore, api }) => {
    const { categoryId, pageId } = useParams();

    const setScreenSize = () => {
        runInAction(() => {
            stateStore.screenInfo.width = stateStore.applicationRoot.clientWidth;
            stateStore.screenInfo.height = stateStore.applicationRoot.clientHeight;
        });
    };

    const setColumns = (width, height) => {
        if ((width < height)) {
            document.body.style.setProperty('--number-of-columns', 2);
        } else {
            document.body.style.setProperty('--number-of-columns', 5);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', setScreenSize.bind(this));
        api.getCategories();
        api.getPages();

        setScreenSize();
        setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height);
        const disposer = reaction(
            () => [stateStore.applicationRoot.clientWidth, stateStore.applicationRoot.clientHeight],
            () => setScreenSize(stateStore.applicationRoot.clientWidth, stateStore.applicationRoot.clientHeight)
        );
        const disposer2 = reaction(
            () => [stateStore.screenInfo.width, stateStore.screenInfo.height],
            () => setColumns(stateStore.screenInfo.width, stateStore.screenInfo.height)
        );
        return () => {
            window.removeEventListener('resize', setScreenSize);
            disposer();
            disposer2();
        }
    }, [])

    return (
        <div className="app">
            <TitleBar stateStore={stateStore} api={api.getSiteInfo} />
            <div className="photo-portfolio">
                <Routes>
                    <Route 
                        path='/' 
                        element={<Categories stateStore={stateStore} api={api} />} 
                    />
                    <Route 
                        path='page/:pageId' 
                        element={<Page key={pageId} stateStore={stateStore} api={api} />} 
                    />
                    <Route 
                        path={'category/:categoryId'} 
                        element={<Category key={categoryId} stateStore={stateStore} api={api} />} 
                    >
                        <Route 
                            path='post/:postId'
                            element={<Post stateStore={stateStore} api={api} />}
                        />
                    </Route>
                </Routes>
            </div>
            <Menu stateStore={stateStore} />
            <Footer />
        </div>
    );
};

PhotoPortfolio.displayName = 'PhotoPortfolio';

PhotoPortfolio.propTypes = {
    stateStore: PropTypes.object.isRequired,
    api: PropTypes.object.isRequired
};

export default observer(PhotoPortfolio);
