import React from 'react';
import { shallow } from 'enzyme';
import DetailDataBox from '../detailDataBox';
import MainInfo from '../DetailDataBoxParts/mainInfo';
import Characters from '../DetailDataBoxParts/characters';
import Settings from '../DetailDataBoxParts/settings';
import Awards from '../DetailDataBoxParts/awards';

describe('DetailDataBox Component', () => {
  const details = {
    id: 1,
    title: 'title',
    isbn10: 'isbn10',
    isbn13: 'isbn13',
    language: 'language',
  };

  const wrapper = shallow(<DetailDataBox details={details} />);

  test('DetailDataBox renders properly when given detail props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('DetailDataBox contains components MainInfo, Characters, Settings, and Awards', () => {
    expect(wrapper.find(MainInfo).length).toEqual(1);
    expect(wrapper.find(Characters).length).toEqual(1);
    expect(wrapper.find(Settings).length).toEqual(1);
    expect(wrapper.find(Awards).length).toEqual(1);
  });
});
