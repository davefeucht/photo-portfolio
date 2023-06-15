import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import PaginationNavigation from '../PaginationNavigation/PaginationNavigation';

const totalPages = 14;
const currentPageIndex = 1;
const navigationFunction = () => {};

test('PaginationNavigation displays', async () => {
    const component = renderer.create(
        <MemoryRouter>
            <PaginationNavigation totalPages={totalPages} currentPageIndex={currentPageIndex} navigationFunction={navigationFunction} />
        </MemoryRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
