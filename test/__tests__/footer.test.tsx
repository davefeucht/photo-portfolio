import { render } from '@testing-library/react';
import Footer from 'components/Footer/Footer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

test('Footer displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
