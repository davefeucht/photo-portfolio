import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PaginationNavigationItem from '../PaginationNavigationItem/PaginationNavigationItem';

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
