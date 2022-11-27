import React from 'react';
import renderer, { act } from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import CategoryThumbnail from '../components/CategoryThumbnail/CategoryThumbnail';
import stateStore from '../StateStore/store';

const id = 5;
const name = 'Test Category';
const thumbnailImageUrl = '';

jest.mock("../utils/Api", () => ({
    getCategoryImage: jest.fn(() => Promise.resolve(thumbnailImageUrl))
  }));

test('CategoryThumbnail displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter>
          <CategoryThumbnail id={id} name={name} stateStore={store}></CategoryThumbnail>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
