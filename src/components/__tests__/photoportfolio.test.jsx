import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import WordpressAPI from '../../utils/WordpressAPI';
import PhotoPortfolio from '../PhotoPortfolio/PhotoPortfolio';

jest.mock('../../utils/WordpressAPI');

test('PhotoPortfolio displays', async () => {
    const store = new StateStore();
    const api = new WordpressAPI(store.siteInfo.siteUrl);
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter initialEntries={['/category/35']}>
                <PhotoPortfolio stateStore={store} api={api} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
