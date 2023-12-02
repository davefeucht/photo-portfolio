import { render } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PostTitlebar from '../PostTitlebar/PostTitlebar';

const postTitle = 'Some Post';

test('PostTitlebar displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <PostTitlebar postTitle={postTitle} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
