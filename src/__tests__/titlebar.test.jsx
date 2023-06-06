import React from 'react';
import renderer from 'react-test-renderer';

import TitleBar from '../components/TitleBar/TitleBar';
import StateStore from '../StateStore/store';

jest.mock('../utils/Api', () => ({
    getSiteInfo: () => Promise.resolve('Through a Pinhole')
}));

test('Titlebar displays', () => {
    const store = new StateStore();
    const component = renderer.create(
        <TitleBar stateStore={store} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
