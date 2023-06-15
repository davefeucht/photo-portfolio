import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import SectionHeader from '../SectionHeader/SectionHeader';

const title = 'Some Section';

test('SectionHeader displays', () => {
    const component = renderer.create(
        <MemoryRouter>
            <SectionHeader title={title} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
