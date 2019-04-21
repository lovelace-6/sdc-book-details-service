const {
  type, pageNum, publisher, dates, title, isbn, language, characterArr, awardsArr, editionsArr, settingsArr,
} = require('./sampleDataMethods.js');

const createData = () => {
  const dataObj = {
    mainDetails: {
      type: type(),
      pageNum: pageNum(),
      publisher: publisher(),
      dates: dates(),
      title: title(),
      isbn10: isbn(10),
      isbn13: isbn(13),
      language: language(),
    },
    characters: characterArr(),
    settings: settingsArr(),
    litAwards: awardsArr(),
    editions: editionsArr(),
  };
  return dataObj;
};


module.exports.createData = createData;

console.log(createData());
