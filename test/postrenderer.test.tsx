import { render, screen, waitFor } from '@testing-library/react';
import PostRenderer from 'components/Post/PostRenderer';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { visiblePost } from './data/testData';

describe("PostRenderer", () => {
    it("Renders", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={['/post/1']}>
                <PostRenderer
                    onClose={jest.fn()}
                    previousPost={0}
                    nextPost={2}
                    visiblePost={visiblePost}
                />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText(visiblePost.postTitle)).toBeInTheDocument());
        expect(container).toMatchSnapshot();
    });

    it('Calls onload when image loads', async () => {
        render(
            <MemoryRouter initialEntries={['/post/1']}>
                <PostRenderer
                    onClose={jest.fn()}
                    previousPost={0}
                    nextPost={2}
                    visiblePost={visiblePost}
                />
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText(visiblePost.postTitle)).toBeInTheDocument());
    });
});