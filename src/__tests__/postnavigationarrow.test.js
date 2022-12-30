import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PostNavigationArrow from '../components/PostNavigationArrow/PostNavigationArrow';
import stateStore from '../StateStore/store';

const direction = 'previous';
const postId = 35;

test('PostNavigationArrow displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter >
          <PostNavigationArrow stateStore={store} direction={direction} postId={postId}></PostNavigationArrow>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
