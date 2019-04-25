/* eslint-disable arrow-body-style */
const { createBook } = require('./sampleDataModel');
const fs = require('fs');
const fastCSV = require('fast-csv');


const ONE_MILLION = 1000000;


const writeRecordsToFile = (size) => {
  const LABEL = 'CSV data writing';
  console.time(LABEL);
  //use '|' delimiter to avoid conflict with fields with commas
  const csvWriteStream = fastCSV.createWriteStream({delimiter: '|'});
  const fsWriteStream = fs.createWriteStream("bookDetails.csv");
  fsWriteStream.on("finish", () => {
    console.log("finished writing bookDetails CSV");
    console.timeEnd(LABEL);
  });
  csvWriteStream.pipe(fsWriteStream);
  let i = -1;
  const writeNextRecordToCSV = () => {
    i++;
    if (i === size) {
      return csvWriteStream.end();
    }
    let nextBook = createBook();
    let bookRow = [
      nextBook.type,
      nextBook.pageNum,
      nextBook.publisher,
      nextBook.dates,
      nextBook.title,
      nextBook.isbn10,
      nextBook.isbn13,
      nextBook.language,
      nextBook.characters,
      nextBook.settings,
      nextBook.litAwards,
      nextBook.editions,
    ]
    let canContinue = csvWriteStream.write(
      bookRow
    );
    if (!canContinue) {
      csvWriteStream.once('drain', writeNextRecordToCSV);
    } else {
      writeNextRecordToCSV();
    }
  }

  writeNextRecordToCSV();
}


writeRecordsToFile(ONE_MILLION * 10);


