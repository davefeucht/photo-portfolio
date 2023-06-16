import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import StateStore from '../../StateStore/store';
import Menu from '../Menu/Menu';

test('Menu displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter>
            <Menu stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
