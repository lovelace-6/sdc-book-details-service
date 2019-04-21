import React from 'react';
import { shallow } from 'enzyme';
import DetailApp from '../../app';

describe('DetailApp Component', () => {
  it('should render DetailApp', () => {
    const wrapper = shallow(<DetailApp />);
    expect(wrapper.exists()).toBe(true);
  });
});
