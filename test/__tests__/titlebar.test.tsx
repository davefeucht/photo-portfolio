import { fireEvent, render, screen } from '@testing-library/react';
import TitleBar from 'components/TitleBar/TitleBar';
import * as React from 'react';
import StateStore from 'StateStore/store';
import { StoreContext } from 'utils/StoreContext';

jest.mock('utils/WordpressAPI');

describe("TitleBar", () => {
    it('Titlebar displays', async () => {
        const store = new StateStore();
        const { container } = render(
            <StoreContext.Provider value={store}>
                <TitleBar />
            </StoreContext.Provider>
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Should toggle the menu on click', () => {
        const store = new StateStore();
        render(
            <StoreContext.Provider value={store}>
                <TitleBar />
            </StoreContext.Provider>
        )

        expect(store.menuState).toEqual('closed');

        const hamburgerButton = screen.getByLabelText("hamburger-button");
        fireEvent.click(hamburgerButton);

        expect(store.menuState).toEqual('open');

        fireEvent.click(hamburgerButton);

        expect(store.menuState).toEqual('closed');
    })
});
