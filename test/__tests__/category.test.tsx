import { render, waitFor } from '@testing-library/react';
import Category from 'components/Category/Category';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { ApiContext } from 'utils/ApiContext';
import WordpressAPI from 'utils/WordpressAPI';

const screenInfo = {
    width: 500,
    height: 500
};

jest.mock('../../utils/WordpressAPI');

const setCategoryPostsMock = jest.fn();
const setCategoryDataMock = jest.fn();
const setThumbnailImageUrlMock = jest.fn();

test('Category displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const posts = await api.getPosts(35);
    const category = await api.getCategoryInfo(35);
    const { container } = render(
        <MemoryRouter initialEntries={['/category/35']}>
            <ApiContext.Provider value={api}>
                <Routes>
                    <Route
                        path="category/:categoryId"
                        element={(
                            <Category
                                maxItemsPerPage={2}
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
    );
    await waitFor(() => {
        expect(setCategoryPostsMock).toHaveBeenCalledTimes(1);
        expect(setCategoryDataMock).toHaveBeenCalledTimes(1);
        expect(setThumbnailImageUrlMock).toHaveBeenCalledTimes(2);
    });
    expect(container.firstChild).toMatchSnapshot();
});
