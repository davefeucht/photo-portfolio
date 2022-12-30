import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PostThumbnail from '../components/PostThumbnail/PostThumbnail';
import stateStore from '../StateStore/store';

const categoryPosts = [
    {
        thumbnail_image: 'some_url'
    }
];

const postId = 35;

test('PostThumbnail displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  store.setCategoryPosts(categoryPosts);
  component = renderer.create(
      <MemoryRouter >
          <PostThumbnail stateStore={store} id={postId} index={0}></PostThumbnail>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
