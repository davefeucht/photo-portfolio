import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import Footer from '../Footer/Footer';

test('Footer displays', async () => {
    const component = renderer.create(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
