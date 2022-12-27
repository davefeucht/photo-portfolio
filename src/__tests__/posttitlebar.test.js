import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PostTitlebar from '../components/PostTitlebar/PostTitlebar';
import stateStore from '../StateStore/store';

const postTitle = 'Some Post';

test('PostTitlebar displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter >
          <PostTitlebar postTitle={postTitle}></PostTitlebar>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
