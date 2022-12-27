import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader/SectionHeader';
import stateStore from '../StateStore/store';

const title = 'Some Section';

test('SectionHeader displays', () => {
  const store = new stateStore();
  let component;
  let tree;
  component = renderer.create(
      <MemoryRouter >
          <SectionHeader title={title}></SectionHeader>
      </MemoryRouter>
  );
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
