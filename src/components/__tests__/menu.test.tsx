import { render } from '@testing-library/react';
import Menu from 'components/Menu/Menu';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StateStore from 'StateStore/store';

test('Menu displays', async () => {
    const store = new StateStore();
    const { container } = render(
        <MemoryRouter>
            <Menu stateStore={store} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
