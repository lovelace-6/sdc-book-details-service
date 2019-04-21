import React from 'react';
import axios from 'axios';
import Edition from './OtherEditionsParts/edition.jsx';
import styles from './css/OtherEditions.less';
import sharedStyles from './css/SharedStyles.less';

class OtherEditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editionsMain: null,
      editionsMore: null,
      editionsCount: null,
    };
  }

  componentDidMount() {
    this.getEditions();
  }

  getEditions() {
    const { id } = this.props;
    axios.get(`/books/${id}/details/editions`)
      .then((res) => {
        const editionsArr = res.data;
        const { length } = editionsArr;
        const editionsMain = editionsArr.slice(0, 5);
        let editionsMore = editionsArr.slice(5, length);
        if (editionsMore.length === 0) {
          editionsMore = null;
        }
        this.setState({
          editionsMain,
          editionsMore,
          editionsCount: length,
        });
      })
      .catch(err => console.log('error get details', err));
  }

  generateEditionLine() {
    const { editionsMain } = this.state;
    const editionArray = [];
    editionsMain.forEach((edition, i) => {
      const { id } = edition;
      editionArray.push(
        <Edition key={id} editionData={edition} />,
      );
    });
    return editionArray;
  }

  render() {
    const { editionsCount, editionsMain, editionsMore } = this.state;

    if (editionsMain === null) {
      return (null);
    }

    return (
      <div>
        <div className={sharedStyles.detailBoxRowTitle}>
          {`Other Editions (${editionsCount})`}
        </div>
        <div className={sharedStyles.detailBoxRowItem}>
          <ul className={styles.imgUlWrapper}>
            {this.generateEditionLine()}
          </ul>
          <div>
            <span className={sharedStyles.greenUnderlineButton}>All Editions</span>
            <span className={styles.greyoutLine}>|</span>
            <span className={sharedStyles.greenUnderlineButton}>Add a New Editions</span>
            <span className={styles.greyoutLine}>|</span>
            <span className={sharedStyles.greenUnderlineButton}>Combine</span>
          </div>
        </div>
      </div>
    );
  }
}

export default OtherEditions;
