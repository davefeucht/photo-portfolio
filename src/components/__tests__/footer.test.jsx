import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Footer from '../Footer/Footer';

test('Footer displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
