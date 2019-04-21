import React from 'react';
import { shallow } from 'enzyme';
import sharedStyles from '../css/SharedStyles.less';
import Settings from '../DetailDataBoxParts/settings';

describe('Settings Component', () => {
  const wrapper = shallow(
    <Settings id={1} />,
  );

  const settingsData = {
    main: [{
      id: 220, city: 'New Carmellashire', country: 'Argentina', bookId: 1,
    }, {
      id: 221, city: 'South Ewald', country: 'Japan', bookId: 1,
    }, {
      id: 222, city: 'Morarchester', country: 'Kuwait', bookId: 1,
    }],
    more: [{
      id: 223, city: 'Elinorport', country: 'Turkey', bookId: 1,
    }],
  };


  test('Settings returns null when given improper id number (101)', () => {
    const wrapperFalse = shallow(
      <Settings id={101} />,
    );
    expect(wrapperFalse.find('div').length).toEqual(0);
  });

  test('Settings renders when given proper id number (1)', () => {
    wrapper.setState({ settingsMain: settingsData.main });
    expect(wrapper.exists()).toBe(true);
  });

  describe('Settings component with THREE settings data values', () => {
    wrapper.setState({ settingsMain: settingsData.main });

    test('Settings moreButton should not exist when are three or less settings data and the state settingsMore is null', () => {
      expect(wrapper.state('settingsMore')).toEqual(null);
      expect(wrapper.find('.moreButton').length).toEqual(0);
    });

    test('Settings should render three data values', () => {
      expect(wrapper.find(`.${sharedStyles.greenUnderlineButton}`).length).toEqual(3);
    });
  });

  describe('Settings component with FOUR settings data values', () => {
    const wrapper2 = shallow(
      <Settings id={1} />,
    );

    wrapper2.setState({ settingsMain: settingsData.main });
    wrapper2.setState({ settingsMore: settingsData.more });

    test('Settings moreButton should exist when four or more settings data and the state settingsMore is NOT null', () => {
      expect(wrapper2.state('settingsMore')).toBeTruthy();
      expect(wrapper2.find('.moreButton').length).toEqual(1);
    });

    test('Settings state moreToggle is false by default', () => {
      expect(wrapper2.state('moreToggle')).toEqual(false);
    });

    test('Settings state moreToggle is changed to true with click', () => {
      wrapper2.find('.moreButton').simulate('click', { preventDefault: () => { } });
      expect(wrapper2.state('moreToggle')).toEqual(true);
    });

    test('Settings should render FOUR data values when moreToggle state is true', () => {
      // 5 green buttons because the more button is a green button as well
      expect(wrapper2.find(`.${sharedStyles.greenUnderlineButton}`).length).toEqual(5);
    });
  });
});
