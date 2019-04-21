import React from 'react';
import { shallow } from 'enzyme';
import sharedStyles from '../css/SharedStyles.less';
import Awards from '../DetailDataBoxParts/awards';

describe('Awards Component', () => {
  const wrapper = shallow(
    <Awards id={1} />,
  );

  const awardsData = {
    main: [
      'Neustadt International Prize for Literature (2016)',
      'The John Newbery Medal (2018)',
      'Edgar Awards (2017)',
      "Bailey's Women's Prize for Fiction (2019)",
      'The John Newbery Medal (2018)',
      'National Book Award (2015)',
      'Edgar Awards (2015)',
    ],
    more: [
      'Bailey\'s Women\'s Prize for Fiction (2014)',
      'National Book Award (2018)',
      'National Book Award (2016)',
      'Specsavers National Book Awards (2019)',
    ],
  };


  test('Awards returns null when given improper id number (101)', () => {
    const wrapperFalse = shallow(
      <Awards id={101} />,
    );
    expect(wrapperFalse.find('div').length).toEqual(0);
  });

  test('Awards renders when given proper id number (1)', () => {
    wrapper.setState({ awardsMain: awardsData.main });
    expect(wrapper.exists()).toBe(true);
  });

  describe('Awards component with only awardsMain data values (seven)', () => {
    wrapper.setState({ awardsMain: awardsData.main });

    test('Awards moreButton should not exist when the state settingsMore is null', () => {
      expect(wrapper.state('awardsMore')).toEqual(null);
      expect(wrapper.find('.moreButton').length).toEqual(0);
    });

    test('Awards should render SEVEN data values', () => {
      expect(wrapper.find(`.${sharedStyles.greenUnderlineButton}`).length).toEqual(7);
    });
  });

  describe('Awards component with 7 awardsMain values and 4 awardsMore  data values', () => {
    const wrapper2 = shallow(
      <Awards id={1} />,
    );

    wrapper2.setState({ awardsMain: awardsData.main });
    wrapper2.setState({ awardsMore: awardsData.more });

    test('Awards moreButton should exist when the state awardsMore is NOT null', () => {
      expect(wrapper2.state('awardsMore')).toBeTruthy();
      expect(wrapper2.find('.moreButton').length).toEqual(1);
    });

    test('Awards state moreToggle is false by default', () => {
      expect(wrapper2.state('moreToggle')).toEqual(false);
    });

    test('Awards state moreToggle is changed to true with click', () => {
      wrapper2.find('.moreButton').simulate('click', { preventDefault: () => { } });
      expect(wrapper2.state('moreToggle')).toEqual(true);
    });

    test('Awards should render 12 data values when moreToggle state is true', () => {
      // 12 green buttons because the moreButton is a green button as well
      expect(wrapper2.find(`.${sharedStyles.greenUnderlineButton}`).length).toEqual(12);
    });
  });
});
