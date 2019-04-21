import React from 'react';
import MainInfo from './DetailDataBoxParts/mainInfo.jsx';
import Characters from './DetailDataBoxParts/characters.jsx';
import Settings from './DetailDataBoxParts/settings.jsx';
import Awards from './DetailDataBoxParts/awards.jsx';
import styles from './css/DetailDataBox.less';

const DetailDataBox = (props) => {
  const {
    id, title, isbn10, isbn13, language,
  } = props.details;

  const mainInfo = {
    id, title, isbn10, isbn13, language,
  };

  return (
    <div>
      <div className={styles.dataBoxContainer}>
        <MainInfo
          mainInfo={mainInfo}
        />
        <Characters id={id} />
        <Settings id={id} />
        <Awards id={id} />
      </div>
    </div>
  );
};

export default DetailDataBox;
