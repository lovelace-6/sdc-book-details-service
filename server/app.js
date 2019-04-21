const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const db = require('../database/index');

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

const staticPath = `${__dirname}/../public`;
app.use('/books/:id', express.static(staticPath));

// get initinal details
app.get('/books/:id/details', (req, res) => {
  const { id } = req.params;

  db.getDetails(id)
    .then((results) => {
      const details = results[0][0];

      if (!details) {
        res.status(404).send('no data @ specified id');
      } else {
        res.send(details);
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// get data from either characters, awards, or editions table depending on table variable.
app.get('/books/:id/details/:table', (req, res) => {
  const { id } = req.params;
  const { table } = req.params;

  if (table === 'characters' || table === 'awards' || table === 'editions' || table === 'settings') {
    db.getTableData(table, id)
      .then((results) => {
        const data = results[0];

        if (data.length === 0) {
          res.status(404).send('no data @ specified id');
        } else {
          res.send(data);
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
