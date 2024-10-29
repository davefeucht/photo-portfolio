import { render } from '@testing-library/react';
import PhotoPortfolio from 'components/PhotoPortfolio/PhotoPortfolio';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StateStore from 'StateStore/store';

jest.mock('../../utils/WordpressAPI');

test('PhotoPortfolio displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter initialEntries={['/category/35']}>
            <PhotoPortfolio stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
