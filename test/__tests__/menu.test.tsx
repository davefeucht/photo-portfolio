import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Menu from 'components/Menu/Menu';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import StateStore from 'StateStore/store';

describe('Menu', () => {
    it('Renders the menu', async () => {
        const store = new StateStore();
        const { container } = render(
            <MemoryRouter>
                <Menu stateStore={store} />
            </MemoryRouter>
        );
        expect(container.firstChild).toMatchSnapshot();
    });

    it('Toggles the menu state when clicked', async () => {
        const store = new StateStore();

        render(
            <MemoryRouter>
                <Menu stateStore={store} />
            </MemoryRouter>
        );

        expect(store.menuState).toEqual('closed');

        const homeLink = screen.getByText('Home');
        fireEvent.click(homeLink);

        await waitFor(() => expect(store.menuState).toEqual('open'));
    });
});
