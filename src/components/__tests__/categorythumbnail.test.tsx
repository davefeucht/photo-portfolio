import { render, waitFor } from '@testing-library/react';
import CategoryThumbnail from 'components/CategoryThumbnail/CategoryThumbnail';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StateStore from 'StateStore/store';
import { ApiContext } from 'utils/ApiContext';
import WordpressAPI from 'utils/WordpressAPI';

const id = 5;
const name = 'Test Category';

jest.mock('../../utils/WordpressAPI');

test('CategoryThumbnail displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    const { container } = render(
        <MemoryRouter>
            <ApiContext.Provider value={api}>
                <CategoryThumbnail id={id} name={name} />
            </ApiContext.Provider>
        </MemoryRouter>
    );
    await waitFor(() => expect(container.firstChild).toMatchSnapshot());
});
