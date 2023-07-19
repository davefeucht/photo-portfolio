import { render, screen } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import Categories from '../Categories/Categories';

const screenInfo = {
    width: 500,
    height: 500
};

const siteInfo = {
    siteName: 'Through a Pinhole',
    siteUrl: 'throughapinhole.com'
};

jest.mock('../../utils/WordpressAPI');

test('Category list displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const categories = await api.getCategories();
    store.setCategoryList(categories);
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <ApiContext.Provider value={api}>
                    <Routes>
                        <Route
                            path="/"
                            element={(
                                <Categories
                                    maxItemsPerPage={10}
                                    screenInfo={screenInfo}
                                    categoryList={categories}
                                    siteInfo={siteInfo}
                                />
                            )}
                        />
                    </Routes>
                </ApiContext.Provider>
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
    categories.forEach(category => {
        expect(screen.getByText(category.name));
    });
});
