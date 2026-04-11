/** ***************
* Posts component displays a list of Posts
**************** */

import './Posts.css';

import { ImageList } from '@mui/material';
import ThumbnailRenderer from 'components/ThumbnailRenderer/ThumbnailRenderer';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Post as PostState } from 'utils/types';

interface PostsProps {
    currentCategoryPosts: PostState[]
}

const Posts: React.FC<PostsProps> = ({
    currentCategoryPosts
}) => {
    return (
        <ImageList
            gap={0}
            rowHeight={300}
            cols={3}
            variant="standard"
            sx={{ margin: 0, width: "100vw", height: "100%" }}
        >
            {currentCategoryPosts.map((post, index) => {
                return (
                    <ThumbnailRenderer
                        key={post.id.toString()}
                        name={post.title.rendered}
                        id={post.id}
                        thumbnailUrl={currentCategoryPosts[index].thumbnail_image}
                        variant="post"
                    />
                );
            })}
        </ImageList>
    );
};

Posts.displayName = 'Posts';

export default observer(Posts);
