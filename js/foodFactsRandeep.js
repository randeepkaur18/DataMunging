// imported log4js module
let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function convert(startYear)
{
	if(isNaN(startYear))
	{
		// throw an error if startYear is not provided or startYear is not a number or startyear is NaN
		throw new Error('Not a number');
	}
	else
	{
		// var csv = require('fast-csv');
		let readLine = require('readline');
		let fs = require('fs');
		const col1 = 'sugars_100g';
		const col2 = 'salt_100g';
		const col3 = 'countries';

		let arr = [];
		let i = 0;
		let idx1 = null;
		let idx2 = null;
		let idx3 = null;

		// fs.createReadStream() reads sequentially from the given current file position
		let readStream = fs.createReadStream('../inputdata/foodFacts.csv');

		let lineReader = readLine.createInterface({
			// the readable stream is given as the input
			input: readStream
		});

		// line event of readline module which read the file line by line
		lineReader.on('line', function(line)
		{
			if(i === 0)
			{
				// this will clear the junk data in the file
				let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
				cleanedLine = line.split(',');
				let data = cleanedLine;
				idx1 = data.indexOf(col1);
				idx2 = data.indexOf(col2);
				idx3 = data.indexOf(col3);

				i = +1;
			}

			else
			{
				let data = line.split(',');

				arr.push({country: data[idx3], sugar: data[idx1], salt: data[idx2]});
				let record = JSON.stringify(arr);
				// arr is converted to JSON array using stringify method and stored in record variable
				fs.writeFile('../outputdata/foodFactsRandeep.json', record);
				// the data is written to the file foodFactsRandeep.json
				logger.debug(record);
			}
		});

		// close event of readline module
		lineReader.on('close', ()=>{
			logger.debug('File closed');
		});

		return 'JSON written successfully';
	}
};


