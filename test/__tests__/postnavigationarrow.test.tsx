import { render } from '@testing-library/react';
import PostNavigationArrow from 'components/PostNavigationArrow/PostNavigationArrow';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

const direction = 'previous';
const postId = 35;

test('PostNavigationArrow displays', async () => {
    const { container } = render(
        <MemoryRouter>
            <PostNavigationArrow direction={direction} postId={postId} />
        </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
});
