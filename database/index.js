const pg = require('pg');

const CONNECTION_STRING = process.env.BOOKS_PG_CONN_STRING;

const pool = new pg.Pool({
  connectionString: CONNECTION_STRING
});


const getDetails = (id) => {
  const queryString = 'SELECT * FROM details WHERE id = $1';
  const params = [id];
  return pool.query(queryString, params);
};


const createBookDetails = (data) => {
  const queryString = 'INSERT INTO details (type, pageNum, publisher, dates, title, isbn10, isbn13, language, characters, settings, litAwards, editions) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
  const params = [data.type, data.pageNum, data.publisher, data.dates, data.title, data.isbn10, data.isbn13, data.language, data.characters, data.settings, data.litAwards, data.editions];
  return pool.query(queryString, params);
}

module.exports.createBookDetails = createBookDetails;
module.exports.getDetails = getDetails;
