const faker = require('faker');

// min inclusive, max exclusive
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
module.exports.getRandomInt = getRandomInt;

/* =================== Book Type ===================== */

const type = () => {
  const num = getRandomInt(0, 4);
  const typeArray = ['Hardcover', 'Paperback', 'Audio', 'Kindle'];

  return typeArray[num];
};
module.exports.type = type;

/* =================== Page Number ===================== */

const pageNum = () => {
  let num = faker.random.number({ min: 10, max: 1000 });
  return num;
};
module.exports.pageNum = pageNum;

/* =================== publisher ===================== */

const publisher = () => {
  return faker.company.companyName();
};
module.exports.publisher = publisher;

/* =================== First and Original Publication Dates ===================== */

const dates = () => {
  const dateObj = {
    firstPubDate: null,
    orgPubDate: null,
  };
  // helper function to add suffix to day
  const addSuffix = (string) => {
    const num = Number(string);
    if (num === 1 || num === 21 || num === 31) {
      return `${string}st`;
    } if (num === 2 || num === 22) {
      return `${string}nd`;
    } if (num === 3 || num === 23) {
      return `${string}rd`;
    }
    return `${string}th`;
  };
  // get random date
  let orgPubDate = faker.date.past(100);
  // stringify date
  const options = {
    year: 'numeric', month: 'long', day: 'numeric', localeMatcher: 'best fit',
  };
  orgPubDate = orgPubDate.toLocaleDateString('en-US', options).split(' ');
  // edit into proper format ex: [August, 15, 1987]
  const day1 = orgPubDate[1].slice(0, orgPubDate[1].length - 1);
  // set date to day1
  orgPubDate[1] = day1;

  // create first pub date;
  const firstPubDate = orgPubDate.slice();
  // recalculate day before;
  let day2 = Number(firstPubDate[1]);
  if (day2 !== '1') {
    day2 -= (Math.floor(Math.random() * day2));
  }
  // reset date for firstPubDate;
  firstPubDate[1] = day2.toString();

  // add suffix to both!
  orgPubDate[1] = addSuffix(orgPubDate[1]);
  firstPubDate[1] = addSuffix(firstPubDate[1]);
  // join into string for both
  dateObj.firstPubDate = firstPubDate.join(' ');
  dateObj.orgPubDate = orgPubDate.join(' ');

  return dateObj;
};
module.exports.dates = dates;

/* =================== Title generator ===================== */

const title = () => {
  return faker.random.words();
};
module.exports.title = title;

/* =================== ISBN generator ===================== */

const isbn = (limit) => {

  const options = limit === 10 ? { min: 1000000000, max: 9999999999 } : { min: 1000000000000, max: 9999999999999 }
  let isbnNum = faker.random.number(options).toString();
  return isbnNum;
};
module.exports.isbn = isbn;

/* =================== Language generator ===================== */
const languages = ['English', 'Korean', 'Spanish', 'Polish', 'Russian', 'Japanese', 'Italian', 'French', 'Chinese', 'Indian'];
const language = () => {
  const randNum = getRandomInt(0, 10);

  return languages[randNum];
};
module.exports.language = language;

/* =================== CharactersArr ===================== */

const characterArr = () => {
  const charArr = [];

  let num = getRandomInt(1, 5);

  while (num > 0) {
    const characterName = faker.fake('{{name.firstName}} {{name.lastName}}');
    charArr.push(characterName);
    num -= 1;
  }

  return charArr;
};
module.exports.characterArr = characterArr;

/* =================== Awards Arr ===================== */
const awards = [
  'Specsavers National Book Awards', 'Man Booker Prize', 'Pulitzer Prize', 'Costa Book Awards', 'Neustadt International Prize for Literature', 'Hugo Award', 'Guardian First Book Award', 'National Book Award', 'Bailey\'s Women\'s Prize for Fiction', 'The John Newbery Medal', 'Edgar Awards', 'National Book Critics Circle Award',
];

const awardsArr = () => {
  const awardArray = [];
  let num = getRandomInt(0, 3);


  while (num > 0) {
    const awardIndex = getRandomInt(0, 11);
    const name = awards[awardIndex];
    const date = faker.date.past(5).getFullYear();
    awardArray.push({name, date});
    num -= 1;
  }

  return awardArray;
};

module.exports.awardsArr = awardsArr;

/* =================== Cover Urls ===================== */
const urlStringArr = [
  'https://loremflickr.com/320/240/book,cover/all?random=1',
  'https://loremflickr.com/320/240/book,cover/all?random=2',
  'https://loremflickr.com/320/240/book,cover/all?random=3',
  'https://loremflickr.com/320/240/book,cover/all?random=4',
  'https://loremflickr.com/320/240/book,cover/all?random=5',
  'https://loremflickr.com/320/240/book,cover/all?random=6',
  'https://loremflickr.com/320/240/book,cover/all?random=7',
  'https://loremflickr.com/320/240/book,cover/all?random=8',
  'https://loremflickr.com/320/240/book,cover/all?random=9',
  'https://loremflickr.com/320/240/book,cover/all?random=10',
];
const coverUrl = () => {
  const num = getRandomInt(0, 10);
  return urlStringArr[num];
};
module.exports.coverUrl = coverUrl;

// /* =================== Stats ===================== */
// var readStatus = () => {
//   let num = getRandomInt(0, 3);
//   let statusArray = ['Want to Read', 'Currently Reading', 'Read'];

//   return statusArray[num];
// };
// module.exports.readStatus = readStatus;

// /* =================== Rating ===================== */
// var rating = () => {
//   return getRandomInt(0, 6);
// };
// module.exports.rating = rating;

/* =================== Editions Array ===================== */
const editionsArr = () => {
  const editionsArray = [];
  let num = getRandomInt(1, 3);

  while (num > 0) {
    const editionsObj = {
      isbn10: isbn(10),
      isbn13: isbn(13),
      title: title(),
      type: type(),
      publisher: publisher(),
      officialPubDate: dates().orgPubDate,
      coverUrl: coverUrl(),
      // can't actually access this status without logging in.
      // assume user is NOT logged in.
      // status: readStatus(),
      // rating: rating()
    };

    editionsArray.push(editionsObj);
    num -= 1;
  }
  return editionsArray;
};

module.exports.editionsArr = editionsArr;

/* =================== Settings Array ===================== */

const settingsArr = () => {
  const location = () => {
    const city = faker.address.city();
    const country = faker.address.country();
    return { city, country };
  };

  const settingsArray = [];
  const num = getRandomInt(1, 6);

  for (let i = 0; i < num; i++) {
    settingsArray.push(location());
  }

  return settingsArray;
};

module.exports.settingsArr = settingsArr;
