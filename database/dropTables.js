
const db = require('./index');
// use npm run drop:tables to drop all tables

db.queryAsync('use books')
  .then(() => db.queryAsync('drop tables details'))
  .then(() => db.queryAsync('drop table characters'))
  .then(() => db.queryAsync('drop table awards'))
  .then(() => db.queryAsync('drop table editions'))
  .then(() => db.queryAsync('drop table settings'))
  .then(() => {
    db.end(() => {
      console.log('db connection closed after dropping tables');
    });
  })
  .catch((err) => {
    console.log('err dropping tables', err);
  });
