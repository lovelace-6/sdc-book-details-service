import React from 'react';
import { shallow } from 'enzyme';
import EditionTooltip, {
  Stars,
} from '../OtherEditionsParts/editionTooltip';
import styles from '../css/EditionTooltip.less';
import sharedStyles from '../css/SharedStyles.less';

describe('EditionTooltip Component', () => {
  const tooltipData = {
    isbn10: 'isbn10',
    isbn13: 'isbn13',
    originalPubDate: 'date1',
    publisher: 'publisher',
    title: 'title',
    type: 'type',
  };

  const wrapper = shallow(<EditionTooltip {...tooltipData} />);

  test('EditionTooltip renders properly when given tooltip props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('EditionTooltip contains CSS components Wrapper, BorderFrame, BorderCenter, Book and ToolTipArrow', () => {
    expect(wrapper.find(`.${styles.editionTooltipWrapper}`).length).toEqual(1);
    expect(wrapper.find(`.${styles.editionTooltipBorderFrame}`).length).toEqual(1);
    expect(wrapper.find(`.${styles.editionTooltipBorderCenter}`).length).toEqual(1);
    expect(wrapper.find(`.${styles.editionBook}`).length).toEqual(1);
    expect(wrapper.find(`.${styles.editionTooltipArrow}`).length).toEqual(1);
  });

  test('EditionTooltip contains statusButton components and rating components', () => {
    expect(wrapper.find(`.${styles.editionStatusArrow}`).length).toEqual(1);
    expect(wrapper.find(`.${styles.editionStatusButton}`).length).toEqual(1);
    expect(wrapper.find(Stars).length).toEqual(1);
  });
});
