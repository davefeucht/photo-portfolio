import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PaginationNavigationItem from '../components/PaginationNavigationItem/PaginationNavigationItem';

const content = '1';
const selectedState = 'selected';
const navigationFunction = () => {};
const isLast = false;

test('PaginationNavigationItem displays', async () => {
    const component = renderer.create(
        <MemoryRouter>
            <PaginationNavigationItem content={content} selectedState={selectedState} navigationFunction={navigationFunction} isLast={isLast} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
