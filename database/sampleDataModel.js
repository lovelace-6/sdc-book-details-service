const {
  type, pageNum, publisher, dates, title, isbn, language, characterArr, awardsArr, editionsArr, settingsArr, getRandomInt
} = require('./sampleDataMethods.js');

const repeat = (fn) => {
  const result = [];
  for (let i = 0; i < 10000; i++) {
    result.push(fn());
  }
  return result;
}


const createSourceData = () => {
  const dataObj = {
    mainDetails: {
      type: repeat(type),
      pageNum: repeat(pageNum),
      publisher: repeat(publisher),
      dates: repeat(dates),
      title: repeat(title),
      isbn10: repeat(() => isbn(10)),
      isbn13: repeat(() => isbn(13)),
      language: repeat(language),
    },
    characters: repeat(characterArr),
    settings: repeat(settingsArr),
    litAwards: repeat(awardsArr),
    editions: repeat(editionsArr),
  };
  return dataObj;
};

source = createSourceData();

const createBook = () => {
  // const dataObj = {
  //   mainDetails: {
  //     type: source.mainDetails.type[getRandomInt(0, 10000)],
  //     pageNum: source.mainDetails.pageNum[getRandomInt(0, 10000)],
  //     publisher: source.mainDetails.publisher[getRandomInt(0, 10000)],
  //     dates: source.mainDetails.dates[getRandomInt(0, 10000)],
  //     title: source.mainDetails.title[getRandomInt(0, 10000)],
  //     isbn10: source.mainDetails.isbn10[getRandomInt(0, 10000)],
  //     isbn13: source.mainDetails.isbn13[getRandomInt(0, 10000)],
  //     language: source.mainDetails.language[getRandomInt(0, 10000)],
  //   },
  //   characters: source.characters[getRandomInt(0, 10000)],
  //   settings: source.settings[getRandomInt(0, 10000)],
  //   litAwards: source.litAwards[getRandomInt(0, 10000)],
  //   editions: source.editions[getRandomInt(0, 10000)],
  // };
  const dataObj = {
    type: source.mainDetails.type[getRandomInt(0, 10000)],
    pageNum: source.mainDetails.pageNum[getRandomInt(0, 10000)],
    publisher: source.mainDetails.publisher[getRandomInt(0, 10000)],
    dates: JSON.stringify(source.mainDetails.dates[getRandomInt(0, 10000)]),
    title: source.mainDetails.title[getRandomInt(0, 10000)],
    isbn10: source.mainDetails.isbn10[getRandomInt(0, 10000)],
    isbn13: source.mainDetails.isbn13[getRandomInt(0, 10000)],
    language: source.mainDetails.language[getRandomInt(0, 10000)],
    //will use JSON column type for these fields
    characters: JSON.stringify(source.characters[getRandomInt(0, 10000)]),
    settings: JSON.stringify(source.settings[getRandomInt(0, 10000)]),
    litAwards: JSON.stringify(source.litAwards[getRandomInt(0, 10000)]),
    editions: JSON.stringify(source.editions[getRandomInt(0, 10000)]),
  };
  return dataObj;
}








module.exports.createBook = createBook;

