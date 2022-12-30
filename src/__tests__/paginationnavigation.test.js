import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PaginationNavigation from '../components/PaginationNavigation/PaginationNavigation';

const totalPages = 14;
const currentPageIndex = 1;
const navigationFunction = () => {};

test('PaginationNavigation displays', async () => {
    let component;
    let tree;
    component = renderer.create(
        <MemoryRouter>
            <PaginationNavigation totalPages={totalPages} currentPageIndex={currentPageIndex} navigationFunction={navigationFunction} />
        </MemoryRouter>
    );
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
