import { render } from '@testing-library/react';
import CategoryTitle from 'components/CategoryTitle/CategoryTitle';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const name = 'Test Category';

test('CategoryTitle displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <CategoryTitle title={name} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
