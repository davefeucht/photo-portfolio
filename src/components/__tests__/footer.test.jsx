import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import Footer from '../Footer/Footer';

test('Footer displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <Footer />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
