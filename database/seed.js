/* eslint-disable arrow-body-style */
const mysql = require('mysql');
const Promise = require('bluebird');
const { seedAllData } = require('./seedMethods');


const connection = mysql.createConnection({
  user: 'root',
  host: 'localhost',
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

const setupDb = () => {
  return db.queryAsync(`
    CREATE TABLE IF NOT EXISTS details (
      id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
      type VARCHAR(20),
      pagenum INT,
      publisher VARCHAR(100),
      firstPubDate VARCHAR(30),
      originalPubDate VARCHAR(30),
      title VARCHAR(100),
      isbn10 VARCHAR(20),
      isbn13 VARCHAR(20),
      language VARCHAR(20)
      );`)
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS characters (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          bookId INT
        );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS settings (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          city VARCHAR(150),
          country VARCHAR(150),
          bookId INT
        );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS awards (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(100),
          year INT,
          bookId INT
        );`);
    })
    .then(() => {
      return db.queryAsync(`
        CREATE TABLE IF NOT EXISTS editions (
          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          isbn10 VARCHAR(20),
          isbn13 VARCHAR(20),
          title VARCHAR(100),
          type VARCHAR(20),
          publisher VARCHAR(100),
          originalPubDate VARCHAR(30),
          coverurl VARCHAR(250),
          bookId INT
        );`);
    })
    .error((err) => {
      console.log('error making tables', err);
    });
};

// seed database!

db.connectAsync()
  .then(() => console.log(`connected to mysql with id ${db.threadId}`))
  .error((err) => { console.log('error connecting to db', err); });

db.queryAsync('CREATE DATABASE IF NOT EXISTS books')
  .then(() => {
    return db.queryAsync('use books');
  })
  .then(() => {
    return setupDb();
  })
  .then(() => {
    db.queryAsync('select count(id) from details')
      .then((results) => {
        const dataCount = (results[0][0]['count(id)']);
        return dataCount;
      })
      .then((dataCount) => {
        if (dataCount !== 100) {
          console.log('data set empty! seeding data!');
          return seedAllData(db);
        }
        return db.end(() => console.log('data set already exists'));
      })
      .catch(err => console.log('err seeding db', err));
  })
  .catch(() => {
    console.log('DAMN!');
  });
