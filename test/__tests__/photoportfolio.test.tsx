import { render, screen, waitFor } from '@testing-library/react';
import PhotoPortfolio from 'components/PhotoPortfolio/PhotoPortfolio';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StateStore from 'StateStore/store';

import { categories } from '../data/testData';

jest.mock('../../utils/WordpressAPI');

test('PhotoPortfolio displays', async () => {
    const store = new StateStore();
    store.setCategoryList(categories)
    const { container } = render(
        <MemoryRouter initialEntries={['/']}>
            <PhotoPortfolio stateStore={store} />
        </MemoryRouter>
    );

    await waitFor(() => expect(screen.getAllByText(categories[0].name).length).not.toEqual(0));
    expect(container.firstChild).toMatchSnapshot();
});
