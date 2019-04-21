/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Stars from './stars.jsx';

import styles from '../css/EditionTooltip.less';
import sharedStyles from '../css/SharedStyles.less';
import Modal from '../modal.jsx';

class EditionTooltip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.handleHideModalButtonClick = this.handleHideModalButtonClick.bind(this);
    this.handleHideModalOutsideClick = this.handleHideModalOutsideClick.bind(this);
  }

  handleShowModalClick(e) {
    e.preventDefault();
    this.setState(state => ({ showModal: !state.showModal }));
  }

  handleHideModalButtonClick(e) {
    e.preventDefault();
    this.setState(state => ({ showModal: !state.showModal }));
  }

  handleHideModalOutsideClick(e) {
    this.setState(state => ({ showModal: !state.showModal }));
  }

  render() {
    const {
      isbn10, isbn13, originalPubDate, publisher, title, type, coverurl,
    } = this.props;
    const { showModal } = this.state;

    return (
      <div>
        <div className={styles.editionTooltipWrapper}>
          <div className={styles.editionTooltipBorderFrame}>
            <div className={styles.editionTooltipBorderCenter}>
              <div className={styles.editionBook}>
                <div>{`${title} (${type})`}</div>
                <div>{`isbn: ${isbn10}`}</div>
                <div>{`isbn13: ${isbn13}`}</div>
                <div>{`format: ${type}`}</div>
                <div>{`Published ${originalPubDate} by ${publisher}`}</div>
                <span className={sharedStyles.greenUnderlineButton} onClick={(e) => { this.handleShowModalClick(e); }}>Enlarge cover</span>
                <div className={styles.editionStatusWrapper}>
                  <span title="status" style={{ paddingRight: '10px' }}>Want to Read</span>
                  <span className={styles.editionStatusButton}><div className={styles.editionStatusArrow} /></span>
                </div>
                <div className={styles.editionRating}>
                  <span title="editionRating" style={{ paddingRight: '15px' }}>Rate this Book</span>
                  <Stars />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.editionTooltipArrow} />
        </div>
        {/* conditionally render modal */}
        {
          showModal && (
            <Modal
              coverUrl={coverurl}
              handleHideModalButtonClick={this.handleHideModalButtonClick}
              handleHideModalOutsideClick={this.handleHideModalOutsideClick}
            />
          )
        }
      </div>
    );
  }
}

export default EditionTooltip;
export {
  Stars,
};
