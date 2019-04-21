/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './css/Modal.less';

class Modal extends React.Component {
  render() {
    const { coverUrl, handleHideModalButtonClick, handleHideModalOutsideClick } = this.props;
    return (
      <ModalContent
        coverUrl={coverUrl}
        handleHideModalButtonClick={handleHideModalButtonClick}
        handleHideModalOutsideClick={handleHideModalOutsideClick}
      />
    );
  }
}

const ModalContent = (props) => {
  return ReactDOM.createPortal(
    <aside className={styles.modalCover} onClick={props.handleHideModalOutsideClick} >

      <div className={styles.modalEdition}>
        <button className={styles.modalClose} aria-label="Close Modal" type="button">
          <span className={styles.modalHideVisually}>Close</span>
          <svg className={styles.modalCloseIcon} viewBox="0 0 30 30"><path d="M 10,10 L 30,30 M 30,10 L 10,30" /></svg>
        </button>
        <div className={styles.modalBody} onClick={e => e.stopPropagation()}>
          <img src={props.coverUrl} alt="coverImg" />
        </div>
      </div>
    </aside>,
    document.getElementById('modal'),
  );
};

export default Modal;
