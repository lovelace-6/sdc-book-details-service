CREATE KEYSPACE books
WITH REPLICATION = {'class':'SimpleStrategy', 'replication_factor':1};

USE books;

CREATE TABLE details (
  id INT,
  type VARCHAR,
  pageNum INT,
  publisher VARCHAR,
  dates VARCHAR,
  title VARCHAR,
  isbn10 VARCHAR,
  isbn13 VARCHAR,
  language VARCHAR,
  characters VARCHAR,
  settings VARCHAR,
  litAwards VARCHAR,
  editions VARCHAR,
  PRIMARY KEY (id)
);

COPY details(id,type,pageNum,publisher,dates,title,isbn10,isbn13,language,characters,settings,litAwards,editions) FROM '/Users/anacollado/Desktop/hr-projects/sdc-book-details-service/bookDetails.csv' WITH DELIMITER = '|';