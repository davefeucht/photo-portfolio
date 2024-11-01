import { render, screen, waitFor } from '@testing-library/react';
import Page from 'components/Page/Page';
import * as React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

import { pages } from '../data/testData';

jest.mock('../../src/utils/WordpressAPI');

test('Page displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/page/1']}>
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

    await waitFor(() => expect(screen.getByText(pages[0].title.rendered)).toBeInTheDocument());
    expect(container.firstChild).toMatchSnapshot();
});
