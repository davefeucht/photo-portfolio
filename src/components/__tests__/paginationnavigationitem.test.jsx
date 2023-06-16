import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import PaginationNavigationItem from '../PaginationNavigationItem/PaginationNavigationItem';

const content = '1';
const selectedState = 'selected';
const navigationFunction = () => {};
const isLast = false;

test('PaginationNavigationItem displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <PaginationNavigationItem content={content} selectedState={selectedState} navigationFunction={navigationFunction} isLast={isLast} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
