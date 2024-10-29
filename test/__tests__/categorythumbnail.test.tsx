import { render, waitFor } from '@testing-library/react';
import CategoryThumbnail from 'components/CategoryThumbnail/CategoryThumbnail';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

const id = 5;
const name = 'Test Category';

jest.mock('../../utils/WordpressAPI');

test('CategoryThumbnail displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter>
            <StoreContext.Provider value={store}>
                <CategoryThumbnail id={id} name={name} />
            </StoreContext.Provider>
        </MemoryRouter>
    );
    await waitFor(() => expect(container.firstChild).toMatchSnapshot());
});
