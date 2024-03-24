const { workerData, parentPort } = require('worker_threads');
const fs = require('fs');

const filePath = workerData;

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.log(err);
        parentPort.postMessage({ error: 'Failed to read file.' });
    } else {
        // Parse the CSV data into an array of objects
        const lines = data.trim().split('\n');

        const headers = lines.shift().split(','); // ['transactionID','transactionType'......etc]

        const transactions = lines.map(line => {
            const fields = line.split(','); //['sddjddj', '500', 'DEBIT' etc etc]
            const transaction = {};
            for (let i = 0; i < headers.length; i++) {

                transaction[headers[i].trim()] = fields[i].trim();
            }
            return transaction;
        });
        parentPort.postMessage({ transactions });
    }
});
