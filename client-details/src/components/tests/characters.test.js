import React from 'react';
import { shallow } from 'enzyme';
import sharedStyles from '../css/SharedStyles.less';
import Characters from '../DetailDataBoxParts/characters';

describe('Characters Component', () => {
  const wrapper = shallow(
    <Characters id={1} />,
  );

  const charactersData = {
    main: [
      'Ocie Mante',
      'Cale Heaney',
      'Milo Mayer',
      'Rafael Parker',
      'Estrella Davis',
      'Meda Jerde',
      'Cloyd Parisian',
      'Teagan Kilback',
    ],
    more: ['Landen Bosco'],
  };


  test('Characters returns null when given improper id number (101)', () => {
    const wrapperFalse = shallow(
      <Characters id={101} />,
    );
    expect(wrapperFalse.find('div').length).toEqual(0);
  });

  test('Characters renders when given proper id number (1)', () => {
    wrapper.setState({ charactersMain: charactersData.main });
    expect(wrapper.exists()).toBe(true);
  });

  describe('Characters component with only charactersMain data values (seven)', () => {
    wrapper.setState({ charactersMain: charactersData.main });

    test('Characters moreButton should not exist when the state settingsMore is null', () => {
      expect(wrapper.state('charactersMore')).toEqual(null);
      expect(wrapper.find('.moreButton').length).toEqual(0);
    });

    test('Characters should render EIGHT data values', () => {
      expect(wrapper.find(`.${sharedStyles.greenUnderlineButton}`).length).toEqual(8);
    });
  });

  describe('Characters component with 8 charactersMain values and 1 charactersMore  data values', () => {
    const wrapper2 = shallow(
      <Characters id={1} />,
    );

    wrapper2.setState({ charactersMain: charactersData.main });
    wrapper2.setState({ charactersMore: charactersData.more });

    test('Characters moreButton should exist when the state charactersMore is NOT null', () => {
      expect(wrapper2.state('charactersMore')).toBeTruthy();
      expect(wrapper2.find('.moreButton').length).toEqual(1);
    });

    test('Characters state moreToggle is false by default', () => {
      expect(wrapper2.state('moreToggle')).toEqual(false);
    });

    test('Characters state moreToggle is changed to true with click', () => {
      wrapper2.find('.moreButton').simulate('click', { preventDefault: () => { } });
      expect(wrapper2.state('moreToggle')).toEqual(true);
    });

    test('Characters should render 9 data values when moreToggle state is true', () => {
      // 10 green buttons because the moreButton is a green button as well
      expect(wrapper2.find(`.${sharedStyles.greenUnderlineButton}`).length).toEqual(10);
    });
  });
});
