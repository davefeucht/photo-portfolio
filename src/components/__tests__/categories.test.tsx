import { render, screen, waitFor } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import { ApiContext } from '../../utils/ApiContext';
import WordpressAPI from '../../utils/WordpressAPI';
import Categories from '../Categories/Categories';

const screenInfo = {
    width: 500,
    height: 500
};

jest.mock('../../utils/WordpressAPI');

test('Category list displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const categories = await api.getCategories();
    store.setCategoryList(categories);
    const { container } = render(
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
                            />
                        )}
                    />
                </Routes>
            </ApiContext.Provider>
        </MemoryRouter>
    );
    const categoryThumb = await screen.findByLabelText(`category-${categories[0].name.split(' ').join('-')}`);
    await waitFor(() => expect(categoryThumb).toHaveStyle('background-image: url(https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg)'));
    expect(container.firstChild).toMatchSnapshot();
    categories.forEach(category => {
        expect(screen.getByText(category.name));
    });
});
