import { render } from '@testing-library/react';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router-dom';

import CategoryTitle from '../CategoryTitle/CategoryTitle';

const name = 'Test Category';

test('CategoryTitle displays', async () => {
    let container;
    await act(async () => {
        container = render(
            <MemoryRouter>
                <CategoryTitle title={name} />
            </MemoryRouter>
        ).container;
    });
    expect(container.firstChild).toMatchSnapshot();
});
