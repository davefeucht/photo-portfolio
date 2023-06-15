import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import CloseButton from '../CloseButton/CloseButton';

test('CloseButton displays', async () => {
    const component = renderer.create(
        <MemoryRouter>
            <CloseButton />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
