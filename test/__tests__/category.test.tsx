import { render, waitFor } from '@testing-library/react';
import Category from 'components/Category/Category';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

jest.mock('../../utils/WordpressAPI');

const setCategoryPostsMock = jest.fn();
const setCategoryDataMock = jest.fn();
const setThumbnailImageUrlMock = jest.fn();

test('Category displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/category/35']}>
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
    await waitFor(() => {
        expect(setCategoryPostsMock).toHaveBeenCalledTimes(1);
        expect(setCategoryDataMock).toHaveBeenCalledTimes(1);
        expect(setThumbnailImageUrlMock).toHaveBeenCalledTimes(2);
    });
    expect(container.firstChild).toMatchSnapshot();
});
