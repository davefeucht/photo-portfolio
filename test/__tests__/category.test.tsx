import { render, screen, waitFor } from '@testing-library/react';
import Category from 'components/Category/Category';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

import { categories } from '../data/testData';

jest.mock('../../src/utils/WordpressAPI');

beforeEach(() => {
    jest.clearAllMocks();
});

test('Category displays', async () => {
    const store = new StateStore();
    store.setCategoryList(categories)

    const { container } = render(
        <MemoryRouter initialEntries={['/category/1']}>
            <StoreContext.Provider value={store}>
                <Routes>
                    <Route
                        path="category/:categoryId"
                        element={(
                            <Category />
                        )}
                    />
                </Routes>
            </StoreContext.Provider>
        </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(categories[0].name)).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
});
