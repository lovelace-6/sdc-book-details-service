/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../app');
const db = require('../../database/index');

describe('Test endpoint GET /books/:id/details', () => {
  let mock;
  afterEach(() => {
    if (mock) mock.mockRestore();
  });

  test('It should give correct status code response to the GET method', (done) => {
    mock = jest.spyOn(db, 'getDetails');
    const data = [[{ id: 1 }]];
    mock.mockImplementation(() => Promise.resolve(data));

    request(app).get(`/books/${randomInt}}/details`).then((response) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  test('It should give back body corresponding to right id', (done) => {
    const num = randomInt;

    mock = jest.spyOn(db, 'getDetails');
    const data = [[{ id: num }]];
    mock.mockImplementation(() => Promise.resolve(data));

    request(app).get(`/books/${num}}/details`).then((response) => {
      expect(response.body.id).toBe(num);
      done();
    });
  });

  test('It should have response.body object with correct properties if object exits', (done) => {
    const num = randomInt;
    const data = [[
      {
        id: num,
        type: 'type',
        pagenum: 10,
        firstPubDate: 'firstPubDate',
        originalPubDate: 'orgPubDate',
        title: 'title',
        isbn10: '123',
        isbn13: '12345',
        language: 'language',
      },
    ]];
    mock = jest.spyOn(db, 'getDetails');
    mock.mockImplementation(() => Promise.resolve(data));

    request(app).get(`/books/${num}}/details`).then((response) => {
      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        type: expect.any(String),
        pagenum: expect.any(Number),
        firstPubDate: expect.any(String),
        originalPubDate: expect.any(String),
        title: expect.any(String),
        isbn10: expect.any(String),
        isbn13: expect.any(String),
        language: expect.any(String),
      }));
      done();
    });
  });

  test('It should give error response when id does not exist', (done) => {
    mock = jest.spyOn(db, 'getDetails');
    mock.mockImplementation(() => Promise.resolve([[]]));

    request(app).get(`/books/${randomInt + 100}}/details`).then((response) => {
      expect(response.statusCode).toBe(404);
      done();
    });
  });
});

//  **********************************************************

describe('Test endpoint GET /books/:id/details/:table', () => {
  afterAll((done) => {
    db.end(() => { done(); });
  });

  let mock;

  afterEach(() => {
    if (mock) mock.mockRestore();
  });

  describe('Test response for endpoint /books/:id/details/characters', () => {
    test('It should give correct status code response to GET characters table', (done) => {
      const num = randomInt;
      const data = [[{ id: 1, name: 'name', bookId: num }]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/characters`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      const num = randomInt;
      const data = [[]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num + 100}}/details/characters`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      const num = randomInt;
      const data = [[{ id: 1, name: 'name', bookId: num }]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/characters`).then((response) => {
        response.body.forEach((char) => {
          expect(char.bookId).toBe(num);
          expect(char.name).toEqual(expect.any(String));
        });
        done();
      });
    });
  });

  //  ==========================================================

  describe('Test response for endpoint /books/:id/details/awards', () => {
    test('It should give correct status code response to GET awards table', (done) => {
      const num = randomInt;
      const data = [[
        {
          id: 670,
          name: 'National Book Award',
          year: 2014,
          bookId: num,
        },
      ]];


      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/awards`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve([[]]));

      request(app).get(`/books/${randomInt + 100}}/details/awards`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      const num = randomInt;
      const data = [[
        {
          id: 670,
          name: 'National Book Award',
          year: 2014,
          bookId: num,
        },
      ]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/awards`).then((response) => {
        response.body.forEach((award) => {
          expect(award.bookId).toBe(num);
          expect(award.name).toEqual(expect.any(String));
          expect(award.year).toEqual(expect.any(Number));
        });
        done();
      });
    });
  });

  //  ==========================================================

  describe('Test response for endpoint /books/:id/details/editions', () => {
    test('It should give correct status code response to GET editions table', (done) => {
      const num = randomInt;
      const data = [[
        {
          id: 410,
          isbn10: '1546556714',
          isbn13: '9656418241510',
          title: 'out-of-the-box bluetooth',
          type: 'Hardcover',
          publisher: 'Klocko Inc',
          originalPubDate: 'May 22nd 1938',
          coverurl: 'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic0.jpg',
          bookId: num,
        },
      ]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/editions`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve([[]]));
      request(app).get(`/books/${randomInt + 100}}/details/editions`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      const num = randomInt;
      const data = [[
        {
          id: 410,
          isbn10: '1546556714',
          isbn13: '9656418241510',
          title: 'out-of-the-box bluetooth',
          type: 'Hardcover',
          publisher: 'Klocko Inc',
          originalPubDate: 'May 22nd 1938',
          coverurl: 'https://s3.us-east-2.amazonaws.com/hrr37-fec/fec-bookcovers/editionPic0.jpg',
          bookId: num,
        },
      ]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/editions`).then((response) => {
        response.body.forEach((edition) => {
          expect(edition).toEqual(expect.objectContaining({
            id: expect.any(Number),
            isbn10: expect.any(String),
            isbn13: expect.any(String),
            title: expect.any(String),
            type: expect.any(String),
            publisher: expect.any(String),
            originalPubDate: expect.any(String),
            coverurl: expect.any(String),
            bookId: num,
          }));
        });
        done();
      });
    });
  });

  //  ==========================================================

  describe('Test response for endpoint /books/:id/details/settings', () => {
    test('It should give correct status code response to GET settings table', (done) => {
      const num = randomInt;
      const data = [[
        {
          id: 228,
          city: 'East Pierceville',
          country: 'Eritrea',
          bookId: num,
        },
      ]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/settings`).then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    test('It should give error response when id does not exist', (done) => {
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve([[]]));

      request(app).get(`/books/${randomInt + 100}}/details/settings`).then((response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });

    test('It should give back body obj corresponding to right id with correct format', (done) => {
      const num = randomInt;
      const data = [[
        {
          id: 228,
          city: 'East Pierceville',
          country: 'Eritrea',
          bookId: num,
        },
      ]];
      mock = jest.spyOn(db, 'getTableData');
      mock.mockImplementation(() => Promise.resolve(data));

      request(app).get(`/books/${num}}/details/settings`).then((response) => {
        response.body.forEach((edition) => {
          expect(edition).toEqual(expect.objectContaining({
            id: expect.any(Number),
            city: expect.any(String),
            country: expect.any(String),
            bookId: num,
          }));
        });
        done();
      });
    });
  });
});
