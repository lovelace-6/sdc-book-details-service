const pg = require('pg');
const path = require('path');
//'books' db already created, included in conn string
const CONNECTION_STRING = 'postgres://root:dobby@localhost:5432/books';
//const CONNECTION_STRING = process.env.BOOKS_PG_CONN_STRING;
console.log(CONNECTION_STRING);
const pool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

pool.query(`CREATE TABLE IF NOT EXISTS details (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20),
  pageNum INT,
  publisher VARCHAR(100),
  dates JSON,
  title VARCHAR(100),
  isbn10 VARCHAR(20),
  isbn13 VARCHAR(20),
  language VARCHAR(20),
  characters JSON,
  settings JSON,
  litAwards JSON,
  editions JSON
)`, (err, results) => {
  if (err) {
    console.error('error after table creation:', err);
  }
  console.log('about to run copy');
const filePath = path.resolve(`${__dirname}/../bookDetails.csv`);
  pool.query(`COPY details(type,pageNum,publisher,dates,title,isbn10,isbn13,language,characters,settings,litAwards,editions) FROM '${filePath}' WITH (FORMAT CSV, DELIMITER '|')`,
  (err, result) => {
    if (err) {
      console.error('error after copy:', err);
    }
    console.log('done with copy');
    pool.end();
  });});
