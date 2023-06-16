import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PaginationNavigation from '../PaginationNavigation/PaginationNavigation';

const totalPages = 14;
const currentPageIndex = 1;
const navigationFunction = () => {};

test('PaginationNavigation displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PaginationNavigation totalPages={totalPages} currentPageIndex={currentPageIndex} navigationFunction={navigationFunction} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
