import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PostImage from '../components/PostImage/PostImage';
import stateStore from '../StateStore/store';

const previousPostId = 34;
const nextPostId = 36;

test('PostImage displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter>
          <PostImage stateStore={store} previousPost={previousPostId} nextPost={nextPostId}></PostImage>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
