/**
 * @jest-environment jsdom
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Category from '../components/Category/Category';
import stateStore from '../StateStore/store';

jest.mock('../utils/Api');

test('Category displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter initialEntries={['/category/220']} >
          <Category stateStore={store}></Category>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
