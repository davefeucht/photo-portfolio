import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PaginationNavigation from '../PaginationNavigation/PaginationNavigation';

const totalPages = 14;
const currentPageIndex = 1;
const navigationFunction = () => {};

test('PaginationNavigation displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <PaginationNavigation totalPages={totalPages} currentPageIndex={currentPageIndex} navigationFunction={navigationFunction} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
