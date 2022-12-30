import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Posts from '../components/Posts/Posts';
import stateStore from '../StateStore/store';

const posts = [
    {
        id: 887,
        featured_media: 142,
        categories: [220],
        title: {
            rendered: 'Some post'
        }
    },
    {
        id: 889,
        featured_media: 145,
        categories: [220],
        title: {
            rendered: 'Some other post'
        }
    }
];

test('Posts displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  store.setCategoryPosts(posts);
  component = renderer.create(
      <MemoryRouter>
          <Posts stateStore={store}></Posts>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
