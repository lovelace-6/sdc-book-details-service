import React from 'react';
import { shallow } from 'enzyme';
import MainInfo from '../DetailDataBoxParts/mainInfo';
import sharedStyles from '../css/SharedStyles.less';

describe('MainInfo Component', () => {
  const mainInfo = {
    title: 'title',
    isbn10: 'isbn10',
    isbn13: 'isbn13',
    language: 'language',
  };
  const wrapper = shallow(<MainInfo mainInfo={mainInfo} />);

  test('Main renders properly', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('MainInfo should contain three DetailBoxRowTitle divs with text Original Title, ISBN, Language', () => {
    expect(wrapper.containsMatchingElement(<div className={sharedStyles.detailBoxRowTitle}>Original Title</div>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<div className={sharedStyles.detailBoxRowTitle}>ISBN</div>)).toEqual(true);
    expect(wrapper.containsMatchingElement(<div className={sharedStyles.detailBoxRowTitle}>Language</div>)).toEqual(true);
  });

  test('MainInfo should contain three DetailBoxRowItem divs', () => {
    expect(wrapper.find(`.${sharedStyles.detailBoxRowItem}`).length).toEqual(3);
  });

  test('MainInfo should also contain one grey text span for isbn13 display', () => {
    expect(wrapper.find(`.${sharedStyles.greyoutButton}`).length).toEqual(1);
  });
});
