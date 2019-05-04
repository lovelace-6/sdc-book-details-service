const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const db = require('../database/index');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

const staticPath = `${__dirname}/../public`;
app.use('/books/:id', express.static(staticPath));
app.get('/loaderio-47166b40a5a0075950774cb3fb9d7285.txt', (req, res) => res.sendFile(path.resolve(`/Users/anacollado/Desktop/hr-projects/sdc-book-details-service/loaderio-key.txt`)));

// get initial details
app.get('/books/:id/details', (req, res) => {
  const { id } = req.params;

  db.getDetails(id)
    .then((results) => {
      const details = results.rows[0];
      if (!details) {
        res.sendStatus(404);
      } else {
        res.send(details);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});


app.post('/books/details', (req, res) => {
  const rawDetailsObj = req.body;
  const detailsObj = Object.assign({}, rawDetailsObj, {
    dates: JSON.stringify(rawDetailsObj.dates),
    characters: JSON.stringify(rawDetailsObj.characters),
    settings: JSON.stringify(rawDetailsObj.settings),
    litAwards: JSON.stringify(rawDetailsObj.litAwards),
    editions: JSON.stringify(rawDetailsObj.editions)
  });
  db.createBookDetails(detailsObj)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.put('/books/:id/details', (req, res) => {
  const { id } = req.params;
  //update book

});

app.delete('/books/:id/details', (req, res) => {
  const { id } = req.params;
  //delete book

});

// get data from either characters, awards, or editions table depending on table variable.
app.get('/books/:id/details/:table', (req, res) => {
  const { id } = req.params;
  let { table } = req.params;

  //adjust for discrepancy in field name
  if (table === 'awards') {
    table = 'litAwards';
  }

  if (table === 'characters' || table === 'litAwards' || table === 'editions' || table === 'settings') {
    db.getDetails(id)
      .then((results) => {
        if (results.rows.length === 0) {
          res.status(404).send('no data @ specified id');
        } else {
          const data = results.rows[0];

          res.send(data[table]);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.status(400).send('endpoint does not exist');
  }
});

// handle post request when status button of want to read changed
app.post('/books/:id/details/editions/status', (req, res) => {
  const { id } = req.params;

  console.log('should redirect to login auth page! Just redirect to main for now');

  res.redirect(`/books/${id}`);
});

// handle post request when rating of book edition changed
app.post('/books/:id/details/editions/rating', (req, res) => {
  const { id } = req.params;

  console.log('should redirect to login auth page! Just redirect to main for now');

  res.redirect(`/books/${id}`);
});

module.exports = app;
