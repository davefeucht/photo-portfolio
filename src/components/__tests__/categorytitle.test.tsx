import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import CategoryTitle from '../CategoryTitle/CategoryTitle';

const name = 'Test Category';

test('CategoryTitle displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <CategoryTitle title={name} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
