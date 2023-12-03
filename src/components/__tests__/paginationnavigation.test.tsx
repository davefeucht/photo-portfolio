import { render } from '@testing-library/react';
import PaginationNavigation from 'components/PaginationNavigation/PaginationNavigation';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const totalPages = 14;
const currentPageIndex = 1;
const navigationFunction = jest.fn();

test('PaginationNavigation displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <PaginationNavigation totalPages={totalPages} currentPageIndex={currentPageIndex} navigationFunction={navigationFunction} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
