import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer/Footer';

test('Footer displays', async () => {
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
