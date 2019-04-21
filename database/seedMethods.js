/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */

const Promise = require('bluebird');
const { createData } = require('./sampleDataModel');

// creates a data array for 100 BOOKS

const createDataArray = () => {
  const dataArray = [];
  for (let i = 0; i < 100; i += 1) {
    const data = createData();
    dataArray.push(data);
  }
  return dataArray;
};

// SEEDS ONE data object to database.
const seedDb = (data, db) => {
  const details = data.mainDetails;
  const { characters } = data;
  const { settings } = data;
  const awards = data.litAwards;
  const { editions } = data;

  // details Table Seeder Function
  const seedDetailsTable = (details) => {
    const { type, pageNum, publisher, title, dates, isbn10, isbn13, language } = details;

    const queryString = 'INSERT INTO details (type, pagenum, publisher, firstPubDate, originalPubDate, title, isbn10, isbn13, language) values (?, ?, ?, ?, ?, ?, ?, ?, ?);';
    const params = [type, pageNum, publisher, dates.firstPubDate, dates.orgPubDate, title, isbn10, isbn13, language];

    return db.queryAsync(queryString, params);
  };

  // chars table seeder function
  const seedCharsTable = (bookId, chars) => {
    const charsPromiseArr = [];

    for (let i = 0; i < chars.length; i += 1) {
      const queryString = 'INSERT INTO characters (name, bookId) values (?, ?);';
      const params = [chars[i], bookId];

      charsPromiseArr.push(db.queryAsync(queryString, params));
    }

    return Promise.all(charsPromiseArr)
      .then(() => {
        console.log('seed characters table succeeded!', bookId);
        return bookId;
      })
      .catch(err => console.log('err seeding chars table!', err));
  };

  // settings table seeder function
  const seedSettingsTable = (bookId, settings) => {
    const settingsPromiseArr = [];

    for (let i = 0; i < settings.length; i += 1) {
      const { city } = settings[i];
      const { country } = settings[i];
      const queryString = 'INSERT INTO settings (city, country, bookId) values (?, ?, ?);';
      const params = [city, country, bookId];

      settingsPromiseArr.push(db.queryAsync(queryString, params));
    }

    return Promise.all(settingsPromiseArr)
      .then(() => {
        console.log('seed settings table succeeded!', bookId);
        return bookId;
      })
      .catch(err => console.log('err seeding settings table!', err));
  };

  // awards table seeder function
  const seedAwardsTable = (bookId, awards) => {
    const awardsPromiseArr = [];

    for (let i = 0; i < awards.length; i += 1) {
      const { name } = awards[i];
      const { date } = awards[i];
      const queryString = 'INSERT INTO awards (name, year, bookId) values (?, ?, ?);';
      const params = [name, date, bookId];

      awardsPromiseArr.push(db.queryAsync(queryString, params));
    }

    return Promise.all(awardsPromiseArr)
      .then(() => {
        console.log('seed awards table succeeded!', bookId);
        return bookId;
      })
      .catch(err => console.log('err seeding chars table!', err));
  };

  // editions table seeder function
  const seedEditionsTable = (bookId, editions) => {
    const editionsPromiseArr = [];

    for (let i = 0; i < editions.length; i += 1) {
      const { isbn10, isbn13, title, type, publisher, officialPubDate, coverUrl } = editions[i];
      const queryString = 'INSERT INTO editions (isbn10, isbn13, title, type, publisher, originalPubDate, coverurl, bookId) values (?, ?, ?, ?, ?, ?, ?, ?);';
      const params = [isbn10, isbn13, title, type, publisher, officialPubDate, coverUrl, bookId];

      editionsPromiseArr.push(db.queryAsync(queryString, params));
    }

    return Promise.all(editionsPromiseArr)
      .then(() => {
        console.log('seed editions table succeeded!', bookId);
        return bookId;
      })
      .catch(err => console.log('err seeding editions table!', err));
  };

  //= ==================Seed tables======================!
  // start by seeding details Table
  return seedDetailsTable(details)
    // define book id
    .then((results) => {
      const bookId = results[0].insertId;
      console.log('seed details Table succeeded!', bookId);
      return bookId;
    })
    // then seed the characters table with bookId
    .then((bookId) => {
      const array = [seedCharsTable(bookId, characters), seedAwardsTable(bookId, awards), seedEditionsTable(bookId, editions), seedSettingsTable(bookId, settings)];

      return Promise.all(array);
    })
    .catch((err) => {
      console.log('error in seedDb!\n', err);
    });
};

// seed all 100 data objects to database!
const seedAllData = (db) => {
  const dataArray = createDataArray();
  const promiseArray = [];

  for (let i = 0; i < dataArray.length; i += 1) {
    promiseArray.push(seedDb(dataArray[i], db));
  }

  Promise.all(promiseArray)
    .then((results) => {
      console.log('-----results-----\n', results);
      db.end(() => {
        console.log('end connection after seed!');
      });
    });
};

module.exports.seedAllData = seedAllData;
