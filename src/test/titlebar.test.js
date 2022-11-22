import React from 'react';
import renderer from 'react-test-renderer';
import TitleBar from '../components/TitleBar/TitleBar';
import stateStore from '../StateStore/store';
import API from '../utils/Api';

const siteInfo = {
    name: 'Through a Pinhole'
};

jest.mock("../utils/Api", () => ({
    getSiteInfo: jest.fn(() => Promise.resolve(siteInfo))
  }));

test('Titlebar displays', () => {
  const store = new stateStore();
  const api = new API(store);
  const component = renderer.create(
    <TitleBar stateStore={store} api={api}></TitleBar>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
