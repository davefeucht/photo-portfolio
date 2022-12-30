import React from 'react';
import renderer from 'react-test-renderer';
import TitleBar from '../components/TitleBar/TitleBar';
import stateStore from '../StateStore/store';

jest.mock("../utils/Api", () => ({
    getSiteInfo: () => Promise.resolve('Through a Pinhole')
}));

test('Titlebar displays', () => {
  const store = new stateStore();
  const component = renderer.create(
    <TitleBar stateStore={store}></TitleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});