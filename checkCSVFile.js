const readLastLines = require('read-last-lines');

//log last 50 lines of the CSV
readLastLines.read('./bookDetails.csv', 50)
	.then((lines) => console.log(lines));