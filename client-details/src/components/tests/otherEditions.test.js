import React from 'react';
import { shallow } from 'enzyme';
import OtherEditions from '../otherEditions';
import Edition from '../OtherEditionsParts/edition';

describe('OtherEditions Component', () => {
  const editionsData = {
    main: [
      {
        bookId: 96, coverurl: 'url', id: 398, isbn10: '3812525793', isbn13: '6795153055513', originalPubDate: 'January 5th 1920', publisher: 'Herzog - Grimes', title: 'Ohio', type: 'Audio',
      }, {
        bookId: 96, coverurl: 'url', id: 398, isbn10: '3812525793', isbn13: '6795153055513', originalPubDate: 'January 5th 1920', publisher: 'Herzog - Grimes', title: 'Ohio', type: 'Audio',
      }, {
        bookId: 96, coverurl: 'url', id: 398, isbn10: '3812525793', isbn13: '6795153055513', originalPubDate: 'January 5th 1920', publisher: 'Herzog - Grimes', title: 'Ohio', type: 'Audio',
      }, {
        bookId: 96, coverurl: 'url', id: 398, isbn10: '3812525793', isbn13: '6795153055513', originalPubDate: 'January 5th 1920', publisher: 'Herzog - Grimes', title: 'Ohio', type: 'Audio',
      }, {
        bookId: 96, coverurl: 'url', id: 398, isbn10: '3812525793', isbn13: '6795153055513', originalPubDate: 'January 5th 1920', publisher: 'Herzog - Grimes', title: 'Ohio', type: 'Audio',
      },
    ],
    more: [
      {
        bookId: 96, coverurl: 'url', id: 398, isbn10: '3812525793', isbn13: '6795153055513', originalPubDate: 'January 5th 1920', publisher: 'Herzog - Grimes', title: 'Ohio', type: 'Audio',
      },
    ],
  };

  const wrapper = shallow(<OtherEditions id={1} />);

  test('OtherEditions returns null when given improper id number (101)', () => {
    const wrapperFalse = shallow(
      <OtherEditions id={101} />,
    );
    expect(wrapperFalse.find('div').length).toEqual(0);
  });

  test('OtherEditions renders when given proper id number (1)', () => {
    wrapper.setState({ editionsMain: editionsData.main });
    expect(wrapper.exists()).toBe(true);
  });

  describe('OtherEditions renders correct number of editions', () => {
    test('OtherEditions renders THREE editions when given three data sets', () => {
      wrapper.setState({ editionsMain: editionsData.main.slice(0, 3) });
      expect(wrapper.find(Edition).length).toEqual(3);
    });

    test('OtherEditions renders at MAX FIVE editions when given more than 5 data sets', () => {
      wrapper.setState({
        editionsMain: editionsData.main,
        editionsMore: editionsData.more,
      });
      expect(wrapper.find(Edition).length).toEqual(5);
    });
  });
});
