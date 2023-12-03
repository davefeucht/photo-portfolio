import { render } from '@testing-library/react';
import PaginationNavigationItem from 'components/PaginationNavigationItem/PaginationNavigationItem';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const content = '1';
const selectedState = 'selected';
const navigationFunction = jest.fn();
const isLast = false;

test('PaginationNavigationItem displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <PaginationNavigationItem content={content} selectedState={selectedState} navigationFunction={navigationFunction} isLast={isLast} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
