const pg = require('pg');
//'books' db already created, included in conn string
const CONNECTION_STRING = process.env.BOOKS_PG_CONN_STRING;

const pool = new pg.Pool({
  connectionString: CONNECTION_STRING
})

pool.query(`CREATE TABLE IF NOT EXISTS details (
  id SERIAL PRIMARY KEY,
  type VARCHAR(20),
  pageNum INT,
  publisher VARCHAR(100),
  dates JSON,
  title TEXT,
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
  pool.query(`COPY details(type,pageNum,publisher,dates,title,isbn10,isbn13,language,characters,settings,litAwards,editions) FROM '${__dirname}/../bookDetails.csv' WITH (FORMAT CSV, DELIMITER '|')`,
  (err, result) => {
    if (err) {
      console.error('error after copy:', err);
    }
    console.log('done with copy');
    pool.end();
  });
});
