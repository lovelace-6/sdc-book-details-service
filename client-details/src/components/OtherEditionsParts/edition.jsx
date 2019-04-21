import React from 'react';
import EditionTooltip from './editionTooltip.jsx';
import styles from '../css/Edition.less';

const Edition = (props) => {
  const { editionData } = props;
  const { id, coverurl, title } = editionData;

  return (
    <li className={styles.editionImgLiWrapper} key={id}>
      <div className={styles.editionImgWrapper}>
        <img className={styles.editionImg} key={id} src={coverurl} alt={title} />

        <div className={styles.tooltipWrapper}>
          <EditionTooltip {...editionData} />
        </div>
      </div>
    </li>
  );
};

export default Edition;
