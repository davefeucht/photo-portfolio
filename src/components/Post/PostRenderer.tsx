import { Dialog, DialogContent } from '@mui/material';
import PostImage from 'components/PostImage/PostImage';
import PostTitlebar from 'components/PostTitlebar/PostTitlebar';
import * as React from 'react';
import { VisiblePost } from 'utils/types';

interface Props {
    onClose(): void;
    previousPost: number;
    nextPost: number;
    visiblePost: VisiblePost;
}


const PostRenderer: React.FC<Props> = ({
    onClose,
    previousPost,
    nextPost,
    visiblePost
}) => {
    return (
        <Dialog
            open
            onClose={onClose}
            maxWidth="lg"
        >
            <PostTitlebar postTitle={visiblePost.postTitle} />
            <DialogContent sx={{ padding: 0, overflow: "hidden" }}>
                {visiblePost.fullImageUrl && (
                    <PostImage
                        imageUrl={visiblePost.fullImageUrl}
                        previousPost={previousPost}
                        nextPost={nextPost}
                    />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default PostRenderer;
