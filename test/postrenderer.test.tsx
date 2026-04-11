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
        const onLoad = jest.fn();

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
        expect(onLoad).toHaveBeenCalledTimes(2);
    });

    it('Calls onload when screen size changes', async () => {
        const onLoad = jest.fn();

        const { rerender } = render(
            <MemoryRouter initialEntries={['/post/1']}>
                <PostRenderer
                    onClose={jest.fn()}
                    previousPost={0}
                    nextPost={2}
                    visiblePost={visiblePost}
                />
            </MemoryRouter>
        );

        expect(onLoad).toHaveBeenCalledTimes(2);

        rerender(
            <MemoryRouter initialEntries={['/post/1']}>
                <PostRenderer
                    onClose={jest.fn()}
                    previousPost={0}
                    nextPost={2}
                    visiblePost={visiblePost}
                />
            </MemoryRouter>
        )

        await waitFor(() => expect(screen.getByText(visiblePost.postTitle)).toBeInTheDocument());
        await waitFor(() => expect(onLoad).toHaveBeenCalledTimes(3));
    });
});