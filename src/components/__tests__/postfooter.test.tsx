import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PostFooter from '../PostFooter/PostFooter';

test('PostFooter displays', async () => {
    const tagNames = ['something', 'somethingelse'];
    const { container } = render(
        <MemoryRouter>
            <PostFooter tagNames={tagNames} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
