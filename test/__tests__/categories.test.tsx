import { render, screen, waitFor } from '@testing-library/react';
import Categories from 'components/Categories/Categories';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';
import WordpressAPI from 'utils/WordpressAPI';

jest.mock('../../utils/WordpressAPI');

test('Category list displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const categories = await api.getCategories();
    store.setCategoryList(categories);
    const { container } = render(
        <MemoryRouter>
            <StoreContext.Provider value={store}>
                <Routes>
                    <Route
                        path="/"
                        element={(
                            <Categories
                                categoryList={categories}
                            />
                        )}
                    />
                </Routes>
            </StoreContext.Provider>
        </MemoryRouter>
    );
    const categoryThumb = await screen.findByLabelText(`category-${categories[0].name.split(' ').join('-')}`);
    await waitFor(() => expect(categoryThumb.style.backgroundImage).toEqual('url(https://throughapinhole.com/wp-content/uploads/2018/07/DSC_1508.jpg)'));
    expect(container.firstChild).toMatchSnapshot();
    categories.forEach(category => {
        expect(screen.getByText(category.name));
    });
});
