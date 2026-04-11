import { render } from '@testing-library/react';
import PostTitlebar from 'components/PostTitlebar/PostTitlebar';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const postTitle = 'Some Post';

test('PostTitlebar displays', async () => {
    const onClose = jest.fn();
    const { container } = render(
        <MemoryRouter>
            <PostTitlebar postTitle={postTitle} onClose={onClose} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
