import React from 'react';
import renderer from 'react-test-renderer';
import TitleBar from '../components/CategoryThumbnail/CategoryThumbnail';
import stateStore from '../StateStore/store';

const siteInfo = {
    name: 'Through a Pinhole'
};

jest.mock("../utils/Api", () => ({
    getSiteInfo: jest.fn(() => Promise.resolve(siteInfo))
  }));

test('Titlebar displays', () => {
  const store = new stateStore();
  const component = renderer.create(
    <TitleBar stateStore={store}></TitleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
