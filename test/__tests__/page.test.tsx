import { render } from '@testing-library/react';
import Page from 'components/Page/Page';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

jest.mock('../../utils/WordpressAPI');

test('Page displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/page/150']}>
            <StoreContext.Provider value={store}>
                <Routes>
                    <Route
                        path="page/:pageId"
                        element={(
                            <Page />
                        )}
                    />
                </Routes>
            </StoreContext.Provider>
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
