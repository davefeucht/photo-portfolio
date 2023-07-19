import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import Category from '../Category/Category';

const screenInfo = {
    width: 500,
    height: 500
};

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

jest.mock('../../utils/WordpressAPI');

const setCategoryPostsMock = jest.fn();
const setCategoryDataMock = jest.fn();
const setThumbnailImageUrlMock = jest.fn();

test('Category displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const posts = await api.getPosts();
    const category = await api.getCategoryInfo();
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/category/35']}>
                <ApiContext.Provider value={api}>
                    <Routes>
                        <Route
                            path="category/:categoryId"
                            element={(
                                <Category
                                    maxItemsPerPage={2}
                                    siteInfo={siteInfo}
                                    screenInfo={screenInfo}
                                    currentCategoryPosts={posts}
                                    currentCategoryData={category}
                                    setCategoryPosts={setCategoryPostsMock}
                                    setCategoryData={setCategoryDataMock}
                                    setThumbnailImageUrl={setThumbnailImageUrlMock}
                                />
                            )}
                        />
                    </Routes>
                </ApiContext.Provider>
            </MemoryRouter>
        ).container;
    });
    await waitFor(() => {
        expect(setCategoryPostsMock).toHaveBeenCalledTimes(1);
        expect(setCategoryDataMock).toHaveBeenCalledTimes(1);
        expect(setThumbnailImageUrlMock).toHaveBeenCalledTimes(2);
    });
    expect(container.firstChild).toMatchSnapshot();
});
