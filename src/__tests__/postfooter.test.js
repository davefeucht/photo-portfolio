import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import PostFooter from '../components/PostFooter/PostFooter';
import stateStore from '../StateStore/store';

test('PostFooter displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter >
          <PostFooter stateStore={store}></PostFooter>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
